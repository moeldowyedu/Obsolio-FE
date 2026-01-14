# Backend API Integration Guide

This document describes how the Aasim AI frontend is integrated with the Laravel backend API running on `localhost:8000`.

## Configuration

### Environment Variables

The frontend uses environment variables to configure the backend API connection:

```bash
# .env file
VITE_API_URL=https://api.obsolio.com//api
VITE_API_BASE_URL=https://api.obsolio.com//api/v1
```

### API Client Configuration

The main API client is configured in `/src/services/api.js`:

- **Base URL**: `https://api.obsolio.com//api/v1` (from `VITE_API_BASE_URL`)
- **Timeout**: 30 seconds
- **Retry Logic**: Exponential backoff with max 3 retries for network/5xx errors
- **Authentication**: Automatic JWT Bearer token injection via request interceptors
- **Multi-tenancy**: Automatic `X-Tenant-ID` header injection

## API Service Layer

All backend API endpoints are organized into service modules in `/src/services/`:

### Authentication & User Management

#### `authService.js`
- `login(credentials)` - User login
- `register(userData)` - User registration
- `logout()` - User logout
- `forgotPassword(email)` - Password recovery
- `resetPassword(token, newPassword)` - Reset password
- `getCurrentUser()` - Get current user profile
- `updateProfile(profileData)` - Update user profile
- `changePassword(currentPassword, newPassword)` - Change password
- `refreshToken()` - Refresh JWT token
- `getDashboardStats()` - Get dashboard statistics

#### `userService.js`
- `getUsers(params)` - Get all users
- `getUserById(userId)` - Get user by ID
- `createUser(userData)` - Create new user
- `updateUser(userId, userData)` - Update user
- `deleteUser(userId)` - Delete user
- `assignUser(userId, assignmentData)` - Assign user to entity
- `getUserAssignments(userId)` - Get user assignments
- `updateUserStatus(userId, status)` - Update user status

### Roles & Permissions

#### `rolesPermissionsService.js`
- `getRoles(params)` - Get all roles
- `getRoleById(roleId)` - Get role by ID
- `createRole(roleData)` - Create new role
- `updateRole(roleId, roleData)` - Update role
- `deleteRole(roleId)` - Delete role
- `getPermissions(params)` - Get all permissions
- `getPermissionsList()` - Get simplified permissions list
- `getPermissionById(permissionId)` - Get permission by ID

### Organization Management

#### `organizationService.js`

**Organizations:**
- `organizations.list(params)` - Get all organizations
- `organizations.get(id)` - Get organization by ID
- `organizations.create(data)` - Create organization
- `organizations.update(id, data)` - Update organization
- `organizations.delete(id)` - Delete organization
- `organizations.getDashboard(id)` - Get organization dashboard
- `organizations.getBranches(organizationId)` - Get branches by organization
- `organizations.getDepartments(organizationId)` - Get departments by organization

**Branches:**
- `branches.list(filters)` - Get all branches
- `branches.get(id)` - Get branch by ID
- `branches.create(data)` - Create branch
- `branches.update(id, data)` - Update branch
- `branches.delete(id)` - Delete branch
- `branches.getDepartments(branchId)` - Get departments by branch

**Departments:**
- `departments.list()` - Get all departments
- `departments.get(id)` - Get department by ID
- `departments.create(data)` - Create department
- `departments.update(id, data)` - Update department
- `departments.delete(id)` - Delete department
- `departments.getProjects(departmentId)` - Get projects by department

**Projects:**
- `projects.list(filters)` - Get all projects
- `projects.get(id)` - Get project by ID
- `projects.create(data)` - Create project
- `projects.update(id, data)` - Update project
- `projects.delete(id)` - Delete project
- `projects.updateStatus(id, status)` - Update project status

**Teams:**
- `teams.list(filters)` - Get all teams
- `teams.get(id)` - Get team by ID
- `teams.create(data)` - Create team
- `teams.update(id, data)` - Update team
- `teams.delete(id)` - Delete team
- `teams.addMember(teamId, memberData)` - Add team member
- `teams.removeMember(teamId, userId)` - Remove team member

### Agent Management

