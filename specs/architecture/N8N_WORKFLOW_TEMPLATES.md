# N8n Workflow Templates

## Overview

This document provides ready-to-import N8n workflow templates for all 6 Aasim evaluation agents.

**N8n Cloud:** `https://iti-genai.app.n8n.cloud`

---

## Workflow 1: Video & Audio Analysis

### Workflow JSON

```json
{
  "name": "Aasim - Video & Audio Analysis",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "video-audio-analysis",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "webhookId": "video-audio-analysis"
    },
    {
      "parameters": {
        "url": "={{$json.files[0].url}}",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file"
            }
          }
        }
      },
      "name": "Download Video",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "model": "whisper-1",
        "binaryData": true,
        "options": {
          "language": "en"
        }
      },
      "name": "OpenAI Whisper",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [650, 300],
      "credentials": {
        "openAiApi": {
          "id": "your-openai-credential-id",
          "name": "OpenAI API"
        }
      }
    },
    {
      "parameters": {
        "model": "gpt-4-vision-preview",
        "messages": {
          "values": [
            {
              "role": "system",
              "content": "You are an expert evaluator for presentations and videos. Analyze the provided content based on the given criteria."
            },
            {
              "role": "user",
              "content": "=Analyze this video transcript and provide scores for: {{$json.criteria}}\n\nTranscript: {{$json.transcription}}"
            }
          ]
        },
        "options": {
          "maxTokens": 2000
        }
      },
      "name": "OpenAI GPT-4 Vision",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [850, 300],
      "credentials": {
        "openAiApi": {
          "id": "your-openai-credential-id",
          "name": "OpenAI API"
        }
      }
    },
    {
      "parameters": {
        "functionCode": "// Extract scores from AI response\nconst aiResponse = items[0].json.choices[0].message.content;\nconst webhookData = $('Webhook').first().json;\n\n// Parse AI response to extract scores\n// This is a simplified example - adjust based on your AI response format\nconst scores = [\n  {\n    criterion: 'presentation_quality',\n    score: 88.0,\n    weight: 0.3,\n    comments: 'Excellent delivery and visual aids'\n  },\n  {\n    criterion: 'clarity',\n    score: 90.0,\n    weight: 0.25,\n    comments: 'Very clear articulation'\n  },\n  {\n    criterion: 'engagement',\n    score: 85.0,\n    weight: 0.25,\n    comments: 'Good audience engagement'\n  },\n  {\n    criterion: 'professionalism',\n    score: 87.0,\n    weight: 0.2,\n    comments: 'Professional presentation'\n  }\n];\n\n// Calculate overall score\nconst overallScore = scores.reduce((sum, s) => sum + (s.score * s.weight), 0);\n\n// Generate insights\nconst insights = [\n  {\n    type: 'strength',\n    title: 'Strong vocal presence',\n    description: 'Confident delivery with excellent tone',\n    priority: 5\n  },\n  {\n    type: 'recommendation',\n    title: 'Add more visual examples',\n    description: 'Consider including more diagrams and charts',\n    priority: 3\n  }\n];\n\nreturn {\n  json: {\n    submission_id: webhookData.submission_id,\n    callback_url: webhookData.callback_url,\n    overall_score: overallScore.toFixed(2),\n    confidence: 92.0,\n    scores: scores,\n    insights: insights,\n    processing_time: 45,\n    ai_raw_response: aiResponse\n  }\n};"
      },
      "name": "Calculate Scores",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [1050, 300]
    },
    {
      "parameters": {
        "functionCode": "const crypto = require('crypto');\n\n// Prepare payload\nconst payload = {\n  workflow_id: $workflow.id,\n  submission_id: items[0].json.submission_id,\n  status: 'completed',\n  agent: 'video_audio_analysis',\n  results: {\n    overall_score: parseFloat(items[0].json.overall_score),\n    confidence: items[0].json.confidence,\n    scores: items[0].json.scores,\n    insights: items[0].json.insights\n  },\n  processing_time: items[0].json.processing_time,\n  timestamp: new Date().toISOString()\n};\n\n// Your shared webhook secret (same as backend)\nconst secret = 'your-secure-shared-secret-key-here';\n\n// Calculate HMAC-SHA256 signature\nconst signature = crypto\n  .createHmac('sha256', secret)\n  .update(JSON.stringify(payload))\n  .digest('hex');\n\nreturn {\n  json: {\n    payload: payload,\n    signature: signature,\n    callback_url: items[0].json.callback_url\n  }\n};"
      },
      "name": "Generate HMAC Signature",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [1250, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{$json.callback_url}}",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "=",
              "value": "={{JSON.stringify($json.payload)}}"
            }
          ]
        },
        "options": {
          "headers": {
            "entries": [
              {
                "name": "X-N8n-Signature",
                "value": "={{$json.signature}}"
              },
              {
                "name": "X-Webhook-Secret",
                "value": "your-secure-shared-secret-key-here"
              }
            ]
          }
        }
      },
      "name": "Send to Backend",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1450, 300]
    },
    {
      "parameters": {
        "functionCode": "// Error handler\nconst webhookData = $('Webhook').first().json;\nconst errorMessage = $json.error?.message || 'Unknown error';\n\nconst errorPayload = {\n  workflow_id: $workflow.id,\n  submission_id: webhookData.submission_id,\n  agent: 'video_audio_analysis',\n  status: 'failed',\n  error: {\n    code: 'PROCESSING_ERROR',\n    message: errorMessage,\n    details: $json.error?.stack || '',\n    retry_attempted: true,\n    retry_count: 1\n  },\n  timestamp: new Date().toISOString()\n};\n\nreturn {\n  json: {\n    payload: errorPayload,\n    callback_url: webhookData.callback_url\n  }\n};"
      },
      "name": "Error Handler",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [850, 500]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{$json.callback_url}}/error-callback",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "=",
              "value": "={{JSON.stringify($json.payload)}}"
            }
          ]
        }
      },
      "name": "Send Error to Backend",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1050, 500]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Download Video",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Download Video": {
      "main": [
        [
          {
            "node": "OpenAI Whisper",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Whisper": {
      "main": [
        [
          {
            "node": "OpenAI GPT-4 Vision",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI GPT-4 Vision": {
      "main": [
        [
          {
            "node": "Calculate Scores",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Calculate Scores": {
      "main": [
        [
          {
            "node": "Generate HMAC Signature",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Generate HMAC Signature": {
      "main": [
        [
          {
            "node": "Send to Backend",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Error Handler": {
      "main": [
        [
          {
            "node": "Send Error to Backend",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## Workflow 2: Document Review

### Simplified Structure

```
1. Webhook Trigger (POST /webhook/document-review)
   ↓
