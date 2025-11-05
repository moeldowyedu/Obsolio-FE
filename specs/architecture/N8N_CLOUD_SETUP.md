# N8n Cloud Configuration

## Overview

Aasim integrates with **N8n Cloud** for all AI evaluation processing. The workflows are hosted externally on N8n Cloud, providing a managed, scalable solution without requiring self-hosted infrastructure.

**N8n Cloud Instance:** `https://iti-genai.app.n8n.cloud`

---

## Architecture

```
┌─────────────────────┐              HTTPS              ┌──────────────────────────┐
│                     │  ─────────────────────────────>  │                          │
│   Aasim Backend     │    POST with API Key Auth       │   N8n Cloud Workflows    │
│  (PHP API Server)   │                                  │  iti-genai.app.n8n.cloud │
│                     │  <─────────────────────────────  │                          │
└─────────────────────┘    Webhook Callback              └──────────────────────────┘
     (Your Server)                                        (External Managed Service)
```

---

## N8n Cloud Details

### Instance Information
- **Base URL:** `https://iti-genai.app.n8n.cloud`
- **Type:** N8n Cloud (Managed Service)
- **Authentication:** API Key (JWT Token)
- **API Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODEyMmZkNS05NjQ2LTQ0ODYtOWE5MC1lYzA3NGUxMDFkZDMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYyMzQyODEzLCJleHAiOjE3NzAwNjk2MDB9.OAdGKnXLFBcY20PtlP4nM3h1dkutd3TNUEFeGhXjJ1c`

### API Key Details
- **Type:** JWT Token
- **Issued:** 2024-11-05 (iat: 1762342813)
- **Expires:** 2025-07-19 (exp: 1770069600)
- **Subject:** 58122fd5-9646-4486-9a90-ec074e101dd3
- **Audience:** public-api

**⚠️ Important:** The API key expires on **July 19, 2025**. You'll need to generate a new one before expiration.

---

## Environment Configuration

### Backend .env File

```env
# N8n Cloud Configuration
N8N_CLOUD_URL=https://iti-genai.app.n8n.cloud
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODEyMmZkNS05NjQ2LTQ0ODYtOWE5MC1lYzA3NGUxMDFkZDMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYyMzQyODEzLCJleHAiOjE3NzAwNjk2MDB9.OAdGKnXLFBcY20PtlP4nM3h1dkutd3TNUEFeGhXjJ1c

# Webhook Secret (shared between Aasim and N8n)
N8N_WEBHOOK_SECRET=your-secure-shared-secret-key-here

# Backend Callback URL (where N8n sends results)
WEBHOOK_CALLBACK_BASE_URL=https://api.aasim.app/api/v1/webhooks

# N8n Webhook Endpoints (paths on N8n Cloud)
N8N_VIDEO_AUDIO_WEBHOOK=/webhook/video-audio-analysis
N8N_DOCUMENT_WEBHOOK=/webhook/document-review
N8N_CODE_WEBHOOK=/webhook/code-assessment
N8N_CUSTOM_WEBHOOK=/webhook/custom-evaluation
N8N_REPORT_WEBHOOK=/webhook/report-generation
N8N_CONSISTENCY_WEBHOOK=/webhook/consistency-check
```

---

## N8n Cloud Workflow Setup

### 1. Access N8n Cloud

Visit: `https://iti-genai.app.n8n.cloud`

Log in with your credentials.

---

### 2. Create Workflows

You need to create **6 workflows** in N8n Cloud:

#### Workflow 1: Video & Audio Analysis
- **Webhook Path:** `/webhook/video-audio-analysis`
- **Purpose:** Analyze video and audio content
- **Trigger:** Webhook POST request from Aasim backend

**Workflow Structure:**
```
1. Webhook Trigger
   ↓
2. Download Video/Audio from URL
   ↓
3. Extract Audio (if video)
   ↓
4. OpenAI Whisper (Speech-to-Text)
   ↓
5. OpenAI GPT-4 Vision (Visual Analysis)
   ↓
6. Calculate Scores
   ↓
7. Generate Insights
   ↓
8. HTTP Request (Send Results to Aasim Backend)
```

#### Workflow 2: Document Review
- **Webhook Path:** `/webhook/document-review`
- **Purpose:** Analyze PDF and Word documents
- **Trigger:** Webhook POST request

