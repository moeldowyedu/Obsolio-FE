# CRITICAL: Backend API Endpoints Needed for Admin Console

## Current Situation

The **frontend is 100% complete** with all admin pages integrated and ready. However, **3 critical backend endpoints are missing**, causing blank pages and errors.

## Live Console Pages Status

| Page URL | Status | Issue |
|----------|--------|-------|
| `https://console.obsolio.com/` | ✅ Working | Dashboard has real API |
| `https://console.obsolio.com/tenants` | ✅ Working | Tenants API exists |
| `https://console.obsolio.com/subscriptions` | ✅ Working | Subscriptions API exists |
| `https://console.obsolio.com/agent-categories` | ❌ **FAILS** | **Error: "Failed to load agent categories"** |
| `https://console.obsolio.com/agents` | ❌ **BLANK PAGE** | **Backend endpoint missing** |
| `https://console.obsolio.com/agent-runs` | ❌ **FAILS** | **Error: "Failed to load agent runs"** |
| `https://console.obsolio.com/active-agents` | ⚠️ Shows empty | Needs real-time API (lower priority) |
| `https://console.obsolio.com/integrations` | ✅ Working | Integrations API exists |

---

## 🔴 CRITICAL ENDPOINTS NEEDED (Must implement ASAP)

### 1. Agent Categories API

**Endpoint:** `GET /admin/agent-categories`

**Frontend calls from:** `src/pages/Admin/AgentCategoriesPage.jsx:60`
```javascript
const response = await adminService.getAgentCategories(params);
```

**Expected Response:**
```json
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

**Also needed:**
- `POST /admin/agent-categories` - Create category
- `PUT /admin/agent-categories/{id}` - Update category
- `DELETE /admin/agent-categories/{id}` - Delete category

**Current Error:**
```
GET https://api.obsolio.com/admin/agent-categories
Status: 404 Not Found
Frontend shows: "Failed to load agent categories"
```

---

### 2. Agents Management API

**Endpoint:** `GET /admin/agents`

**Frontend calls from:** `src/pages/Admin/AgentsManagementPage.jsx:119`
```javascript
const response = await adminService.getAllAgents(params);
```

**Query Parameters:**
- `page` - Page number
- `per_page` - Items per page
- `search` - Search query
- `status` - Filter by status (active/inactive)
- `category` - Filter by category ID
- `runtime_type` - Filter by runtime
- `sort` - Sort order

**Expected Response:**
```json
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
        "is_active": true,
        "is_featured": false,
        "runs_count": 1247,
        "success_rate": 98.6,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "current_page": 1,
    "last_page": 5,
    "per_page": 20,
    "total": 100
  }
}
```

**Also needed:**
- `POST /admin/agents` - Create agent
- `PUT /admin/agents/{id}` - Update agent
- `DELETE /admin/agents/{id}` - Delete agent
- `POST /admin/agents/bulk-activate` - Bulk activate
- `POST /admin/agents/bulk-deactivate` - Bulk deactivate

**Current Error:**
```
GET https://api.obsolio.com/admin/agents
Status: 404 Not Found
Frontend shows: BLANK PAGE (useEffect fails silently)
```

---

### 3. Agent Runs API

**Endpoint:** `GET /admin/agent-runs`

**Frontend calls from:** `src/pages/Admin/AgentRunsPage.jsx:156`
```javascript
const response = await adminService.getAllAgentRuns(params);
```

**Query Parameters:**
- `page` - Page number
- `per_page` - Items per page
- `search` - Search by agent name or run ID
- `status` - Filter by status (pending, running, completed, failed)
- `sort` - Sort order (started_at_desc, started_at_asc, duration_desc)

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "agent_id": "uuid",
        "agent_name": "Data ETL Pipeline",
        "status": "completed",
        "input": "{\"source\":\"database_a\"}",
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

**Current Error:**
```
GET https://api.obsolio.com/admin/agent-runs
Status: 404 Not Found
Frontend shows: "Failed to load agent runs"
```

---

## 📋 Implementation Checklist

### Immediate (Phase 1 - Required for Console to Work)

- [ ] **Agent Categories CRUD** (4 endpoints)
  - [ ] GET /admin/agent-categories
  - [ ] POST /admin/agent-categories
  - [ ] PUT /admin/agent-categories/{id}
  - [ ] DELETE /admin/agent-categories/{id}

- [ ] **Agents CRUD** (6 endpoints)
  - [ ] GET /admin/agents
  - [ ] POST /admin/agents
  - [ ] PUT /admin/agents/{id}
  - [ ] DELETE /admin/agents/{id}
  - [ ] POST /admin/agents/bulk-activate
  - [ ] POST /admin/agents/bulk-deactivate

- [ ] **Agent Runs List** (1 endpoint)
  - [ ] GET /admin/agent-runs

### Soon (Phase 2 - Nice to Have)

- [ ] Active Agents Real-time Monitoring
  - [ ] GET /admin/agent-runs/active (real-time)
  - [ ] GET /admin/agent-runs/active-statistics
  - [ ] GET /admin/agent-runs/activity-feed
  - [ ] GET /admin/agent-runs/performance-metrics

---

## 🚀 Testing After Implementation

Once the backend endpoints are implemented, test with:

1. **Agent Categories:**
   ```bash
   curl https://api.obsolio.com/admin/agent-categories \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Agents:**
   ```bash
   curl https://api.obsolio.com/admin/agents?page=1&per_page=20 \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Agent Runs:**
   ```bash
   curl https://api.obsolio.com/admin/agent-runs?page=1&per_page=20 \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

## 📖 Full API Documentation

See `BACKEND_API_REQUIREMENTS.md` for complete specifications including:
- Request/response schemas
- Validation rules
- Database schemas
- Error handling
- Security requirements

---

## ✅ What's Already Done (Frontend)

- ✅ All pages have AdminLayout wrapper (header, sidebar, navigation)
- ✅ All mock data removed and replaced with API integration
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Pagination support
- ✅ Search and filtering
- ✅ CRUD modals
- ✅ Theme support (dark/light mode)
- ✅ Responsive design

**The frontend is 100% ready. It's just waiting for the backend APIs.**

---

Last Updated: 2024-12-27
