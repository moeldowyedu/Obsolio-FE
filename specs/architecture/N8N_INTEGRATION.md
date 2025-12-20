# N8n Workflow Integration Architecture

## Overview

OBSOLIO uses **N8n workflows** with specialized AI agents to handle all evaluation processing. Instead of processing evaluations directly in the backend, the system uses a webhook-based architecture where:

1. Backend **sends** submission data to N8n workflows via webhook POST
2. N8n workflows process the content with specialized agents
3. N8n **sends back** results to backend via webhook callback

This architecture provides:
- ✅ Modular, scalable evaluation processing
- ✅ Easy to add/modify evaluation agents
- ✅ Visual workflow management
- ✅ Asynchronous processing
- ✅ Retry and error handling built-in

---

## Architecture Diagram

```
┌─────────────────┐         POST          ┌─────────────────────┐
│                 │  ──────────────────>   │                     │
│  OBSOLIO Backend  │   Submission Data      │   N8n Workflows     │
│   (PHP API)     │                        │   (Agent System)    │
│                 │   <──────────────────  │                     │
└─────────────────┘    Webhook Callback    └─────────────────────┘
                       (Results)

N8n Workflows contain 6 specialized agents:
├── 1. Video & Audio Analysis Agent
├── 2. Document Review Agent
├── 3. Source Code Assessment Agent
├── 4. Custom Evaluation Criteria Agent
├── 5. AI Report Generation Agent
└── 6. Objective & Consistent Scoring Agent
```

---

## Workflow Process

### 1. Submission Created
```
User uploads files → Backend API → Store in database → Trigger N8n workflow
```

### 2. N8n Processing
```
N8n receives webhook → Route to appropriate agents → Process content → Generate scores
```

### 3. Results Returned
```
N8n sends results webhook → Backend receives → Update database → Notify user
```

---

## N8n Workflow Agents

### Agent 1: Video & Audio Analysis Agent

**Purpose:** Analyze video and audio files for presentation quality, clarity, tone.

**Input (from Backend):**
```json
{
  "workflow_type": "video_audio_analysis",
  "submission_id": "uuid-here",
  "callback_url": "https://api.aasim.app/webhooks/evaluation-callback",
  "files": [
    {
      "type": "video",
      "url": "https://storage.aasim.app/videos/abc123.mp4",
      "duration": 300,
      "filename": "presentation.mp4"
    }
  ],
  "criteria": {
    "presentation_quality": 0.3,
    "clarity": 0.25,
    "engagement": 0.25,
    "professionalism": 0.2
  }
}
```

**Output (to Backend via Callback):**
```json
{
  "workflow_id": "n8n-workflow-123",
  "submission_id": "uuid-here",
  "status": "completed",
  "agent": "video_audio_analysis",
  "results": {
    "overall_score": 85.5,
    "confidence": 92.0,
    "scores": [
      {
        "criterion": "presentation_quality",
        "score": 88.0,
        "weight": 0.3,
        "comments": "Excellent delivery and visual aids"
      },
      {
        "criterion": "clarity",
        "score": 90.0,
        "weight": 0.25,
        "comments": "Very clear articulation"
      }
    ],
    "insights": [
      {
        "type": "strength",
        "description": "Strong vocal presence and confidence"
      }
    ]
  },
  "processing_time": 45,
  "timestamp": "2024-11-05T10:30:00Z"
}
```

---

### Agent 2: Document Review Agent

**Purpose:** Analyze PDF, Word documents for content quality, structure, formatting.

**Input:**
```json
{
  "workflow_type": "document_review",
  "submission_id": "uuid-here",
  "callback_url": "https://api.aasim.app/webhooks/evaluation-callback",
  "files": [
    {
      "type": "document",
      "url": "https://storage.aasim.app/docs/report.pdf",
      "filename": "project_report.pdf",
      "pages": 25
    }
  ],
  "criteria": {
    "content_quality": 0.35,
    "structure": 0.25,
    "formatting": 0.2,
    "references": 0.2
  }
}
```

**Agent Actions:**
1. Extract text from PDF/Word
2. Analyze structure and organization
3. Check formatting consistency
4. Evaluate content depth
5. Verify citations and references
6. Generate detailed feedback