**Workflow Structure:**
```
1. Webhook Trigger
   ↓
2. Download Document from URL
   ↓
3. Extract Text (PDF/Word Parser)
   ↓
4. OpenAI GPT-4 (Content Analysis)
   ↓
5. Calculate Scores
   ↓
6. Generate Insights
   ↓
7. HTTP Request (Send Results to Aasim Backend)
```

#### Workflow 3: Source Code Assessment
- **Webhook Path:** `/webhook/code-assessment`
- **Purpose:** Evaluate source code quality
- **Trigger:** Webhook POST request

**Workflow Structure:**
```
1. Webhook Trigger
   ↓
2. Download ZIP from URL
   ↓
3. Extract Files
   ↓
4. OpenAI GPT-4 (Code Analysis)
   ↓
5. Calculate Scores (quality, architecture, etc.)
   ↓
6. Generate Insights
   ↓
7. HTTP Request (Send Results to Aasim Backend)
```

#### Workflow 4: Custom Evaluation
- **Webhook Path:** `/webhook/custom-evaluation`
- **Purpose:** Apply user-defined criteria
- **Trigger:** Webhook POST request

#### Workflow 5: Report Generation
- **Webhook Path:** `/webhook/report-generation`
- **Purpose:** Generate PDF reports
- **Trigger:** Webhook POST request

#### Workflow 6: Consistency Check
- **Webhook Path:** `/webhook/consistency-check`
- **Purpose:** Ensure scoring consistency
- **Trigger:** Webhook POST request

---

### 3. Configure Webhook Triggers

For each workflow in N8n Cloud:

1. **Add Webhook Node:**
   - Click "+ Add Node"
   - Search for "Webhook"
   - Select "Webhook" trigger

