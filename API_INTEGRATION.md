# 🔌 API Integration Guide

Complete guide for integrating Aasim-FE with Aasim-BE backend.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Configuration](#configuration)
3. [Testing Connection](#testing-connection)
4. [Available Services](#available-services)
5. [Error Handling](#error-handling)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The Aasim frontend is fully integrated with the backend API using:
- **Axios** for HTTP requests
- **Automatic authentication** via JWT tokens
- **Multi-tenant support** via X-Tenant-ID header
- **Retry logic** with exponential backoff
- **Comprehensive error handling**

## Configuration

### Environment Variables

The frontend uses environment variables to configure the API connection. Create or update the `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=https://api.obsolio.com//api/v1
VITE_WEBHOOK_BASE_URL=https://webhooks.aasim.ai

# Feature Flags
VITE_ENABLE_ENGINES=true
VITE_ENABLE_AGENTX_HUB=true
VITE_ENABLE_HITL=true
VITE_ENABLE_MULTI_TENANT=true
```

### Backend URL Configuration

**Development:**
```env
VITE_API_BASE_URL=https://api.obsolio.com//api/v1
```

**Production:**
```env
VITE_API_BASE_URL=https://api.aasim.app/v1
```

**Custom Backend:**
```env
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

### Proxy Configuration

For local development, the frontend includes a proxy configuration in `vite.config.js` to avoid CORS issues:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://api.obsolio.com/',
      changeOrigin: true,
      secure: false
    }
  }
}
```

---

## Testing Connection

### Method 1: API Test Page

Navigate to the API Test Page in your browser:

```
http://localhost:5173/api-test
```

This page provides:
- ✅ Health check functionality
- 📊 Full API diagnostics
- 🧪 Custom endpoint testing
- 📡 Real-time connection status

### Method 2: Using Health Check Utility

```javascript
import { checkAPIHealth } from './utils/apiHealthCheck';

// Check API health
const result = await checkAPIHealth();
console.log(result);
// {
//   success: true,
//   status: 'healthy',
//   message: 'Backend API is reachable and healthy',
//   responseTime: 123
// }
```

### Method 3: Run Diagnostics

```javascript
import { runAPIDiagnostics } from './utils/apiHealthCheck';

const diagnostics = await runAPIDiagnostics();
console.log(diagnostics);
```

### Method 4: Browser Console

Open browser console and check for:
```
🌐 API Configuration: {
  baseURL: "https://api.obsolio.com//api/v1",
  environment: "development"
}
```

---

## Available Services

All API services are located in `src/services/` and follow a consistent pattern:

### Authentication Service

```javascript
import { authService } from './services';

// Login
const { token, user } = await authService.login({ email, password });

// Register
await authService.register(userData);

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### Agent Service

```javascript
import { agentService } from './services';

// Get all agents
const agents = await agentService.getAgents();

// Get agent by ID
const agent = await agentService.getAgent(agentId);

// Create agent
const newAgent = await agentService.createAgent(agentData);

// Update agent
await agentService.updateAgent(agentId, updates);

// Delete agent
await agentService.deleteAgent(agentId);

// Run agent
const result = await agentService.runAgent(agentId, inputData);
```

### Workflow/Orchestration Service

```javascript
import { orchestrationService } from './services';

// Get workflows
const workflows = await orchestrationService.getWorkflows();

// Create workflow
const workflow = await orchestrationService.createWorkflow(data);

// Execute workflow
const execution = await orchestrationService.executeWorkflow(workflowId, input);

// Get execution history
const history = await orchestrationService.getWorkflowHistory(workflowId);
```

### Tenant Service

```javascript
import { tenantService } from './services';

// Get all tenants
const tenants = await tenantService.getTenants();

// Switch tenant
await tenantService.switchTenant(tenantId);

// Get tenant users
const users = await tenantService.getTenantUsers(tenantId);

// Invite user
await tenantService.inviteUser(tenantId, email, role);
```

### Marketplace Service

```javascript
import { marketplaceService } from './services';

// Browse agents
const agents = await marketplaceService.browseAgents();

// Get featured agents
const featured = await marketplaceService.getFeaturedAgents();

// Purchase agent
await marketplaceService.purchaseAgent(agentId);

// Get seller stats
const stats = await marketplaceService.getSellerStats();
```

### Engine Service

```javascript
import { engineService } from './services';

// Get available engines
const engines = await engineService.getEngines();

// Vision engine
const result = await engineService.vision.analyzeImage(imageData);

// Text engine
const entities = await engineService.text.extractEntities(text);

// Code engine
const bugs = await engineService.code.detectBugs(code, 'javascript');
```

### Billing Service

```javascript
import { billingService } from './services';

// Get subscription plans
const plans = await billingService.getPlans();

// Subscribe
await billingService.subscribe(planId, paymentMethodId);

// Get invoices
const invoices = await billingService.getInvoices();

// Get usage
const usage = await billingService.getUsage();
```

### Other Services

- **webhookService** - Webhook management
- **schedulerService** - Scheduled task management
- **hitlService** - Human-in-the-loop functionality

---

## Error Handling

The API client includes comprehensive error handling:

### Automatic Retry Logic

- **Network errors**: Retried up to 3 times with exponential backoff
- **5xx server errors**: Automatically retried
- **429 rate limiting**: Retried with backoff
- **4xx client errors**: NOT retried (e.g., 401, 403, 404)

### Error Status Handling

```javascript
try {
  await agentService.getAgent(agentId);
} catch (error) {
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 401:
        // User logged out, redirected to login
        console.log('Unauthorized');
        break;
      case 403:
        console.log('Forbidden - insufficient permissions');
        break;
      case 404:
        console.log('Agent not found');
        break;
      case 500:
        console.log('Server error');
        break;
    }
  } else if (error.request) {
    // Network error - backend not reachable
    console.log('Cannot connect to backend');
    console.log(error.userMessage); // User-friendly message
  }
}
```

### User-Friendly Error Messages

Network errors include helpful messages:

```javascript
error.userMessage = "Cannot connect to backend server at https://api.obsolio.com//api/v1. Please ensure the backend is running."
```

---

## Troubleshooting

### Issue: Cannot connect to backend

**Error:**
```
🌐 Network error - Cannot reach backend API: Network Error
💡 Make sure the backend server is running at: https://api.obsolio.com//api/v1
```

**Solutions:**

1. **Verify backend is running**
   ```bash
   # Check if backend is running
   curl https://api.obsolio.com//api/v1/health
   ```

2. **Check .env file**
   - Make sure `.env` file exists
   - Verify `VITE_API_BASE_URL` is correct
   - Restart dev server after changing `.env`

3. **Check CORS configuration**
   - Backend must allow requests from `http://localhost:5173`
   - Check backend CORS settings

4. **Use proxy**
   - Development proxy is configured in `vite.config.js`
   - Requests to `/api/*` are proxied to backend

### Issue: 401 Unauthorized

**Solutions:**

1. **Login again** - Token may have expired
2. **Check localStorage** - Token stored as `auth_token`
3. **Verify backend authentication** - Ensure backend accepts JWT tokens

### Issue: CORS errors

**Solutions:**

1. **Use development proxy** - Already configured
2. **Backend CORS headers** - Ensure backend sends proper CORS headers:
   ```
   Access-Control-Allow-Origin: http://localhost:5173
   Access-Control-Allow-Credentials: true
   ```

### Issue: Slow response times

**Check:**

1. **Network tab** - Monitor request times
2. **Backend logs** - Check for slow database queries
3. **Retry logic** - May be retrying failed requests

---

## Quick Start Checklist

- [ ] Create `.env` file with `VITE_API_BASE_URL`
- [ ] Start backend server
- [ ] Start frontend dev server: `npm run dev`
- [ ] Navigate to API Test Page: `http://localhost:5173/api-test`
- [ ] Run health check
- [ ] Verify connection is successful
- [ ] Test login functionality
- [ ] Test protected endpoints

---

## API Endpoints Reference

### Authentication
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

### Agents
- `GET /agents` - List agents
- `POST /agents` - Create agent
- `GET /agents/:id` - Get agent
- `PUT /agents/:id` - Update agent
- `DELETE /agents/:id` - Delete agent
- `POST /agents/:id/run` - Run agent

### Workflows
- `GET /workflows` - List workflows
- `POST /workflows` - Create workflow
- `POST /workflows/:id/execute` - Execute workflow
- `GET /workflows/:id/history` - Get execution history

### Marketplace
- `GET /marketplace/agents` - Browse marketplace
- `GET /marketplace/featured` - Featured agents
- `POST /marketplace/agents/:id/purchase` - Purchase agent

### Billing
- `GET /billing/plans` - Get subscription plans
- `POST /billing/subscribe` - Subscribe to plan
- `GET /billing/invoices` - Get invoices

---

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Use the API Test Page to diagnose connection issues
3. Check browser console for detailed error logs
4. Verify backend is running and accessible

---

**Last Updated:** November 2024