---

### Agent 3: Source Code Assessment Agent

**Purpose:** Evaluate code quality, architecture, best practices, documentation.

**Input:**
```json
{
  "workflow_type": "code_assessment",
  "submission_id": "uuid-here",
  "callback_url": "https://api.aasim.app/webhooks/evaluation-callback",
  "files": [
    {
      "type": "code",
      "url": "https://storage.aasim.app/code/project.zip",
      "filename": "source_code.zip",
      "language": "python"
    }
  ],
  "criteria": {
    "code_quality": 0.3,
    "architecture": 0.25,
    "documentation": 0.2,
    "best_practices": 0.15,
    "testing": 0.1
  }
}
```

**Agent Actions:**
1. Extract and parse source code
2. Run static analysis (linting, complexity)
3. Check for security vulnerabilities
4. Evaluate architecture patterns
5. Assess documentation quality
6. Check test coverage
7. Generate improvement suggestions

---

### Agent 4: Custom Evaluation Criteria Agent

**Purpose:** Apply user-defined custom criteria to any content type.

**Input:**
```json
{
  "workflow_type": "custom_evaluation",
  "submission_id": "uuid-here",
  "callback_url": "https://api.aasim.app/webhooks/evaluation-callback",
  "files": [...],
  "custom_criteria": [
    {
      "name": "Innovation",
      "description": "Originality and creative thinking",
      "weight": 0.4,
      "evaluation_guidelines": "Assess uniqueness of approach..."
    },
    {
      "name": "Feasibility",
      "description": "Practicality of implementation",
      "weight": 0.3,
      "evaluation_guidelines": "Evaluate technical feasibility..."
    }
  ]
}
```

**Agent Actions:**
1. Parse custom criteria definitions
2. Apply criteria to content
3. Use AI to evaluate based on guidelines
4. Generate criterion-specific scores
5. Provide detailed reasoning

---

### Agent 5: AI Report Generation Agent

**Purpose:** Compile all agent results into comprehensive, formatted reports.

**Input:**
```json
{
  "workflow_type": "report_generation",
  "submission_id": "uuid-here",
  "callback_url": "https://api.aasim.app/webhooks/report-callback",
  "evaluation_data": {
    "overall_score": 87.5,
    "scores": [...],
    "insights": [...]
  },
  "report_format": "pdf",
  "template": "standard"
}
```

**Agent Actions:**
1. Aggregate all evaluation results
2. Generate executive summary
3. Create visualizations (charts, graphs)
4. Format according to template
5. Generate PDF/HTML report
6. Return download URL

---

### Agent 6: Objective & Consistent Scoring Agent

**Purpose:** Ensure consistency across evaluations and eliminate bias.

**Input:**
```json
{
  "workflow_type": "consistency_check",
  "submission_id": "uuid-here",
  "callback_url": "https://api.aasim.app/webhooks/evaluation-callback",
  "preliminary_scores": [...],
  "historical_data": {
    "similar_submissions": 5,
    "average_score": 82.3
  }
}
```

**Agent Actions:**
1. Review scores from other agents
2. Check for scoring consistency
3. Compare with historical data
4. Identify and flag anomalies
5. Apply normalization if needed
6. Provide confidence scores

---

## Webhook Endpoints

### Backend Endpoints (OBSOLIO API)

#### 1. Receive Evaluation Results
```
POST /api/v1/webhooks/evaluation-callback
```

**Headers:**
```
Content-Type: application/json
X-N8n-Signature: <hmac-signature>
X-Webhook-Secret: <shared-secret>
```

**Request Body:**
```json
{
  "workflow_id": "n8n-workflow-123",
  "submission_id": "uuid-here",
  "status": "completed",
  "agent": "video_audio_analysis",
  "results": {
    "overall_score": 85.5,
    "scores": [...],
    "insights": [...]
  },
  "processing_time": 45,
  "timestamp": "2024-11-05T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Results received and processed",
  "submission_id": "uuid-here"
}
```

---

#### 2. Receive Report Generation Results
```
POST /api/v1/webhooks/report-callback
```

