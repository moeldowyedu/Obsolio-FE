# Backend API Requirements for Admin Console

This document outlines the API endpoints that need to be implemented in the backend to support the full Admin Console functionality.

## Quick Summary

**New Pages Implemented (Frontend Ready):**
1. ✅ **Agent Categories Management** (`/agent-categories`) - Full CRUD UI ready
2. ✅ **Agent Runs Monitoring** (`/agent-runs`) - Execution history tracking UI ready
3. ✅ **Hierarchical Agents Menu** - Navigation structure with Categories → Agents → Agent Runs → Active Agents

**Backend APIs Needed Immediately (Phase 1):**
- `/admin/agent-categories` - CRUD operations (4 endpoints)
- `/admin/agent-runs` - List and statistics (3 endpoints)
- `/admin/agents` - CRUD operations (6 endpoints)
- `/admin/subscription-plans` - CRUD operations (4 endpoints)

## Current Status

Based on the OpenAPI specification at `https://api.obsolio.com/docs?api-docs.json`, the following endpoints are **already available**:

### ✅ Implemented Endpoints

#### Tenant Management
- `GET /tenants` - List all tenants (admin sees all)
- `POST /tenants` - Create new tenant
- `GET /tenant` - Get current tenant
- `PUT /tenant` - Update tenant
- `POST /tenants/{id}/switch` - Switch tenant context

#### Organization Management
- `GET /organizations` - List organizations (paginated)
- `POST /organizations` - Create organization
- `GET /organizations/{organization}` - Get organization details
- `PUT /organizations/{organization}` - Update organization
- `DELETE /organizations/{organization}` - Delete organization
- `POST /organizations/{organization}/switch` - Switch organization context

#### Agent Execution
- `POST /agents/{id}/run` - Execute agent asynchronously
- `GET /agent-runs/{run_id}` - Get agent execution status
- `POST /webhooks/agents/callback` - Agent callback webhook

#### Roles & Permissions
- `GET /permissions` - List permissions (grouped)
- `GET /permissions/list` - List permissions (flat)
- `GET /roles` - List roles
- `POST /roles` - Create role
- `GET /roles/{id}` - Get role details
- `PUT /roles/{id}` - Update role
- `DELETE /roles/{id}` - Delete role

#### Activities & Sessions
- `GET /activities` - Get activity logs (paginated)
- `GET /sessions` - List active sessions
- `POST /sessions/{id}/terminate` - Terminate session

#### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

#### Utilities
- `GET /tenants/check-availability/{subdomain}` - Check subdomain availability
- `POST /auth/lookup-tenant` - Lookup tenant by identifier

---

## 🚧 Missing Endpoints - Implementation Required

The following endpoints are referenced in the frontend but **do not exist** in the current API. They need to be implemented:

### 1. Agent Management (CRUD)

#### Base Path: `/admin/agents`

**List Agents**
```http
GET /admin/agents
Query Parameters:
  - page: integer (default: 1)
  - per_page: integer (default: 20)
  - status: string (active, inactive)
  - category: string (category ID or name)
  - runtime_type: string (python, nodejs)
  - search: string (search by name, slug, description)
  - sort: string (created_desc, created_asc, name_asc, name_desc, runs_desc, runs_asc)

Response: 200 OK
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "name": "Agent Name",
        "slug": "agent-slug",
        "category_id": "uuid",
        "category": "Category Name",
        "description": "Agent description",
        "runtime_type": "python",
        "version": "1.0.0",
        "status": "active",
        "is_featured": true,
        "total_runs": 1234,
        "success_rate": 98.5,
        "code": "agent code",
        "requirements": "dependencies",
        "config_schema": "{}",
        "icon_url": "https://...",
        "documentation": "markdown docs",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ],
    "current_page": 1,
    "last_page": 10,
    "per_page": 20,
    "total": 200
  }
}
```

**Get Agent Details**
```http
GET /admin/agents/{id}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Agent Name",
    ... (full agent object)
  }
}
```

**Create Agent**
```http
POST /admin/agents
Content-Type: application/json

Body:
{
  "name": "Agent Name",
  "slug": "agent-slug",
  "category_id": "uuid",
  "description": "Description",
  "runtime_type": "python",
  "version": "1.0.0",
  "code": "agent code",
  "requirements": "dependencies",
  "config_schema": "{}",
  "is_active": true,
  "is_featured": false,
  "icon_url": "https://...",
  "documentation": "markdown"
}

Response: 201 Created
{
  "success": true,
  "data": { ... agent object }
}
```