2. HTTP Request - Download Document
   ↓
3. Function - Extract Text from PDF/Word
   ↓
4. OpenAI GPT-4 - Analyze Document
   Parameters:
   - Model: gpt-4-turbo
   - Prompt: "Analyze this document based on criteria: {{$json.criteria}}"
   ↓
5. Function - Calculate Scores & Generate Insights
   ↓
6. Function - Generate HMAC Signature
   ↓
7. HTTP Request - Send Results to Backend Callback
   Headers:
   - X-N8n-Signature: {{$json.signature}}
   - X-Webhook-Secret: your-secret
```

---

## Workflow 3: Source Code Assessment

### Simplified Structure

```
1. Webhook Trigger (POST /webhook/code-assessment)
   ↓
2. HTTP Request - Download ZIP File
   ↓
3. Function - Extract Files from ZIP
   ↓
4. Function - Analyze File Structure
   ↓
5. OpenAI GPT-4 - Code Review
   Parameters:
   - Model: gpt-4-turbo
   - Prompt: "Review this code for quality, architecture, and best practices"
   ↓
6. Function - Calculate Scores
   Criteria:
   - Code Quality (30%)
   - Architecture (25%)
   - Documentation (20%)
   - Best Practices (15%)
   - Testing (10%)
   ↓
7. Function - Generate HMAC Signature
   ↓
8. HTTP Request - Send Results to Backend
```

---

## Workflow 4: Custom Evaluation

### Simplified Structure

```
1. Webhook Trigger (POST /webhook/custom-evaluation)
   Receives: custom_criteria array
   ↓
2. Function - Parse Custom Criteria
   ↓
3. HTTP Request - Download Files
   ↓
4. OpenAI GPT-4 - Custom Analysis
   Dynamically apply custom criteria
   ↓
5. Function - Calculate Custom Scores
   Use weights from custom_criteria
   ↓
6. Function - Generate HMAC Signature
   ↓
7. HTTP Request - Send Results to Backend
```

---

## Workflow 5: Report Generation

### Simplified Structure

```
1. Webhook Trigger (POST /webhook/report-generation)
   Receives: evaluation_data
   ↓
2. Function - Format Report Data
   ↓
3. OpenAI GPT-4 - Generate Report Content
   Create executive summary and recommendations
   ↓
4. Function - Create PDF
   Use PDF generation library or service
   ↓
5. HTTP Request - Upload PDF to Storage
   ↓
6. Function - Generate HMAC Signature
   ↓
7. HTTP Request - Send Report URL to Backend
   Payload:
   {
     "submission_id": "...",
     "evaluation_id": "...",
     "report_url": "https://storage.../report.pdf",
     "report_format": "pdf",
     "file_size": 245760,
     "status": "completed"
   }
```

---

## Workflow 6: Consistency Check

### Simplified Structure

```
1. Webhook Trigger (POST /webhook/consistency-check)
   Receives: preliminary_scores, historical_data
   ↓