**Request Body:**
```json
{
  "workflow_id": "n8n-workflow-456",
  "submission_id": "uuid-here",
  "report_url": "https://storage.aasim.app/reports/report-123.pdf",
  "report_format": "pdf",
  "file_size": 245760,
  "status": "completed",
  "timestamp": "2024-11-05T10:35:00Z"
}
```

---

#### 3. Receive Error Notifications
```
POST /api/v1/webhooks/error-callback
```

**Request Body:**
```json
{
  "workflow_id": "n8n-workflow-789",
  "submission_id": "uuid-here",
  "status": "failed",
  "error": {
    "code": "PROCESSING_ERROR",
    "message": "Failed to extract audio from video",
    "details": "Corrupted file format"
  },
  "timestamp": "2024-11-05T10:32:00Z"
}
```

---

### N8n Webhook Endpoints

#### 1. Trigger Video/Audio Analysis
```
POST https://n8n.aasim.app/webhook/video-audio-analysis
```

**Triggered by:** Backend when video/audio files uploaded

---

#### 2. Trigger Document Review
```
POST https://n8n.aasim.app/webhook/document-review
```

**Triggered by:** Backend when PDF/Word files uploaded

---

#### 3. Trigger Code Assessment
```
POST https://n8n.aasim.app/webhook/code-assessment
```

**Triggered by:** Backend when code files uploaded

---

#### 4. Trigger Custom Evaluation
```
POST https://n8n.aasim.app/webhook/custom-evaluation
```

**Triggered by:** Backend with custom criteria

---

#### 5. Trigger Report Generation
```
POST https://n8n.aasim.app/webhook/report-generation
```

**Triggered by:** Backend after all evaluations complete

---

## N8n Workflow Structure

### Example: Video Analysis Workflow

```
1. Webhook Trigger (receives submission data)
   ↓
2. File Download Node (download video from URL)
   ↓
3. Extract Audio Node (separate audio track)
   ↓
4. Video Analysis Node (analyze video content)
   ├─→ 4a. OpenAI Vision API (visual analysis)
   └─→ 4b. Speech-to-Text API (transcription)
   ↓
5. Audio Analysis Node (analyze audio quality)
   ↓
6. Scoring Node (calculate scores based on criteria)
   ↓
7. Insights Generation Node (AI-generated feedback)
   ↓
8. Consistency Check Node (validate scores)
   ↓
9. HTTP Request Node (send results back to backend)
   ↓
10. Error Handler (if any step fails, notify backend)
```

---

## Security Considerations

### 1. Webhook Authentication

**HMAC Signature Verification:**
```php
// Backend verification
$signature = $_SERVER['HTTP_X_N8N_SIGNATURE'];
$payload = file_get_contents('php://input');
$secret = $_ENV['N8N_WEBHOOK_SECRET'];

$expectedSignature = hash_hmac('sha256', $payload, $secret);

if (!hash_equals($signature, $expectedSignature)) {
    http_response_code(401);
    die('Invalid signature');
}
```

### 2. Webhook Secret
- Use shared secret for authentication
- Rotate secrets periodically
- Store in environment variables

### 3. IP Whitelisting
- Only accept webhooks from N8n server IPs
- Configure firewall rules

### 4. HTTPS Only
- All webhook communication over HTTPS
- Validate SSL certificates

---

## Error Handling

### Retry Strategy

**N8n Side:**
- Automatic retry: 3 attempts
- Exponential backoff: 2s, 4s, 8s
- Send error webhook after all retries fail

**Backend Side:**
- Queue failed webhooks for manual review
- Notify admin after 3 failures
- Allow manual retry from dashboard

### Error Types

| Error Type | N8n Action | Backend Action |
|------------|------------|----------------|
| File not accessible | Retry 3x, then error webhook | Mark as failed, notify user |
| AI API timeout | Retry 3x with longer timeout | Queue for retry |
| Invalid format | Error webhook immediately | Notify user, request re-upload |
| Processing error | Error webhook with details | Log error, allow retry |

---

## Database Schema Updates

### New Table: webhook_logs

