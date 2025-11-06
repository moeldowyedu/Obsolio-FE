# Aasim Platform - Complete Demo Flow Guide

This guide provides a comprehensive walkthrough of all screens and features in the Aasim platform.

## 🚀 Getting Started

### 1. Home Page (`/`)
**Entry Point for All Users**

The homepage showcases all platform features:
- Hero section with call-to-action buttons
- Features overview
- AI Judge agents capabilities
- **NEW: Hire Single AI Judge Agent** section → Links to `/marketplace`
- **NEW: Multi-Agent Orchestration** section → Links to `/orchestrator`
- **NEW: Scheduling & Automation** section → Links to `/scheduler`
- **NEW: Flexible Deployment Options** section → Links to `/integration`
- Use cases across industries
- Pricing information

**Demo Path:**
```
Home → Register → Login → Dashboard
```

---

## 🔐 Authentication Flow

### 2. Register Page (`/register`)
- Create new account
- Email and password validation
- Redirects to dashboard after successful registration

### 3. Login Page (`/login`)
- Existing user authentication
- "Remember me" option
- Forgot password link → `/forgot-password`

### 4. Forgot Password (`/forgot-password`)
- Password reset request
- Email verification

### 5. Reset Password (`/reset-password/:token`)
- Set new password with token

---

## 📊 Main Application Flow

### 6. Dashboard (`/dashboard`)
**Central Hub - Start Here for Full Demo**

The dashboard provides quick access to all features:

**Quick Action Cards (8 total):**
1. **Hire new Aasim** → `/agent-select`
2. **Agent Marketplace** → `/marketplace` ⭐ NEW
3. **Orchestrator** → `/orchestrator` ⭐ NEW
4. **Scheduler** → `/scheduler` ⭐ NEW
5. **View Reports** → `/submissions`
6. **Manage Criteria** → `/criteria`
7. **API Integration** → `/integration` ⭐ NEW
8. **Analytics** → `/admin/analytics`

**Also includes:**
- Statistics overview (submissions, evaluations, scores)
- Recent submissions table
- Activity feed
- Performance metrics

---

## 🤖 Agent Management System (NEW FEATURES)

### 7. Agent Marketplace (`/marketplace`)
**Browse and Hire Specialized AI Agents**

**Features:**
- 8 pre-configured AI judge agents
- Search functionality
- Category filtering (All, Technology, Education, Legal, Healthcare, Business, Creative, Medical)
- Agent cards showing:
  - Name and description
  - Monthly pricing ($79-$149)
  - Star ratings and reviews
  - Number of evaluations completed
  - Key features (4 per agent)

**Available Agents:**
1. Code Quality Judge - $99/month
2. Essay & Writing Judge - $89/month
3. Legal Document Reviewer - $149/month
4. Video Content Analyst - $119/month
5. Medical Case Reviewer - $139/month
6. Design Portfolio Judge - $99/month
7. Business Plan Evaluator - $129/month
8. Research Paper Judge - $109/month

**Demo Flow:**
```
Marketplace → Select Agent → Hire Agent → Configuration Page
```

### 8. Agent Configuration (`/agent/configure/:agentId`)
**Configure Your Hired Agent**

**4-Tab Interface:**

**Tab 1: Deployment**
- Choose deployment mode:
  - ✅ One-Time Run (on-demand execution)
  - ✅ Custom Schedule (recurring automation)
  - ✅ API Integration (embed in your app)
- Schedule configuration:
  - Frequency selector (hourly/daily/weekly/monthly)
  - Time picker (24-hour format)
  - Day selector (for weekly schedules)

**Tab 2: Evaluation Criteria**
- Toggle default vs custom criteria
- Custom weight sliders:
  - Quality (0-100%)
  - Accuracy (0-100%)
  - Completeness (0-100%)
  - Originality (0-100%)
- Total must equal 100%
- Real-time percentage validation

**Tab 3: Integration**
- Webhook URL configuration
- API key generation and management
- Auto-submit toggle
- Link to integration documentation

**Tab 4: Notifications**
- Email notifications toggle
- Slack notifications toggle
- Webhook notifications toggle
- Custom notification preferences

**Demo Flow:**
```
Configuration → Set Schedule → Customize Criteria → Save Configuration → Scheduler
```

### 9. Multi-Agent Orchestrator (`/orchestrator`)
**Create Complex Workflows with Multiple Agents**

**Features:**
- Workflow name input
- Execution mode selector:
  - **Sequential:** Agents run one after another
  - **Parallel:** All agents run simultaneously
  - **Conditional:** Rule-based agent execution
- Agent library sidebar with 6 available agents:
  - Code Judge
  - Essay Judge
  - Video Analyst
  - Legal Reviewer
  - Medical Reviewer
  - Design Judge