**Update Agent**
```http
PUT /admin/agents/{id}
Content-Type: application/json

Body: (same as create, all fields optional)

Response: 200 OK
{
  "success": true,
  "data": { ... updated agent object }
}
```

**Delete Agent**
```http
DELETE /admin/agents/{id}

Response: 200 OK
{
  "success": true,
  "message": "Agent deleted successfully"
}
```

**Bulk Activate Agents**
```http
POST /admin/agents/bulk-activate
Content-Type: application/json

Body:
{
  "agent_ids": ["uuid1", "uuid2", ...]
}

Response: 200 OK
{
  "success": true,
  "message": "X agents activated successfully"
}
```

**Bulk Deactivate Agents**
```http
POST /admin/agents/bulk-deactivate
Content-Type: application/json

Body:
{
  "agent_ids": ["uuid1", "uuid2", ...]
}

Response: 200 OK
{
  "success": true,
  "message": "X agents deactivated successfully"
}
```

---

### 2. Agent Categories

#### Base Path: `/admin/agent-categories`

**List Categories**
```http
GET /admin/agent-categories
Query Parameters:
  - search: string (search by name, slug, description)
  - sort: string (display_order, name_asc, name_desc, agents_count_desc)

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Data Processing",
      "slug": "data-processing",
      "description": "Category description",
      "icon": "database",
      "display_order": 1,
      "agents_count": 25,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Create Category**
```http
POST /admin/agent-categories
Content-Type: application/json