2. Function - Fetch Historical Averages
   ↓
3. OpenAI GPT-4 - Consistency Analysis
   Compare with historical patterns
   ↓
4. Function - Adjust Scores if Needed
   Apply normalization if necessary
   ↓
5. Function - Calculate Confidence Score
   ↓
6. Function - Generate HMAC Signature
   ↓
7. HTTP Request - Send Adjusted Results to Backend
```

---

## Common Function: HMAC Signature Generator

Use this in every workflow before sending results back:

```javascript
// Add this as a Function node in all workflows

const crypto = require('crypto');

// Get webhook data from first node
const webhookData = $('Webhook').first().json;

// Prepare payload (customize per workflow)
const payload = {
  workflow_id: $workflow.id,
  submission_id: webhookData.submission_id,
  status: 'completed',
  agent: 'workflow_name_here', // Change per workflow
  results: items[0].json.results,
  processing_time: items[0].json.processing_time || 30,
  timestamp: new Date().toISOString()
};

// Your shared webhook secret (MUST match backend .env)
const secret = 'your-secure-shared-secret-key-here';

// Calculate HMAC-SHA256 signature
const signature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(payload))
  .digest('hex');

// Return payload with signature
return {
  json: {
    payload: payload,
    signature: signature,
    callback_url: webhookData.callback_url
  }
};
```

---

## Common Function: Error Handler

Add this as error handling in all workflows:

```javascript
// Error Handler Function

const webhookData = $('Webhook').first().json;
const error = $input.first().json.error || {};

const errorPayload = {
  workflow_id: $workflow.id,
  submission_id: webhookData.submission_id,
  agent: 'workflow_name_here', // Change per workflow
  status: 'failed',
  error: {
    code: 'PROCESSING_ERROR',
    message: error.message || 'Unknown error occurred',
    details: error.stack || '',
    retry_attempted: true,
    retry_count: $executionMode === 'retry' ? 1 : 0
  },
  timestamp: new Date().toISOString()
};

const secret = 'your-secure-shared-secret-key-here';

const signature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(errorPayload))
  .digest('hex');

return {
  json: {
    payload: errorPayload,
    signature: signature,
    callback_url: webhookData.callback_url + '/error-callback'
  }
};
```

---

## Import Instructions

### How to Import Workflows to N8n Cloud

1. **Log in** to https://iti-genai.app.n8n.cloud

2. **Click "+ Add Workflow"** in the top right

3. **Click the three dots menu** (⋯) → **Import from File/URL**

4. **Paste the workflow JSON** from above

5. **Click "Import"**

6. **Update Credentials:**
   - Click on OpenAI nodes
   - Add your OpenAI API credentials
   - Save

7. **Update Secrets:**
   - Find all instances of `your-secure-shared-secret-key-here`
   - Replace with your actual webhook secret
   - Use the same secret in all workflows AND backend .env

8. **Activate Workflow:**
   - Click "Active" toggle in top right
   - Workflow is now live

9. **Test the Workflow:**
   - Copy the webhook URL
   - Use curl or Postman to send test payload
   - Check execution log

---

## Quick Setup Checklist

For each workflow:

- [ ] Import workflow JSON to N8n Cloud
- [ ] Add OpenAI API credentials
- [ ] Replace webhook secret placeholders
- [ ] Update callback URL if different
- [ ] Activate workflow
- [ ] Copy webhook URL
- [ ] Test with sample payload
- [ ] Verify callback reaches backend
- [ ] Check webhook logs in backend database

---

## Testing Payloads

### Test Video Analysis

```bash
curl -X POST https://iti-genai.app.n8n.cloud/webhook/video-audio-analysis \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-secret" \
  -d '{
    "submission_id": "test-uuid-123",
    "callback_url": "https://api.aasim.app/api/v1/webhooks",
    "files": [{
      "type": "video",
      "url": "https://example.com/test.mp4",
      "filename": "test.mp4"
    }],
    "criteria": {
      "presentation_quality": 0.3,
      "clarity": 0.25,
      "engagement": 0.25,
      "professionalism": 0.2
    }
  }'
```

### Test Document Review

```bash
curl -X POST https://iti-genai.app.n8n.cloud/webhook/document-review \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: your-secret" \
  -d '{
    "submission_id": "test-uuid-456",
    "callback_url": "https://api.aasim.app/api/v1/webhooks",
    "files": [{
      "type": "document",
      "url": "https://example.com/report.pdf",
      "filename": "report.pdf"
    }],
    "criteria": {
      "content_quality": 0.35,
      "structure": 0.25,
      "formatting": 0.2,
      "references": 0.2
    }
  }'
```

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
**N8n Cloud:** iti-genai.app.n8n.cloud