- Drag agents into workflow builder
- Reorder agents (move up/down buttons)
- Remove agents from workflow
- Save workflow button
- Test run functionality
- Existing workflows list

**Demo Flow:**
```
Orchestrator → Add Agents → Set Execution Mode → Save Workflow → Test Run
```

### 10. Agent Scheduler (`/scheduler`)
**Calendar-Based Agent Automation**

**Features:**
- Weekly calendar view (Sunday-Saturday)
- Drag-and-drop interface:
  - Drag agents from sidebar
  - Drop onto calendar days
  - Visual drop zone feedback
- Schedule editor sidebar:
  - Agent name
  - Start time (dropdown 00:00-23:00)
  - End time (dropdown 00:00-23:00)
  - Frequency options:
    - 🕐 One Time
    - 🕐 Hourly
    - 📅 Daily
    - 📅 Weekly
    - 📅 Monthly
    - 📅 Yearly
  - Remove schedule button
- Click scheduled agent to edit
- Color-coded agent cards
- View mode toggle (Week/Month)

**Demo Flow:**
```
Scheduler → Drag Agent to Calendar → Set Time & Frequency → Save Schedule
```

### 11. API & Integration (`/integration`)
**Complete Developer Documentation**

**6-Tab Comprehensive Guide:**

**Tab 1: Overview**
- Getting started guide
- Integration methods overview
- API key management with copy/regenerate
- Quick start steps (1-4)
- Security warnings

**Tab 2: REST API**
- Base URL: `https://api.aasim.ai`
- 7 API endpoints with methods:
  - POST /v1/evaluations (Create evaluation)
  - GET /v1/evaluations/:id (Get results)
  - GET /v1/evaluations (List all)
  - POST /v1/agents/hire (Hire agent)
  - GET /v1/agents (List agents)
  - PUT /v1/agents/:id/config (Update config)
  - DELETE /v1/agents/:id (Remove agent)
- Request/response examples
- Authentication headers

**Tab 3: Webhooks**
- 6 webhook events:
  - evaluation.created
  - evaluation.processing
  - evaluation.completed
  - evaluation.failed
  - agent.hired
  - agent.configured
- Webhook URL configuration
- Test webhook functionality
- Payload examples
- Signature verification guide

**Tab 4: SDKs**
- Official SDKs for 4 languages:
  - JavaScript/Node.js (`@aasim/sdk`)
  - Python (`aasim`)
  - PHP (`aasim/sdk`)
  - Ruby (`aasim-ruby`)
- Installation commands
- Code examples with syntax highlighting
- Language selector
- Copy to clipboard functionality
- Links to GitHub documentation

**Tab 5: Examples**
- 4 integration examples:
  - File Upload Integration
  - LMS Integration
  - CI/CD Pipeline
  - Embed Widget
- Embed widget code snippet
- Copy-to-clipboard for all examples

**Tab 6: Testing**
- Live API testing tool
- Test payload editor (JSON)
- Send test request button
- Rate limits display:
  - 100 requests/minute
  - 10,000 requests/day
  - 5 MB max payload
- Common error codes:
  - 401 Unauthorized
  - 429 Too Many Requests
  - 400 Bad Request
  - 404 Not Found
  - 500 Internal Server Error

**Demo Flow:**
```
Integration → Get API Key → Choose SDK → Copy Code → Test API Call
```

---

## 📝 Submission & Evaluation Flow

### 12. Agent Selection (`/agent-select`)
- Choose AI judge agent type
- View agent capabilities
- Select evaluation criteria

### 13. Create Submission (`/submissions/create`)
- Upload content for evaluation
- Select agent and criteria
- Submit for processing

### 14. Submissions List (`/submissions`)
- View all submissions
- Filter by status (pending, in progress, completed)
- Search submissions
- Click to view details

### 15. Submission Details (`/submissions/:id`)
- Detailed submission information
- Evaluation status
- Score and feedback
- Download reports
- View evaluation timeline

### 16. Evaluation Results (`/evaluations/:id`)
- Comprehensive evaluation breakdown
- Score by criteria
- AI-generated feedback
- Strengths and improvements
- Export options

### 17. Report Viewer (`/evaluations/:id/report`)
- Full detailed report
- Print functionality
- PDF export
- Share options

---

## ⚙️ Configuration & Management

### 18. Criteria Management (`/criteria`)
- Create custom evaluation criteria
- Define scoring weights
- Manage criteria templates
- Industry-specific presets

### 19. Profile (`/profile`)
- User information
- Account settings
- Subscription management
- Usage statistics