Body:
{
  "name": "Category Name",
  "slug": "category-slug",
  "description": "Description",
  "icon": "icon-name",
  "display_order": 1
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Category Name",
    "slug": "category-slug",
    "description": "Description",
    "icon": "icon-name",
    "display_order": 1,
    "agents_count": 0,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Update Category**
```http
PUT /admin/agent-categories/{id}
Content-Type: application/json

Body:
{
  "name": "Updated Category Name",
  "slug": "updated-category-slug",
  "description": "Updated description",
  "icon": "updated-icon",
  "display_order": 2
}

Response: 200 OK
{
  "success": true,
  "data": { ... updated category object }
}
```

**Delete Category**
```http
DELETE /admin/agent-categories/{id}

Response: 200 OK
{
  "success": true,
  "message": "Category deleted successfully"
}

Note: Should check if category has agents assigned. If yes, either:
- Return error 422: "Cannot delete category with assigned agents"
- OR reassign agents to "Uncategorized" before deletion
```

**Validation Rules for Agent Categories:**
- `name`: required, string, max:255
- `slug`: required, string, unique, lowercase, alphanumeric + hyphens
- `description`: nullable, string
- `icon`: nullable, string, max:100 (lucide-react icon name)
- `display_order`: integer, min:1

---

### 3. Agent Runs (Execution History)

#### Base Path: `/admin/agent-runs`

**List Agent Runs**
```http
GET /admin/agent-runs
Query Parameters:
  - page: integer (default: 1)
  - per_page: integer (default: 20)
  - agent_id: uuid (filter by specific agent)
  - status: string (pending, running, completed, failed)
  - date_from: datetime (YYYY-MM-DD HH:mm:ss or YYYY-MM-DD)
  - date_to: datetime (YYYY-MM-DD HH:mm:ss or YYYY-MM-DD)
  - search: string (search by agent name or run ID)
  - sort: string (started_at_desc, started_at_asc, duration_desc)

Response: 200 OK
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "agent_id": "uuid",
        "agent_name": "Data ETL Pipeline",
        "status": "completed",
        "input": "{\"source\":\"database_a\",\"destination\":\"warehouse\"}",
        "output": "{\"processed\":1500,\"errors\":0}",
        "error": null,
        "started_at": "2024-01-27T10:30:00Z",
        "completed_at": "2024-01-27T10:30:04Z",
        "duration_ms": 4532,
        "triggered_by": {
          "id": "uuid",
          "name": "User Name",
          "email": "user@example.com"
        }
      }
    ],
    "current_page": 1,
    "last_page": 10,
    "per_page": 20,
    "total": 200
  }
}
```

**Get Agent Run Details**
```http
GET /admin/agent-runs/{run_id}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "agent_id": "uuid",
    "agent_name": "Data ETL Pipeline",
    "status": "completed",
    "input": "{...}",
    "output": "{...}",
    "error": null,
    "started_at": "2024-01-27T10:30:00Z",
    "completed_at": "2024-01-27T10:30:04Z",
    "duration_ms": 4532,
    "triggered_by": {
      "id": "uuid",
      "name": "User Name",
      "email": "user@example.com"
    },
    "logs": [
      {
        "timestamp": "2024-01-27T10:30:01Z",
        "level": "info",
        "message": "Starting ETL process..."
      }
    ]
  }
}
```

**Get Agent Runs Statistics**
```http
GET /admin/agent-runs/statistics
Query Parameters:
  - agent_id: uuid (optional, filter by specific agent)
  - date_from: datetime
  - date_to: datetime

Response: 200 OK
{
  "success": true,
  "data": {
    "total": 1234,
    "completed": 1100,
    "running": 12,
    "failed": 102,
    "pending": 20,
    "success_rate": 91.5,
    "avg_duration_ms": 5432,
    "total_duration_ms": 6700000
  }
}
```

**Database Schema for Agent Runs:**
```sql
-- agent_runs table (may already exist, verify fields)
id: uuid, primary key
agent_id: uuid, foreign key (agents.id)
status: enum('pending', 'running', 'completed', 'failed')
input: json or text
output: json or text, nullable
error: text, nullable
started_at: timestamp
completed_at: timestamp, nullable
duration_ms: integer, nullable
triggered_by_user_id: uuid, nullable, foreign key (users.id)
created_at: timestamp
updated_at: timestamp
```

**Notes on Agent Runs:**
- Runs should be **read-only** from the admin panel (no create/update/delete)
- The `POST /agents/{id}/run` endpoint (already exists) creates new runs
- Agent runs should be retained for analytics (consider archiving old runs after 90 days)
- Consider indexing on: agent_id, status, started_at for performance
- Consider adding pagination limit (max 100 per page) for performance

---

### 4. Subscription Plans Management

#### Base Path: `/admin/subscription-plans`

**List Plans**
```http
GET /admin/subscription-plans
Query Parameters:
  - type: string (personal, organization)
  - tier: string (starter, pro, team, enterprise)
  - is_published: boolean
  - is_active: boolean

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Pro Plan",
      "type": "personal",
      "tier": "pro",
      "description": "Plan description",
      "price_monthly": 29.99,
      "price_annual": 299.99,
      "trial_days": 14,
      "is_published": true,
      "is_active": true,
      "display_order": 2,
      "features": ["Feature 1", "Feature 2"],
      "max_users": 5,
      "max_agents": 20,
      "storage_gb": 100,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Create Plan**
```http
POST /admin/subscription-plans
Content-Type: application/json

Body:
{
  "name": "Plan Name",
  "type": "personal",
  "tier": "pro",
  "description": "Description",
  "price_monthly": 29.99,
  "price_annual": 299.99,
  "trial_days": 14,
  "is_published": true,
  "is_active": true,
  "display_order": 2,
  "features": ["Feature 1", "Feature 2"],
  "max_users": 5,
  "max_agents": 20,
  "storage_gb": 100
}

Response: 201 Created
```

**Update Plan**
```http
PUT /admin/subscription-plans/{id}
```

**Delete Plan**
```http
DELETE /admin/subscription-plans/{id}
```

---

### 5. User Management

#### Base Path: `/admin/users`

**List Users**
```http
GET /admin/users
Query Parameters:
  - page: integer
  - per_page: integer
  - role: string
  - status: string (active, inactive, suspended)
  - search: string
  - tenant_id: uuid

Response: 200 OK
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "name": "User Name",
        "email": "user@example.com",
        "phone": "+1234567890",
        "country": "US",
        "status": "active",
        "is_system_admin": false,
        "tenant": { "id": "uuid", "name": "Tenant Name" },
        "roles": ["role1", "role2"],
        "created_at": "2024-01-01T00:00:00Z",
        "last_login_at": "2024-01-01T00:00:00Z"
      }
    ],
    "current_page": 1,
    "last_page": 10,
    "total": 200
  }
}
```

**Get User**
```http
GET /admin/users/{id}
```

**Update User**
```http
PUT /admin/users/{id}
Content-Type: application/json