2. **Configure Webhook:**
   - **HTTP Method:** POST
   - **Path:** (e.g., `video-audio-analysis`)
   - **Authentication:** None (we'll use custom header verification)
   - **Response Mode:** "When Last Node Finishes"

3. **Set Production URL:**
   - Click on the webhook node
   - Note the Production URL (e.g., `https://iti-genai.app.n8n.cloud/webhook/video-audio-analysis`)
   - This is what your backend will call

---

### 4. Configure Callback HTTP Request

At the end of each workflow, add an HTTP Request node to send results back:

**HTTP Request Node Configuration:**
```
Method: POST
URL: {{$json.callback_url}}
(This will be provided by the backend in the webhook payload)

Authentication: Header Auth
Header Name: X-Webhook-Secret
Header Value: your-secure-shared-secret-key-here

Headers:
  Content-Type: application/json
  X-N8n-Signature: [Add Function node to calculate HMAC]

Body:
{
  "workflow_id": "{{$workflow.id}}",
  "submission_id": "{{$json.submission_id}}",
  "status": "completed",
  "agent": "video_audio_analysis",
  "results": {
    "overall_score": {{$json.overall_score}},
    "confidence": {{$json.confidence}},
    "scores": {{$json.scores}},
    "insights": {{$json.insights}}
  },
  "processing_time": {{$json.processing_time}},
  "timestamp": "{{$now}}"
}
```

---

### 5. Add HMAC Signature Calculation

Before the HTTP Request node, add a **Function** node to calculate HMAC signature:

**Function Node Code:**
```javascript
const crypto = require('crypto');

// Get the payload to sign
const payload = {
  workflow_id: $workflow.id,
  submission_id: items[0].json.submission_id,
  status: 'completed',
  agent: 'video_audio_analysis',
  results: items[0].json.results,
  processing_time: items[0].json.processing_time,
  timestamp: new Date().toISOString()
};

// Your shared webhook secret
const secret = 'your-secure-shared-secret-key-here';

// Calculate HMAC-SHA256 signature
const signature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(payload))
  .digest('hex');

// Add signature to output
return {
  json: {
    ...items[0].json,
    hmac_signature: signature,
    payload: payload
  }
};
```

---

## Backend Integration

### Updated N8nService Class

```php
<?php
// src/Services/N8nService.php

namespace App\Services;

use GuzzleHttp\Client;
use App\Repositories\WebhookLogRepository;

class N8nService
{
    private Client $httpClient;
    private string $cloudUrl;
    private string $apiKey;
    private string $webhookSecret;
    private WebhookLogRepository $webhookLogRepo;

    public function __construct(WebhookLogRepository $webhookLogRepo)
    {
        $this->httpClient = new Client(['timeout' => 30]);
        $this->cloudUrl = $_ENV['N8N_CLOUD_URL'];
        $this->apiKey = $_ENV['N8N_API_KEY'];
        $this->webhookSecret = $_ENV['N8N_WEBHOOK_SECRET'];
        $this->webhookLogRepo = $webhookLogRepo;
    }

    /**
     * Trigger video/audio analysis workflow on N8n Cloud
     */
    public function triggerVideoAudioAnalysis(array $submissionData): array
    {
        $endpoint = $this->cloudUrl . $_ENV['N8N_VIDEO_AUDIO_WEBHOOK'];

        $payload = [
            'workflow_type' => 'video_audio_analysis',
            'submission_id' => $submissionData['uuid'],
            'callback_url' => $_ENV['WEBHOOK_CALLBACK_BASE_URL'] . '/evaluation-callback',
            'files' => $this->prepareFiles($submissionData['files']),
            'criteria' => $submissionData['criteria'] ?? $this->getDefaultCriteria('video_audio')
        ];

        return $this->sendToN8nCloud($endpoint, $payload, $submissionData['id'], 'video_audio_analysis');
    }

    /**
     * Trigger document review workflow on N8n Cloud
     */
    public function triggerDocumentReview(array $submissionData): array
    {
        $endpoint = $this->cloudUrl . $_ENV['N8N_DOCUMENT_WEBHOOK'];

        $payload = [
            'workflow_type' => 'document_review',
            'submission_id' => $submissionData['uuid'],
            'callback_url' => $_ENV['WEBHOOK_CALLBACK_BASE_URL'] . '/evaluation-callback',
            'files' => $this->prepareFiles($submissionData['files']),
            'criteria' => $submissionData['criteria'] ?? $this->getDefaultCriteria('document')
        ];

        return $this->sendToN8nCloud($endpoint, $payload, $submissionData['id'], 'document_review');
    }

    /**
     * Trigger code assessment workflow on N8n Cloud
     */
    public function triggerCodeAssessment(array $submissionData): array
    {
        $endpoint = $this->cloudUrl . $_ENV['N8N_CODE_WEBHOOK'];

        $payload = [
            'workflow_type' => 'code_assessment',
            'submission_id' => $submissionData['uuid'],
            'callback_url' => $_ENV['WEBHOOK_CALLBACK_BASE_URL'] . '/evaluation-callback',
            'files' => $this->prepareFiles($submissionData['files']),
            'criteria' => $submissionData['criteria'] ?? $this->getDefaultCriteria('code')
        ];

        return $this->sendToN8nCloud($endpoint, $payload, $submissionData['id'], 'code_assessment');
    }

    /**
     * Trigger custom evaluation workflow on N8n Cloud
     */
    public function triggerCustomEvaluation(array $submissionData, array $customCriteria): array
    {
        $endpoint = $this->cloudUrl . $_ENV['N8N_CUSTOM_WEBHOOK'];

        $payload = [
            'workflow_type' => 'custom_evaluation',
            'submission_id' => $submissionData['uuid'],
            'callback_url' => $_ENV['WEBHOOK_CALLBACK_BASE_URL'] . '/evaluation-callback',
            'files' => $this->prepareFiles($submissionData['files']),
            'custom_criteria' => $customCriteria
        ];

        return $this->sendToN8nCloud($endpoint, $payload, $submissionData['id'], 'custom_evaluation');
    }

    /**
     * Trigger report generation workflow on N8n Cloud
     */
    public function triggerReportGeneration(array $evaluationData, string $format = 'pdf'): array
    {
        $endpoint = $this->cloudUrl . $_ENV['N8N_REPORT_WEBHOOK'];

        $payload = [
            'workflow_type' => 'report_generation',
            'submission_id' => $evaluationData['submission_uuid'],
            'evaluation_id' => $evaluationData['uuid'],
            'callback_url' => $_ENV['WEBHOOK_CALLBACK_BASE_URL'] . '/report-callback',
            'evaluation_data' => $evaluationData,
            'report_format' => $format,
            'template' => 'standard'
        ];

        return $this->sendToN8nCloud($endpoint, $payload, $evaluationData['submission_id'], 'report_generation');
    }

    /**
     * Send webhook to N8n Cloud
     */
    private function sendToN8nCloud(string $endpoint, array $payload, int $submissionId, string $workflowType): array
    {
        // Log outgoing webhook
        $logId = $this->webhookLogRepo->logOutgoing([
            'submission_id' => $submissionId,
            'workflow_type' => $workflowType,
            'endpoint' => $endpoint,
            'request_payload' => json_encode($payload),
            'status' => 'pending'
        ]);

        try {
            $response = $this->httpClient->post($endpoint, [
                'json' => $payload,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-Webhook-Secret' => $this->webhookSecret,
                    // Note: N8n Cloud webhooks don't require API key for webhook triggers
                    // API key is only for N8n API endpoints
                ]
            ]);

            $statusCode = $response->getStatusCode();
            $responseBody = (string) $response->getBody();

            // Update log as success
            $this->webhookLogRepo->update($logId, [
                'status' => 'success',
                'status_code' => $statusCode,
                'response_payload' => $responseBody
            ]);

            return [
                'success' => true,
                'status_code' => $statusCode,
                'response' => json_decode($responseBody, true),
                'log_id' => $logId
            ];

        } catch (\Exception $e) {
            // Update log as failed
            $this->webhookLogRepo->update($logId, [
                'status' => 'failed',
                'error_message' => $e->getMessage()
            ]);

            // Throw exception for retry logic
            throw new \Exception('Failed to send webhook to N8n Cloud: ' . $e->getMessage());
        }
    }

    /**
     * Prepare files for N8n processing
     */
    private function prepareFiles(array $files): array
    {
        $prepared = [];

        foreach ($files as $file) {
            $prepared[] = [
                'type' => $file['file_type'],
                'url' => $this->getFileUrl($file['file_path']),
                'filename' => $file['original_filename'],
                'size' => $file['file_size'],
                'mime_type' => $file['mime_type'],
                'duration' => $file['duration'] ?? null
            ];
        }

        return $prepared;
    }

    /**
     * Get publicly accessible file URL
     */
    private function getFileUrl(string $filePath): string
    {
        // Return full URL to file
        // This should be a publicly accessible URL that N8n can download from
        return $_ENV['STORAGE_BASE_URL'] . '/' . $filePath;
    }

    private function getDefaultCriteria(string $type): array
    {
        $criteria = [
            'video_audio' => [
                'presentation_quality' => 0.3,
                'clarity' => 0.25,
                'engagement' => 0.25,
                'professionalism' => 0.2
            ],
            'document' => [
                'content_quality' => 0.35,
                'structure' => 0.25,
                'formatting' => 0.2,
                'references' => 0.2
            ],
            'code' => [
                'code_quality' => 0.3,
                'architecture' => 0.25,
                'documentation' => 0.2,
                'best_practices' => 0.15,
                'testing' => 0.1
            ]
        ];

        return $criteria[$type] ?? [];
    }
}
```

---

## Using N8n Cloud API (Optional)

If you need to programmatically manage workflows or executions, you can use the N8n Cloud API.

### N8n Cloud API Endpoints

**Base URL:** `https://iti-genai.app.n8n.cloud/api/v1`

**Authentication:** Bearer Token (Your API Key)

### Example: Get Workflow Executions

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->get('https://iti-genai.app.n8n.cloud/api/v1/executions', [
    'headers' => [
        'Authorization' => 'Bearer ' . $_ENV['N8N_API_KEY'],
        'Accept' => 'application/json'
    ],
    'query' => [
        'limit' => 20,
        'status' => 'success'
    ]
]);

$executions = json_decode($response->getBody(), true);
```

### Example: Get Workflow by ID

```php
<?php

$workflowId = 'your-workflow-id';

$response = $client->get("https://iti-genai.app.n8n.cloud/api/v1/workflows/{$workflowId}", [
    'headers' => [
        'Authorization' => 'Bearer ' . $_ENV['N8N_API_KEY'],
        'Accept' => 'application/json'
    ]
]);

$workflow = json_decode($response->getBody(), true);
```

---

## Security Considerations

### 1. Webhook Secret

The webhook secret should be:
- **Strong:** At least 32 characters
- **Random:** Use cryptographically secure random generation
- **Shared:** Same value in both Aasim backend and N8n workflows

**Generate a secure secret:**
```bash
openssl rand -hex 32
```

### 2. HMAC Signature Verification

Always verify the HMAC signature on incoming webhooks from N8n:

```php
<?php
// Backend verification
$signature = $_SERVER['HTTP_X_N8N_SIGNATURE'];
$payload = file_get_contents('php://input');
$secret = $_ENV['N8N_WEBHOOK_SECRET'];

$expectedSignature = hash_hmac('sha256', $payload, $secret);

if (!hash_equals($signature, $expectedSignature)) {
    http_response_code(401);
    die(json_encode(['error' => 'Invalid signature']));
}
```

### 3. API Key Protection

- **Never commit** the API key to version control
- Store in **environment variables** only
- **Rotate regularly** (before expiration date)
- **Monitor usage** for unauthorized access

### 4. File URLs

Ensure file URLs sent to N8n are:
- **Publicly accessible** (N8n needs to download them)
- **Time-limited** (use signed URLs if possible)
- **Secure** (HTTPS only)

---

## Testing

### 1. Test Webhook Endpoints

Use curl to test N8n webhook endpoints:

```bash
# Test Video/Audio Analysis Webhook
curl -X POST https://iti-genai.app.n8n.cloud/webhook/video-audio-analysis \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-secret-here" \
  -d '{
    "workflow_type": "video_audio_analysis",
    "submission_id": "test-123",
    "callback_url": "https://api.aasim.app/api/v1/webhooks/evaluation-callback",
    "files": [{
      "type": "video",
      "url": "https://example.com/test-video.mp4",
      "filename": "test.mp4"
    }],
    "criteria": {
      "presentation_quality": 0.3,
      "clarity": 0.25
    }
  }'