### 20. Notifications (`/notifications`)
- Evaluation completion alerts
- System notifications
- Activity history
- Mark as read/unread

---

## 👨‍💼 Admin Features (Admin Users Only)

### 21. Admin Dashboard (`/admin`)
- System overview
- User management preview
- Platform metrics
- Real-time monitoring

### 22. User Management (`/admin/users`)
- View all users
- User roles and permissions
- Account status
- Usage analytics per user

### 23. Analytics (`/admin/analytics`)
- Platform-wide statistics
- Revenue metrics
- Usage patterns
- Performance graphs

---

## 🎯 Recommended Demo Flow

### **Option 1: Quick Feature Overview (5 minutes)**
```
1. Home → View new features sections
2. Login/Register
3. Dashboard → Overview of quick actions
4. Marketplace → Browse agents
5. Scheduler → Show drag-and-drop calendar
6. Integration → Show API documentation
```

### **Option 2: Complete Agent Management Flow (10 minutes)**
```
1. Home → Navigate to Marketplace via CTA
2. Marketplace → Browse and select an agent
3. Configuration →
   - Set deployment mode to "Custom Schedule"
   - Customize evaluation criteria
   - Configure integration settings
   - Set up notifications
4. Scheduler →
   - Drag agent to calendar
   - Set recurring weekly schedule
   - Configure time slots
5. Orchestrator →
   - Create multi-agent workflow
   - Add 3 different agents
   - Set to parallel execution
   - Save workflow
6. Integration →
   - View API documentation
   - Copy JavaScript SDK example
   - Test API call
```

### **Option 3: Full Platform Demo (15 minutes)**
```
1. Home → Complete tour of features
2. Register/Login → Create account
3. Dashboard → Overview and quick actions
4. Agent Selection → Choose agent type
5. Create Submission → Upload content
6. Submissions List → View all submissions
7. Submission Details → Check evaluation
8. Marketplace → Hire specialized agent
9. Configuration → Set up agent
10. Scheduler → Automate execution
11. Orchestrator → Build workflow
12. Integration → Connect to app
13. Profile → Check settings
14. Admin (if admin) → View analytics
```

---

## 📱 Navigation Reference

### Header Navigation (Authenticated Users)
- **Dashboard** → `/dashboard`
- **Submissions** → `/submissions`
- **AI Agents** (Dropdown):
  - Marketplace → `/marketplace`
  - Orchestrator → `/orchestrator`
  - Scheduler → `/scheduler`
  - API & Integration → `/integration`
- **Criteria** → `/criteria`
- **Admin** (admin only) → `/admin`
- **Profile** (User menu) → `/profile`
- **Notifications** (User menu) → `/notifications`

### Mobile Navigation
All the same links available in collapsible mobile menu with organized sections.

---

## 🔗 Key Interconnections

### From HomePage:
- "Explore Agent Marketplace" → `/marketplace`
- "Build Workflows" → `/orchestrator`
- "Automate Agents" → `/scheduler`
- "View Integration Docs" → `/integration`
- "Get Started" → `/register`

### From Dashboard:
- All 8 quick action cards link to their respective pages
- "Hire new Aasim" → `/agent-select`
- Recent submissions table → `/submissions/:id`

### From Marketplace:
- "Hire Agent" → `/agent/configure/:agentId`
- After configuration → Can go to `/scheduler` or `/orchestrator`

### From Scheduler:
- Agents can be dragged to set up automation
- Links to agent configuration for each scheduled agent

### From Orchestrator:
- Can add agents from library
- Each agent can be configured separately
- Workflows can be tested and activated

### From Integration:
- API examples reference agents hired from marketplace
- Webhook setup connects to agent configurations
- SDKs integrate with all agent features

---

## ✨ New Features Highlights

### 🎨 UI/UX Enhancements:
- Glassmorphism design throughout
- Smooth hover effects and transitions
- Responsive grid layouts
- Color-coded agent cards
- Material Icons throughout
- Toast notifications for actions

### 🔧 Functional Features:
- Drag-and-drop calendar scheduling
- Multi-tab configuration interface
- Real-time validation (criteria weights)
- Code syntax highlighting
- Copy-to-clipboard functionality
- Language switcher (English/Spanish/Arabic)
- Search and filter capabilities

### 🚀 Technical Features:
- REST API endpoints
- Webhook events
- SDKs for 4 languages
- API key management
- Rate limiting
- Error handling
- Security best practices

---

## 📞 Support & Documentation

For more information or issues:
- View `/integration` for complete API documentation
- Check profile settings for account management
- Visit notifications for system updates
- Contact admin for enterprise features

---

**Last Updated:** 2025-11-06
**Version:** 1.0
**Platform:** Aasim Frontend React Application