Body:
{
  "name": "Updated Name",
  "email": "new@email.com",
  "phone": "+1234567890",
  "roles": ["role_id1", "role_id2"],
  "status": "active"
}
```

**Delete User**
```http
DELETE /admin/users/{id}
```

**Suspend User**
```http
POST /admin/users/{id}/suspend
Content-Type: application/json

Body:
{
  "reason": "Violation of terms"
}

Response: 200 OK
```

**Activate User**
```http
POST /admin/users/{id}/activate

Response: 200 OK
```

---

### 6. Payment Transactions

#### Base Path: `/admin/payment-transactions`

**List Transactions**
```http
GET /admin/payment-transactions
Query Parameters:
  - page: integer
  - per_page: integer
  - status: string (pending, completed, failed, refunded)
  - tenant_id: uuid
  - date_from: date (YYYY-MM-DD)
  - date_to: date (YYYY-MM-DD)

Response: 200 OK
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "tenant": { "id": "uuid", "name": "Tenant Name" },
        "plan": { "id": "uuid", "name": "Pro Plan" },
        "amount": 29.99,
        "currency": "USD",
        "status": "completed",
        "payment_method": "card",
        "transaction_id": "stripe_pi_xxx",
        "created_at": "2024-01-01T00:00:00Z",
        "paid_at": "2024-01-01T00:00:00Z"
      }
    ],
    "current_page": 1,
    "last_page": 10,
    "total": 200
  }
}
```

**Issue Refund**
```http
POST /admin/payment-transactions/{id}/refund
Content-Type: application/json

Body:
{
  "reason": "Customer request",
  "amount": 29.99  // optional, full refund if not specified
}

Response: 200 OK
{
  "success": true,
  "message": "Refund processed successfully",
  "data": {
    "refund_id": "uuid",
    "amount": 29.99,
    "status": "refunded"
  }
}
```

---

### 7. Enhanced Tenant Management

The following tenant-specific admin endpoints are missing:

**Tenant Statistics**
```http
GET /admin/tenants/statistics

Response: 200 OK
{
  "success": true,
  "data": {
    "total_tenants": 1234,
    "active_tenants": 1000,
    "suspended_tenants": 34,
    "trial_tenants": 200,
    "organizations": 800,
    "individuals": 434,
    "new_this_month": 45,
    "churn_this_month": 12
  }
}
```

**Change Tenant Subscription**
```http
PUT /admin/tenants/{id}/subscription
Content-Type: application/json

Body:
{
  "plan_id": "uuid",
  "billing_cycle": "monthly",  // monthly, annual
  "starts_immediately": true,
  "reason": "Upgrade request"
}

Response: 200 OK
```

**Extend Trial**
```http
POST /admin/tenants/{id}/extend-trial
Content-Type: application/json

Body:
{
  "days": 14,
  "reason": "Customer request"
}

Response: 200 OK
```

**Suspend Tenant**
```http
POST /admin/tenants/{id}/suspend
Content-Type: application/json

Body:
{
  "reason": "Payment failure"
}
```

**Activate Tenant**
```http
POST /admin/tenants/{id}/activate
```

---

## Authentication & Authorization

All admin endpoints should:

1. **Require JWT Authentication**: `Authorization: Bearer <token>`
2. **Check System Admin Permission**: User must have `is_system_admin: true`
3. **Return 401** if not authenticated
4. **Return 403** if not system admin

Example middleware check:
```php
if (!$user->is_system_admin) {
    return response()->json([
        'success' => false,
        'message' => 'Unauthorized. System admin access required.'
    ], 403);
}
```

---

## Data Validation Rules

### Agent Creation/Update
- `name`: required, string, max:255
- `slug`: required, string, unique, lowercase, alphanumeric + hyphens
- `category_id`: required, uuid, exists:agent_categories,id
- `description`: required, string
- `runtime_type`: required, in:python,nodejs
- `version`: required, string, semver format
- `code`: nullable, string
- `requirements`: nullable, string
- `config_schema`: nullable, json
- `is_active`: boolean
- `is_featured`: boolean

### Subscription Plan Creation/Update
- `name`: required, string, max:255
- `type`: required, in:personal,organization
- `tier`: required, in:starter,pro,team,enterprise
- `price_monthly`: required, numeric, min:0
- `price_annual`: required, numeric, min:0
- `trial_days`: integer, min:0, max:365
- `max_users`: required, integer, min:1
- `max_agents`: required, integer, min:1
- `storage_gb`: required, integer, min:1
- `features`: array

### User Management
- `email`: required, email, unique
- `name`: required, string, max:255
- `phone`: nullable, string
- `roles`: array of role IDs

---

## Response Format Standards

All responses should follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field_name": ["Error for this field"]
  }
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": {
    "data": [ ... ],
    "current_page": 1,
    "last_page": 10,
    "per_page": 20,
    "total": 200,
    "from": 1,
    "to": 20
  }
}
```