```

### 2. Monitor Executions

In N8n Cloud:
1. Go to **Executions** tab
2. View recent workflow runs
3. Check execution details for errors
4. Debug failed workflows

### 3. Check Webhook Logs

In your Aasim backend:
```sql
SELECT * FROM webhook_logs
WHERE created_at > NOW() - INTERVAL 1 DAY
ORDER BY created_at DESC;
```

---

## Troubleshooting

### Issue: Webhook not triggering N8n workflow

**Solution:**
1. Check webhook URL is correct
2. Verify workflow is **active** in N8n Cloud
3. Check N8n execution logs for errors
4. Verify payload format matches expected structure

### Issue: N8n callback not reaching backend

**Solution:**
1. Verify callback URL is publicly accessible
2. Check HMAC signature is being sent correctly
3. Review backend webhook logs
4. Ensure no firewall blocking N8n Cloud IPs

### Issue: File download fails in N8n

**Solution:**
1. Ensure file URLs are publicly accessible
2. Check file URL responds to HTTP GET
3. Verify CORS headers if needed
4. Use signed URLs with longer expiration

### Issue: API Key expired

**Solution:**
1. Log in to N8n Cloud dashboard
2. Go to **Settings** → **API Keys**
3. Generate new API key
4. Update `N8N_API_KEY` in your `.env`
5. Redeploy backend

---

## Cost Estimation

### N8n Cloud Pricing
- **Starter:** $20/month (5,000 executions)
- **Pro:** $50/month (25,000 executions)
- **Business:** Custom pricing

### Aasim Usage Estimate
- **1 submission** = ~2-3 workflow executions
  - 1 evaluation workflow
  - 1 report generation workflow
  - Optional: 1 consistency check

- **1,000 submissions/month** = ~3,000 executions
- **Recommended Plan:** Pro ($50/month)

### Total Monthly Cost (1,000 submissions)
- N8n Cloud: $50
- AI APIs (OpenAI): $50-150
- **Total: $100-200/month**

---

## Maintenance

### Regular Tasks

**Weekly:**
- Monitor webhook success rate
- Review failed executions in N8n
- Check error logs

**Monthly:**
- Review AI API usage and costs
- Optimize workflow performance
- Update evaluation criteria if needed

**Before API Key Expiration:**
- Generate new API key (2 weeks before exp)
- Update backend environment variables
- Test workflows with new key

---

## Next Steps

1. ✅ Access N8n Cloud at `https://iti-genai.app.n8n.cloud`
2. ✅ Create the 6 workflows as described
3. ✅ Configure webhook triggers for each workflow
4. ✅ Add callback HTTP requests with HMAC signatures
5. ✅ Test each workflow with sample data
6. ✅ Update Aasim backend `.env` with cloud URLs
7. ✅ Deploy backend and test end-to-end integration

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
**N8n Cloud Instance:** iti-genai.app.n8n.cloud
**API Key Expires:** July 19, 2025