```sql
CREATE TABLE webhook_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT UNSIGNED NOT NULL,
    workflow_id VARCHAR(100),
    webhook_type ENUM('outgoing', 'incoming') NOT NULL,
    agent_name VARCHAR(100),
    endpoint VARCHAR(500),
    request_payload JSON,
    response_payload JSON,
    status_code INT,
    status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
    error_message TEXT,
    retry_count TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
    INDEX idx_submission_id (submission_id),
    INDEX idx_workflow_id (workflow_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Updated Table: evaluations

Add fields for N8n tracking:
```sql
ALTER TABLE evaluations
ADD COLUMN workflow_id VARCHAR(100) AFTER ai_model,
ADD COLUMN webhook_status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
ADD INDEX idx_workflow_id (workflow_id);
```

---

## Environment Variables

### Backend .env
```env
# N8n Integration
N8N_BASE_URL=https://n8n.aasim.app
N8N_WEBHOOK_SECRET=your-shared-secret-key

# N8n Workflow Endpoints
N8N_VIDEO_AUDIO_WEBHOOK=/webhook/video-audio-analysis
N8N_DOCUMENT_WEBHOOK=/webhook/document-review
N8N_CODE_WEBHOOK=/webhook/code-assessment
N8N_CUSTOM_WEBHOOK=/webhook/custom-evaluation
N8N_REPORT_WEBHOOK=/webhook/report-generation

# Webhook Callback URL
WEBHOOK_CALLBACK_URL=https://api.aasim.app/api/v1/webhooks
```

### N8n Environment
```env
# Backend API
BACKEND_API_URL=https://api.aasim.app
WEBHOOK_SECRET=your-shared-secret-key

# AI APIs
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key

# Storage
STORAGE_BASE_URL=https://storage.aasim.app
```

---

## N8n Workflow Examples

### 1. Video Analysis Workflow JSON
{% raw %}
```json
{
  "name": "OBSOLIO - Video & Audio Analysis",
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "video-audio-analysis",
        "responseMode": "lastNode"
      }
    },
    {
      "name": "Download Video",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "={{$json.files[0].url}}",
        "responseFormat": "file"
      }
    },
    {
      "name": "OpenAI Vision Analysis",
      "type": "n8n-nodes-base.openAi",
      "parameters": {
        "resource": "vision",
        "prompt": "Analyze this video presentation..."
      }
    },
    {
      "name": "Send Results to Backend",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "={{$json.callback_url}}",
        "authentication": "genericCredentialType"
      }
    }
  ]
}
```
{% endraw %}

---

## Monitoring & Observability

### Metrics to Track

1. **Webhook Delivery Rate**
   - Success rate: Target > 99%
   - Average response time: Target < 2s

2. **Processing Time**
   - Video/Audio: Target < 5 min
   - Documents: Target < 3 min
   - Code: Target < 4 min

3. **Error Rate**
   - Failed webhooks: Target < 1%
   - Retry success rate: Target > 95%

### Logging

**Backend Logs:**
- All outgoing webhooks to N8n
- All incoming webhook callbacks
- Errors and retries

**N8n Logs:**
- Workflow executions
- Processing times
- Errors and failures

---

## Testing Strategy

### Unit Tests
- Webhook signature verification
- Payload validation
- Error handling

### Integration Tests
- End-to-end workflow testing
- Webhook delivery and callback
- Error scenarios

### Load Tests
- Concurrent webhook processing
- N8n workflow scaling
- Database performance under load

---

## Deployment Checklist

- [ ] Deploy N8n instance (self-hosted or cloud)
- [ ] Create all 6 agent workflows
- [ ] Configure webhook endpoints
- [ ] Set up HMAC authentication
- [ ] Configure IP whitelisting
- [ ] Test each workflow individually
- [ ] Test end-to-end integration
- [ ] Set up monitoring and alerts
- [ ] Configure error notifications
- [ ] Document workflow for team

---

## Cost Estimation

### N8n Hosting
- **Self-hosted (VPS):** $20-40/month
- **N8n Cloud:** $50-200/month

### AI API Costs
- **OpenAI (GPT-4 Vision):** $0.01-0.03 per evaluation
- **Speech-to-Text:** $0.006 per minute
- **Total per submission:** ~$0.05-0.15

### Estimated Monthly Costs (1000 submissions)
- N8n Hosting: $50
- AI APIs: $50-150
- **Total: $100-200/month**

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
**Status:** Ready for Implementation