#### `agentService.js`
- `getAgents(params)` - Get all agents
- `getAgent(agentId)` - Get agent by ID
- `createAgent(agentData)` - Create new agent
- `updateAgent(agentId, agentData)` - Update agent
- `deleteAgent(agentId)` - Delete agent
- `cloneAgent(agentId, cloneData)` - Clone agent
- `executeAgent(agentId, inputData)` - Execute agent
- `getAgentExecutions(agentId, params)` - Get agent executions
- `publishToMarketplace(agentId, publishData)` - Publish to marketplace
- `getAgentsAnalytics(params)` - Get agent analytics

#### `executionsService.js`
- `getExecutions(params)` - Get all executions
- `getExecutionById(executionId)` - Get execution by ID
- `cancelExecution(executionId)` - Cancel execution
- `getExecutionLogs(executionId, params)` - Get execution logs
- `getExecutionAnalytics(params)` - Get execution analytics

### Engines & AI

#### `engineService.js`
- `getEngines()` - Get all engines
- `getEngine(engineId)` - Get engine by ID
- `testEngine(engineId, testData)` - Test engine
- `getRubrics(engineId, params)` - Get engine rubrics
- `createRubric(engineId, rubricData)` - Create rubric
- `updateRubric(engineId, rubricId, rubricData)` - Update rubric
- `deleteRubric(engineId, rubricId)` - Delete rubric

### Workflows & Automation

#### `workflowService.js`
- `getWorkflows(params)` - Get all workflows
- `getWorkflowById(workflowId)` - Get workflow by ID
- `createWorkflow(workflowData)` - Create workflow
- `updateWorkflow(workflowId, workflowData)` - Update workflow
- `deleteWorkflow(workflowId)` - Delete workflow
- `executeWorkflow(workflowId, executionData)` - Execute workflow
- `getWorkflowExecutions(workflowId, params)` - Get workflow executions
- `getExecutionDetails(executionId)` - Get execution details

#### `jobFlowService.js`
- `getJobFlows(params)` - Get all job flows
- `getJobFlowById(jobFlowId)` - Get job flow by ID
- `createJobFlow(jobFlowData)` - Create job flow
- `updateJobFlow(jobFlowId, jobFlowData)` - Update job flow
- `deleteJobFlow(jobFlowId)` - Delete job flow
- `triggerJobFlow(jobFlowId, triggerData)` - Trigger job flow
- `updateJobFlowStatus(jobFlowId, status)` - Update job flow status
- `getJobFlowStats(jobFlowId)` - Get job flow statistics

### Human-in-the-Loop (HITL)

#### `hitlService.js`
- `getApprovals(params)` - Get all HITL approvals
- `getPendingApprovals()` - Get pending approvals
- `getApproval(approvalId)` - Get approval by ID
- `approve(approvalId, notes)` - Approve execution
- `reject(approvalId, reason)` - Reject execution
- `escalate(approvalId, escalationData)` - Escalate approval

### Integrations

#### `webhookService.js`
- Webhook management endpoints

#### `connectedAppsService.js`
- `getConnectedApps(params)` - Get all connected apps
- `getConnectedAppById(appId)` - Get app by ID
- `createConnectedApp(appData)` - Create connected app
- `updateConnectedApp(appId, appData)` - Update connected app
- `deleteConnectedApp(appId)` - Delete connected app
- `testConnection(appId)` - Test app connection
- `syncApp(appId, syncData)` - Sync app data
- `refreshToken(appId)` - Refresh app token
- `revokeAccess(appId)` - Revoke app access
- `getAppLogs(appId, params)` - Get app logs

#### `apiKeysService.js`
- `getApiKeys(params)` - Get all API keys
- `getApiKeyById(apiKeyId)` - Get API key by ID
- `createApiKey(apiKeyData)` - Create API key
- `updateApiKey(apiKeyId, apiKeyData)` - Update API key
- `deleteApiKey(apiKeyId)` - Delete API key
- `regenerateApiKey(apiKeyId)` - Regenerate API key
- `toggleApiKey(apiKeyId)` - Toggle API key status

### Billing & Subscriptions

#### `billingService.js`
- Billing management endpoints

#### `subscriptionsService.js`
- `getSubscriptions(params)` - Get all subscriptions
- `getCurrentSubscription()` - Get current subscription
- `subscribe(subscriptionData)` - Subscribe to plan
- `cancelSubscription(cancelData)` - Cancel subscription
- `getUsage(params)` - Get usage statistics
- `getUsageByDate(date)` - Get usage by date