---

## Implementation Priority

### Phase 1 (High Priority - Required for Current UI)
1. **Agent Categories CRUD** (`/admin/agent-categories/*`) - Required for Agent Categories management page
   - GET /admin/agent-categories (list with search, sort)
   - POST /admin/agent-categories (create)
   - PUT /admin/agent-categories/{id} (update)
   - DELETE /admin/agent-categories/{id} (delete)

2. **Agent Runs List** (`/admin/agent-runs`) - Required for Agent Runs monitoring page
   - GET /admin/agent-runs (list with filters, pagination)
   - GET /admin/agent-runs/{run_id} (details - may already exist)
   - GET /admin/agent-runs/statistics (stats)

3. **Agent CRUD endpoints** (`/admin/agents/*`) - Required for Agents Management page
   - GET /admin/agents (list with filters, search, sort)
   - POST /admin/agents (create)
   - PUT /admin/agents/{id} (update)
   - DELETE /admin/agents/{id} (delete)
   - POST /admin/agents/bulk-activate (bulk action)
   - POST /admin/agents/bulk-deactivate (bulk action)

4. **Subscription Plans CRUD** (`/admin/subscription-plans/*`) - Required for Subscriptions Management page
   - GET /admin/subscription-plans (list with filters)
   - POST /admin/subscription-plans (create)
   - PUT /admin/subscription-plans/{id} (update)
   - DELETE /admin/subscription-plans/{id} (delete)

### Phase 2 (Medium Priority)
5. User Management CRUD - Required for Users & Permissions page
6. Enhanced Tenant Management (subscription changes, trial extension, suspend/activate)
7. Tenant Statistics endpoint

### Phase 3 (Low Priority)
8. Payment Transactions - Required for Transactions page
9. Refund functionality

---

## Testing Checklist

For each endpoint, ensure:
- [ ] Authentication required
- [ ] System admin check
- [ ] Input validation working
- [ ] Success responses match format
- [ ] Error responses match format
- [ ] Pagination working (where applicable)
- [ ] Filtering working (where applicable)
- [ ] Sorting working (where applicable)
- [ ] Search working (where applicable)
- [ ] Proper HTTP status codes (200, 201, 400, 401, 403, 404, 422, 500)

---

## Database Schema Suggestions

### `agents` table
```sql
id: uuid, primary key
name: varchar(255)
slug: varchar(255), unique
category_id: uuid, foreign key
description: text
runtime_type: enum('python', 'nodejs')
version: varchar(50)
status: enum('active', 'inactive')
is_featured: boolean, default false
code: text, nullable
requirements: text, nullable
config_schema: json, nullable
icon_url: varchar(255), nullable
documentation: text, nullable
total_runs: integer, default 0
success_rate: decimal(5,2), default 0
created_at: timestamp
updated_at: timestamp
deleted_at: timestamp, nullable
```

### `agent_categories` table
```sql
id: uuid, primary key
name: varchar(255)
slug: varchar(255), unique
description: text, nullable
icon: varchar(100), nullable
display_order: integer, default 0
created_at: timestamp
updated_at: timestamp
```

### `subscription_plans` table
```sql
id: uuid, primary key
name: varchar(255)
type: enum('personal', 'organization')
tier: enum('starter', 'pro', 'team', 'enterprise')
description: text, nullable
price_monthly: decimal(10,2)
price_annual: decimal(10,2)
trial_days: integer, default 14
is_published: boolean, default false
is_active: boolean, default true
display_order: integer, default 0
features: json
max_users: integer
max_agents: integer
storage_gb: integer
created_at: timestamp
updated_at: timestamp
deleted_at: timestamp, nullable
```

---

## Notes

- All UUID fields should use UUID v4 format
- All timestamps should be in UTC
- Soft deletes recommended for all resources (except transactions)
- Audit logging recommended for all admin actions
- Rate limiting recommended (e.g., 100 requests/minute per user)

---

## Contact

For questions or clarifications about these API requirements, please contact the frontend development team.

Last Updated: 2024-12-27
