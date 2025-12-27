# Admin Console Dashboard - Complete Design Specification
## AI Agents Marketplace SaaS Platform

---

## 📋 Table of Contents
1. [Executive Summary](#executive-summary)
2. [Existing Structure Analysis](#existing-structure-analysis)
3. [Enhanced Screen Designs](#enhanced-screen-designs)
4. [API Mapping](#api-mapping)
5. [Component Architecture](#component-architecture)
6. [Implementation Roadmap](#implementation-roadmap)

---

## 🎯 Executive Summary

This document outlines the comprehensive design for the Admin Console Dashboard, building upon the existing structure while introducing new screens and enhanced functionality for managing an AI Agents Marketplace SaaS platform.

### Design Principles
- **Consistency**: Use existing brand colors (primary: purple-to-pink gradient, dark theme support)
- **Clarity**: Clean table layouts, clear visual hierarchy
- **Modularity**: Reusable components across all screens
- **Responsiveness**: Desktop-first with mobile optimization

### Brand Style Guide (Extracted from Existing Code)
```
Colors:
- Primary Gradient: from-purple-600 to-pink-600
- Dark Theme BG: #0B0E14
- Dark Card BG: gray-900/95 with white/5 overlay
- Light Theme BG: white
- Border Dark: white/10 or gray-700/50
- Border Light: slate-200

Typography:
- Heading: font-bold, font-heading
- Primary Text Dark: text-white
- Secondary Text Dark: text-gray-400
- Primary Text Light: text-slate-900
- Secondary Text Light: text-slate-600

Components:
- Rounded corners: rounded-xl, rounded-lg
- Shadow: shadow-lg, shadow-xl
- Backdrop: backdrop-blur-sm
- Transitions: transition-all duration-300
```

---

## 📊 Existing Structure Analysis

### Current Admin Pages
1. ✅ **AdminDashboardPage** - Overview metrics (implemented)
2. ✅ **TenantsManagement** - Tenant CRUD (recently fixed)
3. ✅ **SubscriptionsManagement** - Plans CRUD (recently enhanced)
4. 🔄 **AgentsManagementPage** - Needs enhancement
5. 🔄 **ActiveAgentsMonitorPage** - Needs enhancement
6. 🔄 **IntegrationManagementPage** - Needs review
7. ⚠️ **UserManagementPage** - Needs implementation
8. ⚠️ **AnalyticsPage** - Needs implementation

### Current Navigation Structure (AdminLayout)
```jsx
const navigation = [
  { name: 'Console Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Manage Tenants', href: '/tenants', icon: Building2 },
  { name: 'Manage Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'Manage Agents', href: '/agents', icon: Bot },
  { name: 'Active Agents', href: '/active-agents', icon: Activity },
  { name: 'Integrations', href: '/integrations', icon: Plug },
];
```

### Available Admin API Endpoints (from adminService.js)
```
Tenants:
- GET    /admin/tenants (with pagination, filters)
- GET    /admin/tenants/{id}
- PUT    /admin/tenants/{id}
- PUT    /admin/tenants/{id}/subscription
- POST   /admin/tenants/{id}/extend-trial
- POST   /admin/tenants/{id}/suspend
- POST   /admin/tenants/{id}/activate
- GET    /admin/tenants/statistics

Subscription Plans:
- GET    /admin/subscription-plans
- POST   /admin/subscription-plans
- PUT    /admin/subscription-plans/{id}
- DELETE /admin/subscription-plans/{id}

Payments:
- GET    /admin/payment-transactions
- POST   /admin/payment-transactions/{id}/refund

Statistics:
- GET    /admin/stats
```

### Available Public API Endpoints (from OpenAPI docs)
```
Agents:
- POST   /v1/agents/{id}/run
- GET    /v1/agent-runs/{run_id}
- POST   /v1/webhooks/agents/callback

Dashboard:
- GET    /dashboard/stats

Activities:
- GET    /activities
- GET    /activities/{id}
- GET    /activities/user/{userId}
- GET    /activities/export

Sessions:
- GET    /sessions
- GET    /sessions/active
- POST   /sessions/{id}/terminate

Roles & Permissions:
- GET    /permissions
- GET    /permissions/list
- GET    /permissions/{id}
- GET    /roles
- POST   /roles
- GET/PUT/DELETE /roles/{id}
```

---

## 🖥️ Enhanced Screen Designs

### 1. Dashboard Home (Enhanced) ✨
**Path:** `/`
**Status:** Enhance existing implementation

#### Purpose
Provide at-a-glance view of platform health and key metrics.

#### Components
```jsx
- Header (period selector)
- KPI Cards Grid (4 columns)
  ├─ Total Tenants (with trend)
  ├─ Active Subscriptions (with MRR)
  ├─ Agent Runs (24h/7d/30d)
  └─ System Health Score
- Revenue Overview Card
  ├─ Monthly Recurring Revenue chart
  ├─ Revenue breakdown by plan tier
  └─ Churn rate indicator
- Activity Feed (Recent 10)
- Quick Actions Panel
  ├─ Create Tenant
  ├─ View Failed Runs
  ├─ Export Reports
  └─ System Settings
```

#### Data Fields
| Field | Source API | Format |
|-------|-----------|--------|
| Total Tenants | GET /admin/tenants/statistics | Number + %change |
| Active Subs | GET /admin/stats | Number + MRR |
| Agent Runs | GET /admin/stats | Number + trend |
| Revenue | GET /admin/payment-transactions | Currency |
| Recent Activity | GET /activities?per_page=10 | List |

#### Interactions
- Click KPI cards → Navigate to detail view
- Click activity → View details modal
- Period selector → Refresh data
- Quick actions → Modal/Navigation

#### API Connections
```javascript
// Primary data fetch
const fetchDashboardData = async (period = '7days') => {
  const [stats, tenantStats, transactions] = await Promise.all([
    adminService.getSystemStats(),
    adminService.getTenantStatistics(),
    adminService.getPaymentTransactions({ period })
  ]);

  return {
    tenants: tenantStats.total,
    activeSubscriptions: stats.subscriptions?.active || 0,
    mrr: calculateMRR(transactions),
    agentRuns: stats.agent_runs || 0
  };
};
```

#### Responsive Behavior
- **Desktop:** 4-column KPI grid, 2-column content below
- **Tablet:** 2-column KPI grid, stacked content
- **Mobile:** 1-column, scrollable

---

### 2. Agents Management (Enhanced) 🤖
**Path:** `/agents`
**Status:** Enhance existing page

#### Purpose
Full CRUD management of AI agents in the marketplace.

#### Components
```jsx
- Page Header
  └─ Create Agent button
- Filters Bar
  ├─ Search (name, slug)
  ├─ Status filter (active/inactive/featured)
  ├─ Category filter (multi-select)
  ├─ Runtime Type filter
  └─ Sort (name, created_at, runs_count)
- Agents Table
- Pagination
- Bulk Actions Toolbar (when rows selected)
```

#### Table Columns
| Column | Data | Format | Sortable |
|--------|------|--------|----------|
| Agent Name | name | Text + icon | ✓ |
| Slug | slug | Code badge | ✓ |
| Status | is_active, is_featured | Badge | ✓ |
| Category | categories | Pills | ✗ |
| Runtime | runtime_type | Badge | ✓ |
| Runs (30d) | runs_count | Number | ✓ |
| Created | created_at | Relative time | ✓ |
| Actions | - | Buttons | ✗ |

#### Actions
- **Row Actions:**
  - Edit (navigate to edit page)
  - Duplicate
  - Activate/Deactivate toggle
  - View Runs
  - Delete (with confirmation)

- **Bulk Actions:**
  - Activate selected
  - Deactivate selected
  - Delete selected
  - Export to CSV

#### API Connections
```javascript
// List agents (needs admin endpoint creation)
GET /admin/agents?page=1&per_page=20&status=active&category=automation&sort=created_at:desc

// Create agent
POST /admin/agents
Body: {
  name, slug, description, runtime_type,
  trigger_endpoint, callback_endpoint, secret,
  categories: [], capabilities: {},
  is_active, is_featured
}

// Update agent
PUT /admin/agents/{id}

// Delete agent
DELETE /admin/agents/{id}

// Bulk operations
POST /admin/agents/bulk-update
Body: { agent_ids: [], action: 'activate' | 'deactivate' | 'delete' }
```

#### Modal: Create/Edit Agent
**Sections:**
1. **General Info**
   - Name (required)
   - Slug (auto-generated, editable)
   - Description (rich text)
   - Icon/Image URL

2. **Runtime Configuration**
   - Runtime Type (dropdown: webhook, docker, lambda, etc.)
   - Trigger Endpoint URL
   - Callback Endpoint URL
   - Secret Key (generated)

3. **Pricing** (if applicable)
   - Price Model (free, pay-per-use, subscription)
   - Base Price
   - Per-run price

4. **Categories** (multi-select)
   - Search/select from existing categories

5. **Capabilities** (key-value editor or JSON)
   ```json
   {
     "input_types": ["text", "image", "video"],
     "output_types": ["json", "text"],
     "max_execution_time": 300,
     "requires_auth": true
   }
   ```

6. **Status Toggles**
   - Active (publish to marketplace)
   - Featured (show on homepage)

**Actions:**
- Test Webhook (sends test payload)
- Save Draft
- Save & Publish
- Cancel

---

### 3. Agent Detail/Edit Screen 📝
**Path:** `/agents/{id}`
**Status:** New page

#### Purpose
Detailed view and editing of single agent with full configuration.

#### Layout
```
┌─────────────────────────────────────────────────┐
│ Breadcrumb: Agents > [Agent Name]              │
│                                      [Edit Mode] │
├─────────────────────────────────────────────────┤
│  Header Section                                  │
│  ┌─ Icon ─┐  Agent Name                         │
│  │        │  Status: Active | Featured           │
│  └────────┘  Created: 2 months ago               │
│              Last Run: 5 minutes ago             │
├─────────────────────────────────────────────────┤
│  Tabs: [ Overview | Config | Runs | Analytics ] │
├─────────────────────────────────────────────────┤
│  [Tab Content]                                   │
└─────────────────────────────────────────────────┘
```

#### Tabs

**Tab 1: Overview**
- Description (editable in edit mode)
- Quick Stats Cards
  - Total Runs
  - Success Rate
  - Avg Execution Time
  - Revenue Generated
- Recent Runs (last 10)
- Categories & Tags

**Tab 2: Configuration**
- All fields from create modal
- Webhook testing interface
- Secret rotation
- Version history

**Tab 3: Runs**
- Embedded agent runs table
- Filters: status, date range
- Export runs data

**Tab 4: Analytics**
- Runs over time chart
- Success/failure breakdown
- Performance metrics
- Error patterns

---

### 4. Agent Categories Management 🏷️
**Path:** `/categories`
**Status:** New page (add to navigation)

#### Purpose
Hierarchical management of agent categories and subcategories.

#### Components
```jsx
- Header
  └─ Create Category button
- Categories Tree View
  ├─ Root Categories (expandable)
  │  ├─ Subcategory 1
  │  ├─ Subcategory 2
  │  └─ Subcategory 3
  └─ Orphan Categories (no parent)
- Category Details Panel (side)
```

#### Tree Node Structure
```
┌─ 📁 Automation (12 agents)          [Edit] [+Sub] [Delete]
│  ├─ 📄 Workflow Automation (8)      [Edit] [Delete]
│  ├─ 📄 Data Processing (3)          [Edit] [Delete]
│  └─ 📄 Task Scheduling (1)          [Edit] [Delete]
└─ 📁 Data Analysis (5 agents)        [Edit] [+Sub] [Delete]
   └─ 📄 Visualization (2)            [Edit] [Delete]
```

#### Actions
- Drag & drop to reorder/reparent
- Click category → Edit details
- Create subcategory
- Delete (with agent count warning)

#### Modal: Create/Edit Category
```jsx
Fields:
- Name (required)
- Slug (auto-generated)
- Description
- Parent Category (dropdown, nullable)
- Icon (emoji or icon class)
- Status (active/inactive)
- Display Order (number)
```

#### API Connections
```javascript
GET /agent_categories
POST /agent_categories
PUT /agent_categories/{id}
DELETE /agent_categories/{id}
GET /agent_categories/{id}/agents // Get agents in category
```

---

### 5. Agent Runs / Executions 🏃
**Path:** `/agent-runs`
**Status:** New page (add to navigation)

#### Purpose
Monitor and troubleshoot all agent executions across the platform.

#### Components
```jsx
- Filters Bar
  ├─ Status (pending, running, completed, failed)
  ├─ Agent (searchable dropdown)
  ├─ Tenant (searchable dropdown)
  ├─ Date Range picker
  └─ Search (run_id)
- Summary Cards
  ├─ Total Runs Today
  ├─ Success Rate
  ├─ Avg Execution Time
  └─ Failed Runs
- Runs Table
- Auto-refresh toggle (every 5s)
```

#### Table Columns
| Column | Data | Format |
|--------|------|--------|
| Run ID | id | UUID (shortened) |
| Agent | agent.name | Link |
| Tenant | tenant.name | Link |
| Status | status | Badge with icon |
| Input | input (preview) | Truncated JSON |
| Output | output (preview) | Truncated JSON |
| Duration | execution_time | Seconds |
| Started | created_at | Relative time |
| Actions | - | View, Retry |

#### Status Badges
```jsx
- pending:   bg-yellow-500/20 text-yellow-400 (Clock icon)
- running:   bg-blue-500/20 text-blue-400 (Activity icon)
- completed: bg-green-500/20 text-green-400 (Check icon)
- failed:    bg-red-500/20 text-red-400 (XCircle icon)
```

#### Side Panel: Run Details
Opened when clicking a row or View button.

```
┌─────────────────────────────────────┐
│  Run Details                    [X] │
├─────────────────────────────────────┤
│  Run ID: abc-123-xyz                │
│  Status: ● Completed                │
│  Duration: 2.45s                    │
│  Started: 2023-12-27 10:30:15       │
│  Ended:   2023-12-27 10:30:17       │
├─────────────────────────────────────┤
│  Agent: Text Analyzer               │
│  Tenant: Acme Corp                  │
├─────────────────────────────────────┤
│  Input (JSON):                      │
│  ┌─────────────────────────────┐   │
│  │ {                           │   │
│  │   "text": "Sample input"    │   │
│  │ }                           │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  Output (JSON):                     │
│  ┌─────────────────────────────┐   │
│  │ {                           │   │
│  │   "result": "Processed"     │   │
│  │ }                           │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  Error (if failed): null            │
├─────────────────────────────────────┤
│  [Copy Run ID]  [Retry]  [Export]  │
└─────────────────────────────────────┘
```

#### API Connections
```javascript
// List runs (admin should see all)
GET /v1/agent-runs?page=1&status=failed&agent_id=xxx&tenant_id=yyy&from=2023-12-01&to=2023-12-31

// Get run details
GET /v1/agent-runs/{run_id}

// Retry failed run (may need admin endpoint)
POST /admin/agent-runs/{run_id}/retry
```

---

### 6. Users & Permissions 👥
**Path:** `/users`
**Status:** New page (add to navigation)

#### Purpose
Manage system users, roles, and permissions across all tenants.

#### Components
```jsx
- Filters Bar
  ├─ Search (name, email)
  ├─ Role filter (multi-select)
  ├─ Status (active, suspended, pending)
  └─ Tenant filter
- Users Table
- Bulk Actions (assign role, suspend, activate)
```

#### Table Columns
| Column | Data | Format |
|--------|------|--------|
| User | name, email, avatar | Avatar + name |
| Tenant | tenant.name | Link |
| Role | role.name | Badge |
| Status | status | Badge |
| Last Login | last_login_at | Relative time |
| Created | created_at | Date |
| Actions | - | Edit, Suspend |

#### Modal: Edit User
```jsx
Sections:
1. Basic Info (read-only)
   - Name, Email, Phone

2. Role Assignment
   - Current Role: [Dropdown]
   - Available Roles: [List from /roles]

3. Tenant Assignment (for multi-tenant users)
   - Primary Tenant
   - Member of: [List]

4. Status
   - Active / Suspended
   - Suspension Reason (if suspended)

5. Sessions
   - Active Sessions count
   - [Terminate All Sessions] button
```

#### Roles Management (Sub-section or separate tab)
- List all roles (GET /roles)
- Create custom role
- Edit role permissions
- Delete custom roles (system roles protected)

#### API Connections
```javascript
// Users (need admin endpoint)
GET /admin/users?page=1&role=admin&status=active&tenant_id=xxx

// Update user
PUT /admin/users/{id}
Body: { role_id, status, tenant_id }

// Roles
GET /roles
POST /roles
PUT /roles/{id}
DELETE /roles/{id}

// Permissions
GET /permissions  // Grouped by category
GET /permissions/list  // Flat list

// Sessions
GET /admin/users/{id}/sessions
POST /admin/users/{id}/sessions/terminate-all
```

---

### 7. Analytics & Reports 📈
**Path:** `/analytics`
**Status:** New page (add to navigation)

#### Purpose
Deep-dive analytics for platform usage, revenue, and performance.

#### Layout: Tab-based
```
Tabs:
1. Platform Overview
2. Revenue & Subscriptions
3. Agent Performance
4. User Engagement
5. Custom Reports
```

**Tab 1: Platform Overview**
```jsx
- Date range selector
- Key Metrics Grid
  ├─ MAU (Monthly Active Users)
  ├─ Total Revenue
  ├─ Agent Runs
  └─ Avg Session Duration
- Growth Chart (line chart)
  - New tenants over time
  - New agents over time
- Top Performing Agents (bar chart)
- Tenant Distribution by Industry (pie chart)
```

**Tab 2: Revenue & Subscriptions**
```jsx
- MRR Trend (line chart)
- Revenue by Plan Tier (stacked bar)
- Churn Analysis
  - Churn rate over time
  - Reasons for churn (if tracked)
- Subscription Lifecycle
  - Trial → Paid conversion rate
  - Upgrade/downgrade patterns
- Forecast (predictive chart)
```

**Tab 3: Agent Performance**
```jsx
- Agents by Runs (table with sparklines)
- Success Rate Trends
- Execution Time Percentiles (p50, p95, p99)
- Error Rate Heatmap (by agent, by day)
- Most Popular Categories
```

**Tab 4: User Engagement**
```jsx
- Daily/Weekly/Monthly Active Users
- Session Duration Distribution
- Feature Usage (what users do most)
- Retention Cohorts
- User Journey Funnel
```

**Tab 5: Custom Reports**
```jsx
- Report Builder UI
  ├─ Select Metrics (checkboxes)
  ├─ Group By (dropdown)
  ├─ Filter (dynamic filters)
  ├─ Date Range
  └─ [Generate Report] button
- Saved Reports List
- Export options (CSV, PDF, Excel)
```

#### API Connections
```javascript
// Main analytics endpoint (may need creation)
GET /admin/analytics?metric=mrr,users,runs&from=2023-01-01&to=2023-12-31&group_by=month

// Specific analytics
GET /admin/analytics/revenue
GET /admin/analytics/agent-performance
GET /admin/analytics/user-engagement

// Export
GET /admin/analytics/export?format=csv&report_id=xxx
```

---

### 8. Payment Transactions 💳
**Path:** `/transactions`
**Status:** New page (add to navigation)

#### Purpose
View and manage all payment transactions, issue refunds.

#### Components
```jsx
- Filters
  ├─ Status (pending, completed, failed, refunded)
  ├─ Payment Method (stripe, paypal, etc.)
  ├─ Tenant
  ├─ Plan
  └─ Date Range
- Summary Cards
  ├─ Total Volume
  ├─ Successful
  ├─ Failed
  └─ Refunded
- Transactions Table
```

#### Table Columns
| Column | Data | Format |
|--------|------|--------|
| Transaction ID | id | Link to detail |
| Tenant | tenant.name | Link |
| Amount | amount | Currency |
| Plan | plan.name | Badge |
| Method | payment_method | Icon + text |
| Status | status | Badge |
| Date | created_at | Date + time |
| Actions | - | Refund, View |

#### Modal: Refund Transaction
```jsx
Fields:
- Transaction ID (read-only)
- Amount (read-only)
- Refund Amount (editable, max: original amount)
- Reason (textarea, required)
- Notify Customer (checkbox)

Actions:
- Issue Full Refund
- Issue Partial Refund
- Cancel
```

#### API Connections
```javascript
GET /admin/payment-transactions?status=completed&tenant_id=xxx

GET /admin/payment-transactions/{id}

POST /admin/payment-transactions/{id}/refund
Body: { amount, reason, notify_customer }
```

---

### 9. System Settings ⚙️
**Path:** `/settings`
**Status:** Enhance existing

#### Purpose
Platform-wide configuration and preferences.

#### Sections (Tab-based or Accordion)

**1. General Settings**
```jsx
- Platform Name
- Support Email
- Default Timezone
- Default Currency
- Maintenance Mode toggle
```

**2. Webhooks Configuration**
```jsx
- Global Webhook Endpoint (for system events)
- Webhook Secret
- Events to Send
  □ Tenant Created
  □ Subscription Changed
  □ Payment Received
  □ Agent Run Completed
- Test Webhook button
```

**3. Email Templates**
```jsx
- Welcome Email
- Trial Ending Reminder
- Subscription Renewal
- Payment Failed
- Agent Error Notification

Each template:
- Subject line
- Body (rich text editor with variables)
- Preview button
- Send Test Email button
```

**4. Branding**
```jsx
- Logo Upload (light/dark variants)
- Favicon
- Primary Color Picker
- Secondary Color Picker
- Font Selection
- Preview panel
```

**5. Billing & Plans Display**
```jsx
- Show Free Plan on Marketplace (toggle)
- Trial Period Default (days)
- Grace Period After Failed Payment (days)
- Auto-suspend After Grace Period (toggle)
```

**6. Security & Compliance**
```jsx
- Enforce 2FA for Admins (toggle)
- Password Policy
  - Min Length
  - Require Special Chars
  - Expiry Days
- Session Timeout (minutes)
- IP Whitelist (for admin access)
- API Rate Limits
```

#### API Connections
```javascript
GET /admin/settings
PUT /admin/settings
Body: {
  general: {...},
  webhooks: {...},
  email_templates: {...},
  branding: {...},
  billing: {...},
  security: {...}
}

// Test webhook
POST /admin/settings/webhooks/test

// Send test email
POST /admin/settings/email-templates/test
Body: { template: 'welcome', recipient: 'test@example.com' }
```

---

### 10. Activity Logs 📋
**Path:** `/activities`
**Status:** New page (add to navigation)

#### Purpose
Audit trail of all system activities and user actions.

#### Components
```jsx
- Filters
  ├─ User
  ├─ Tenant
  ├─ Activity Type (login, create, update, delete, etc.)
  ├─ Date Range
  └─ Search (description)
- Activities Table
- Export button
```

#### Table Columns
| Column | Data | Format |
|--------|------|--------|
| Timestamp | created_at | Date + time |
| User | user.name | Link |
| Tenant | tenant.name | Link |
| Action | type | Badge |
| Description | description | Text |
| IP Address | ip_address | Text |
| Details | - | View button |

#### Modal: Activity Details
```jsx
- Full activity object (JSON viewer)
- Related objects (links)
- Metadata (user agent, location, etc.)
```

#### API Connections
```javascript
GET /activities?page=1&user_id=xxx&type=create&from=2023-12-01

GET /activities/{id}

GET /activities/export?format=csv&filters={...}
```

---

## 🗺️ API Mapping

### APIs That Exist (per adminService.js)
| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/admin/tenants` | GET | List tenants | ✅ Working |
| `/admin/tenants/{id}` | GET | Get tenant | ✅ Working |
| `/admin/tenants/{id}` | PUT | Update tenant | ✅ Working |
| `/admin/tenants/{id}/subscription` | PUT | Change subscription | ✅ Working |
| `/admin/tenants/{id}/extend-trial` | POST | Extend trial | ✅ Working |
| `/admin/tenants/{id}/suspend` | POST | Suspend tenant | ✅ Working |
| `/admin/tenants/{id}/activate` | POST | Activate tenant | ✅ Working |
| `/admin/tenants/statistics` | GET | Tenant stats | ✅ Working |
| `/admin/subscription-plans` | GET | List plans | ✅ Working |
| `/admin/subscription-plans` | POST | Create plan | ✅ Working |
| `/admin/subscription-plans/{id}` | PUT | Update plan | ✅ Working |
| `/admin/subscription-plans/{id}` | DELETE | Delete plan | ✅ Working |
| `/admin/payment-transactions` | GET | List transactions | ✅ Working |
| `/admin/payment-transactions/{id}/refund` | POST | Issue refund | ✅ Working |
| `/admin/stats` | GET | System stats | ✅ Working |

### APIs That Need Creation (Backend Team)
| Endpoint | Method | Purpose | Priority |
|----------|--------|---------|----------|
| `/admin/agents` | GET | List all agents | 🔴 High |
| `/admin/agents` | POST | Create agent | 🔴 High |
| `/admin/agents/{id}` | PUT | Update agent | 🔴 High |
| `/admin/agents/{id}` | DELETE | Delete agent | 🔴 High |
| `/admin/agents/bulk-update` | POST | Bulk operations | 🟡 Medium |
| `/admin/users` | GET | List all users | 🔴 High |
| `/admin/users/{id}` | PUT | Update user | 🔴 High |
| `/admin/users/{id}/sessions` | GET | User sessions | 🟡 Medium |
| `/admin/users/{id}/sessions/terminate-all` | POST | Kill sessions | 🟡 Medium |
| `/admin/analytics/revenue` | GET | Revenue analytics | 🟡 Medium |
| `/admin/analytics/agent-performance` | GET | Agent metrics | 🟡 Medium |
| `/admin/analytics/user-engagement` | GET | User metrics | 🟢 Low |
| `/admin/settings` | GET/PUT | System settings | 🟡 Medium |
| `/admin/agent-runs` | GET | All runs (admin view) | 🔴 High |
| `/admin/agent-runs/{id}/retry` | POST | Retry failed run | 🟡 Medium |
| `/admin/activities` | GET | System audit log | 🟢 Low |

### APIs That Can Be Used From Public Routes
| Endpoint | Method | Note |
|----------|--------|------|
| `/v1/agent-runs/{run_id}` | GET | Use for run details |
| `/v1/agents/{id}/run` | POST | For testing agents |
| `/agent_categories` | GET/POST/PUT/DELETE | For category management |
| `/roles` | GET/POST/PUT/DELETE | For roles management |
| `/permissions` | GET | For permissions list |
| `/activities` | GET | If admin has access |
| `/sessions` | GET | If admin has access |

---

## 🧩 Component Architecture

### Reusable Components Needed

#### 1. Data Table Component
**File:** `components/common/DataTable.jsx`

```jsx
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (val) => <StatusBadge status={val} /> }
  ]}
  data={data}
  loading={loading}
  pagination={{ current, total, perPage, onChange }}
  onRowClick={(row) => navigate(`/detail/${row.id}`)}
  emptyMessage="No data found"
  rowActions={(row) => [
    { label: 'Edit', icon: Edit2, onClick: () => handleEdit(row) },
    { label: 'Delete', icon: Trash2, onClick: () => handleDelete(row), danger: true }
  ]}
  bulkActions={[
    { label: 'Activate', icon: CheckCircle, onClick: handleBulkActivate },
    { label: 'Delete', icon: Trash2, onClick: handleBulkDelete, danger: true }
  ]}
/>
```

#### 2. Modal Component
**File:** `components/common/Modal.jsx`

```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Create Agent"
  size="lg" // sm, md, lg, xl, full
  closeOnOverlayClick={false}
>
  <Modal.Header>
    {/* Optional custom header */}
  </Modal.Header>
  <Modal.Body maxHeight="70vh" scrollable>
    {/* Content */}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={onClose}>Cancel</Button>
    <Button variant="primary" onClick={onSubmit}>Save</Button>
  </Modal.Footer>
</Modal>
```

#### 3. Filters Bar Component
**File:** `components/common/FiltersBar.jsx`

```jsx
<FiltersBar
  filters={[
    { type: 'search', placeholder: 'Search...', value: search, onChange: setSearch },
    { type: 'select', label: 'Status', options: statusOptions, value: status, onChange: setStatus },
    { type: 'daterange', label: 'Date Range', value: dateRange, onChange: setDateRange },
    { type: 'multiselect', label: 'Categories', options: categories, value: selectedCats, onChange: setSelectedCats }
  ]}
  onClear={handleClearFilters}
  onApply={handleApplyFilters}
/>
```

#### 4. Status Badge Component
**File:** `components/common/StatusBadge.jsx`

```jsx
<StatusBadge
  status="active"
  variant="success" // success, warning, error, info, neutral
  icon={CheckCircle}
  pulse // Optional pulsing animation
/>
```

#### 5. KPI Card Component
**File:** `components/admin/KPICard.jsx`

```jsx
<KPICard
  label="Total Revenue"
  value="$24,580"
  change="+15.3%"
  trend="up" // up, down, neutral
  icon={DollarSign}
  color="green"
  onClick={() => navigate('/revenue')}
/>
```

#### 6. Chart Components
**File:** `components/charts/`
- `LineChart.jsx` - For trends over time
- `BarChart.jsx` - For comparisons
- `PieChart.jsx` - For distributions
- `AreaChart.jsx` - For cumulative data

Use library: **Recharts** (already popular in React ecosystem)

```jsx
<LineChart
  data={revenueData}
  xKey="date"
  yKeys={['mrr', 'arr']}
  colors={['#8b5cf6', '#ec4899']}
  height={300}
/>
```

#### 7. Side Panel Component
**File:** `components/common/SidePanel.jsx`

```jsx
<SidePanel
  isOpen={panelOpen}
  onClose={() => setPanelOpen(false)}
  title="Run Details"
  width="lg" // sm, md, lg
  position="right" // left, right
>
  {/* Content */}
</SidePanel>
```

#### 8. Empty State Component
**File:** `components/common/EmptyState.jsx`

```jsx
<EmptyState
  icon={Inbox}
  title="No agents found"
  description="Get started by creating your first agent"
  action={
    <Button onClick={handleCreate}>
      <Plus /> Create Agent
    </Button>
  }
/>
```

#### 9. Loading Skeletons
**File:** `components/common/Skeleton.jsx`

```jsx
<Skeleton variant="card" count={4} />
<Skeleton variant="table" rows={10} />
<Skeleton variant="text" lines={3} />
```

---

## 📱 Responsiveness Strategy

### Breakpoints
```css
- Mobile:  < 640px   (sm)
- Tablet:  640-1024px (md, lg)
- Desktop: > 1024px  (xl, 2xl)
```

### Responsive Patterns

#### 1. Navigation
- **Desktop:** Persistent sidebar
- **Tablet:** Collapsible sidebar with hamburger
- **Mobile:** Bottom nav or full-screen drawer

#### 2. Data Tables
- **Desktop:** Full table with all columns
- **Tablet:** Hide less important columns, show on expand
- **Mobile:** Card-based list view

```jsx
{/* Mobile card view */}
<div className="block md:hidden">
  {data.map(item => (
    <Card key={item.id}>
      <div className="flex justify-between">
        <div>
          <h3>{item.name}</h3>
          <p>{item.status}</p>
        </div>
        <Button size="sm">View</Button>
      </div>
    </Card>
  ))}
</div>

{/* Desktop table */}
<div className="hidden md:block">
  <DataTable data={data} columns={columns} />
</div>
```

#### 3. Modals
- **Desktop:** Centered modal with fixed width
- **Tablet/Mobile:** Full-screen modal

```jsx
className={`
  fixed inset-0
  md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
  md:max-w-2xl md:rounded-2xl
  w-full h-full md:h-auto
`}
```

#### 4. Forms
- **Desktop:** Multi-column layouts
- **Tablet:** 2-column grid
- **Mobile:** Single column

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="First Name" />
  <Input label="Last Name" />
</div>
```

---

## 🚀 Implementation Roadmap

### Phase 1: Core Enhancement (Week 1-2)
**Priority:** 🔴 Critical
- [ ] Enhance Dashboard Home with real API data
- [ ] Fix data parsing issues in all existing pages
- [ ] Create reusable DataTable component
- [ ] Create Modal component
- [ ] Create FiltersBar component
- [ ] Update AdminLayout navigation with new pages

### Phase 2: Agents Management (Week 3-4)
**Priority:** 🔴 Critical
- [ ] Backend: Create `/admin/agents` endpoints
- [ ] Enhance AgentsManagementPage with full CRUD
- [ ] Create Agent Detail/Edit page
- [ ] Create agent creation/edit modal
- [ ] Implement agent categories page
- [ ] Backend: Category endpoints (if not existing)

### Phase 3: Runs & Monitoring (Week 5)
**Priority:** 🔴 Critical
- [ ] Create Agent Runs page
- [ ] Create Run Details side panel
- [ ] Implement auto-refresh for live monitoring
- [ ] Backend: Admin agent-runs endpoints
- [ ] Add retry functionality

### Phase 4: User Management (Week 6)
**Priority:** 🟡 High
- [ ] Backend: Create `/admin/users` endpoints
- [ ] Create Users & Permissions page
- [ ] Implement role management
- [ ] Create user edit modal
- [ ] Session management features

### Phase 5: Analytics & Reporting (Week 7-8)
**Priority:** 🟡 High
- [ ] Backend: Analytics endpoints
- [ ] Create Analytics page with tabs
- [ ] Integrate chart library (Recharts)
- [ ] Build chart components
- [ ] Implement custom report builder
- [ ] Export functionality

### Phase 6: Transactions & Settings (Week 9)
**Priority:** 🟡 High
- [ ] Create Payment Transactions page
- [ ] Enhance Settings page
- [ ] Implement refund workflow
- [ ] Email template editor
- [ ] Branding customization

### Phase 7: Activity Logs & Polish (Week 10)
**Priority:** 🟢 Medium
- [ ] Create Activity Logs page
- [ ] Implement activity export
- [ ] Final UI polish and animations
- [ ] Mobile responsiveness testing
- [ ] Performance optimization

### Phase 8: Testing & Documentation (Week 11-12)
**Priority:** 🟢 Medium
- [ ] Unit tests for components
- [ ] Integration tests for API calls
- [ ] E2E tests for critical flows
- [ ] User documentation
- [ ] Developer documentation
- [ ] Accessibility audit (WCAG 2.1)

---

## ✅ Checklist for Each Screen Implementation

- [ ] Design matches brand style guide
- [ ] Dark/light theme support
- [ ] Responsive (desktop, tablet, mobile tested)
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Error states with retry
- [ ] Proper error handling and user feedback (toasts)
- [ ] API integration complete
- [ ] Pagination (if applicable)
- [ ] Sorting (if applicable)
- [ ] Filtering (if applicable)
- [ ] Search (if applicable)
- [ ] Bulk actions (if applicable)
- [ ] Form validation
- [ ] Success/error messages
- [ ] Accessibility (keyboard nav, ARIA labels)
- [ ] Performance optimized (memoization, lazy loading)
- [ ] Code reviewed
- [ ] Tested (unit, integration)
- [ ] Documentation updated

---

## 📚 References

### Design System
- **Colors:** Tailwind CSS default palette + custom primary gradient
- **Icons:** Lucide React (already in use)
- **Fonts:** System font stack (already in use)
- **Spacing:** Tailwind spacing scale
- **Animations:** Tailwind transitions + custom keyframes

### Third-Party Libraries
```json
{
  "recharts": "^2.10.0",        // Charts
  "react-hot-toast": "^2.4.1",   // Already in use
  "react-hook-form": "^7.49.0",  // Forms
  "zod": "^3.22.4",              // Validation
  "date-fns": "^2.30.0"          // Date handling
}
```

### File Structure
```
src/
├── components/
│   ├── admin/
│   │   ├── KPICard.jsx
│   │   ├── AgentCard.jsx
│   │   ├── RunStatusBadge.jsx
│   │   └── ...
│   ├── charts/
│   │   ├── LineChart.jsx
│   │   ├── BarChart.jsx
│   │   ├── PieChart.jsx
│   │   └── AreaChart.jsx
│   ├── common/
│   │   ├── DataTable.jsx
│   │   ├── Modal.jsx
│   │   ├── SidePanel.jsx
│   │   ├── FiltersBar.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Skeleton.jsx
│   │   └── ...
│   └── layout/
│       └── AdminLayout.jsx (existing)
├── pages/
│   └── Admin/
│       ├── AdminDashboardPage.jsx (existing)
│       ├── TenantsManagement.jsx (existing)
│       ├── SubscriptionsManagement.jsx (existing)
│       ├── AgentsManagementPage.jsx (enhance)
│       ├── AgentDetailPage.jsx (new)
│       ├── CategoriesManagementPage.jsx (new)
│       ├── AgentRunsPage.jsx (new)
│       ├── UsersManagementPage.jsx (new)
│       ├── AnalyticsPage.jsx (new)
│       ├── TransactionsPage.jsx (new)
│       ├── ActivityLogsPage.jsx (new)
│       └── SettingsPage.jsx (enhance)
├── services/
│   ├── adminService.js (existing)
│   ├── agentService.js (new)
│   ├── analyticsService.js (new)
│   └── ...
└── router/
    └── AdminRouter.jsx (update with new routes)
```

---

## 🎨 Design Mockup Priorities

Based on this spec, the following high-fidelity mockups should be created:

1. **Dashboard Home (enhanced)** - Priority 1
2. **Agents Management** - Priority 1
3. **Agent Detail/Edit** - Priority 1
4. **Agent Runs** - Priority 1
5. **Users Management** - Priority 2
6. **Analytics** - Priority 2
7. **Categories Management** - Priority 3
8. **Transactions** - Priority 3
9. **Activity Logs** - Priority 4

---

## 📝 Notes

- This spec is based on existing codebase structure and brand guidelines
- All new API endpoints require backend implementation
- Mobile-first approach for new components
- Maintain consistency with existing TenantsManagement and SubscriptionsManagement implementations
- Use existing theme context and styling patterns
- Follow React best practices (hooks, functional components)
- Ensure all pages work with AdminLayout
- Keep in mind future scalability and maintainability

---

**Document Version:** 1.0
**Last Updated:** 2025-12-27
**Author:** Senior Front-End UI/UX Engineer
**Status:** Ready for Review & Approval