### Activities & Monitoring

#### `activitiesService.js`
- `getActivities(params)` - Get all activities
- `getActivityById(activityId)` - Get activity by ID
- `getActivitiesByUser(userId, params)` - Get activities by user
- `exportActivities(params)` - Export activities
- `getSessions(params)` - Get all sessions
- `getActiveSessions()` - Get active sessions
- `terminateSession(sessionId)` - Terminate session

## Usage Examples

### Basic Usage

```javascript
import { authService, agentService } from '@/services';

// Login
const loginData = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get agents
const agents = await agentService.getAgents({
  page: 1,
  per_page: 10
});

// Execute agent
const execution = await agentService.executeAgent(agentId, {
  input: 'Process this data'
});
```

### Using with Zustand Stores

```javascript
// In a Zustand store
import { agentService } from '@/services';

export const useAgentStore = create((set) => ({
  agents: [],
  isLoading: false,

  fetchAgents: async (params) => {
    set({ isLoading: true });
    try {
      const data = await agentService.getAgents(params);
      set({ agents: data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));
```

### Error Handling

All API calls automatically handle errors through the axios interceptor:

- **401 Unauthorized**: Automatically clears tokens and redirects to login
- **403 Forbidden**: Logs access forbidden error
- **404 Not Found**: Logs resource not found error
- **429 Rate Limit**: Automatically retries with exponential backoff
- **5xx Server Errors**: Automatically retries with exponential backoff
- **Network Errors**: Shows helpful message about backend connection

## Authentication Flow

1. User logs in via `authService.login()`
2. Backend returns JWT token and user data
3. Token is stored in `localStorage.auth_token`
4. User data is stored in `localStorage.user`
5. All subsequent API requests automatically include `Authorization: Bearer {token}` header
6. If token expires (401 error), user is automatically redirected to login

## Multi-tenancy Support

The frontend supports multi-tenancy through the `X-Tenant-ID` header:

```javascript
// Tenant ID is automatically added from localStorage
localStorage.setItem('current_tenant_id', 'tenant-123');

// All API requests will now include: X-Tenant-ID: tenant-123
```

## Development & Testing

### Starting the Backend

Make sure the Laravel backend is running on `localhost:8000`:

```bash
cd backend
php artisan serve
```

### Starting the Frontend

```bash
npm run dev
```

The Vite dev server includes a proxy that routes `/api/*` requests to `https://api.obsolio.com/`.

### Testing API Endpoints

Use the built-in API health check utility:

```javascript
import { checkAPIHealth, runAPIDiagnostics } from '@/utils/apiHealthCheck';

// Check if backend is reachable
const isHealthy = await checkAPIHealth();

// Run full diagnostics
const diagnostics = await runAPIDiagnostics();
console.log(diagnostics);
```

## API Response Format

The Laravel backend returns responses in this format:

```javascript
{
  success: true,
  data: {
    // Response data here
  },
  message: "Success message",
  meta: {
    // Pagination or metadata
  }
}
```

## Troubleshooting

### Backend Not Reachable

If you see "Cannot connect to backend server" errors:

1. Ensure Laravel backend is running on `localhost:8000`
2. Check `.env` file has correct `VITE_API_BASE_URL`
3. Check browser console for CORS errors
4. Verify backend CORS configuration allows frontend origin

### Authentication Issues

If you're getting 401 errors:

1. Check if token exists in localStorage: `localStorage.getItem('auth_token')`
2. Try logging in again
3. Check if token has expired
4. Verify backend JWT configuration

### API Request Failures

1. Check browser Network tab for failed requests
2. Look for detailed error messages in browser console
3. Use `runAPIDiagnostics()` to check API health
4. Verify request payload matches backend expectations

## Migration Notes

If you have existing code using old API endpoints:

1. **Agent Execution**: Replace `/agents/{id}/run` with `/agents/{id}/execute`
2. **Agent Cloning**: Replace `/agents/{id}/duplicate` with `/agents/{id}/clone`
3. **HITL Approvals**: Replace `/hitl/approvals` with `/hitl-approvals`

The old methods are kept as aliases for backward compatibility but will be deprecated.
