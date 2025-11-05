# Aasim Frontend - Complete Screen Specifications

## Overview

This document defines all screens, pages, and UI components for the Aasim-FE React application.

**Repository:** `https://github.com/moeldowyedu/Aasim-FE`

---

## 📱 Screen Inventory

### Public Pages (No Authentication Required)
1. Landing Page
2. Login Page
3. Register Page
4. Forgot Password Page
5. Reset Password Page

### Authenticated Pages (User Must Be Logged In)
6. Dashboard
7. Create Submission Page
8. Submissions List Page
9. Submission Details Page
10. Evaluation Results Page
11. Report Viewer Page
12. Criteria Library Page
13. Profile Settings Page
14. Notifications Page

### Admin Pages (Admin Role Only)
15. Admin Dashboard
16. User Management Page
17. System Analytics Page

---

## 1. Landing Page

**Route:** `/`
**Access:** Public
**Layout:** Full-width with header and footer

### Purpose
Marketing page showcasing Aasim features and encouraging sign-ups.

### Sections

#### 1.1 Navigation Header
```
┌─────────────────────────────────────────────────────────┐
│ [Aasim Logo]              [Features] [Pricing] [About]  │
│                                      [Login] [Sign Up]   │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- Logo (clickable, returns to home)
- Navigation links
- Login button (opens login modal or redirects)
- Sign Up button (primary CTA)

**Behavior:**
- Sticky header on scroll
- Smooth scroll to sections on link click
- Glassmorphism effect with backdrop blur

#### 1.2 Hero Section
```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│           Meet Aasim - The AI Judge Agent                │
│    AI-powered evaluation for competitions, education     │
│              and professional assessments                 │
│                                                           │
│        [Try Aasim Now →]  [Watch Demo]                  │
│                                                           │
│              [Floating AI Icon Animation]                │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- H1: Main headline
- Subtitle: Value proposition
- Primary CTA button (→ Register)
- Secondary CTA button (→ Demo video modal)
- Animated icon/illustration

**Animation:**
- Fade in on load
- Floating icon animation
- Gradient text effect

#### 1.3 Features Section
```
┌─────────────────────────────────────────────────────────┐
│                  Powerful Features                        │
│                                                           │
│  [Card 1]        [Card 2]        [Card 3]               │
│  Video/Audio     Document        Code                    │
│  Analysis        Review          Assessment              │
│                                                           │
│  [Card 4]        [Card 5]        [Card 6]               │
│  Custom          AI Reports      Objective               │
│  Criteria        Generation      Scoring                 │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- 6 feature cards (glass effect)
- Icon for each feature
- Title + description
- Hover effects (lift on hover)

#### 1.4 How It Works Section
```
┌─────────────────────────────────────────────────────────┐
│                    How It Works                           │
│                                                           │
│   Step 1          →         Step 2         →    Step 3   │
│   Upload Files             AI Analyzes          Get Report│
│   [Icon]                   [Icon]               [Icon]    │
└─────────────────────────────────────────────────────────┘
```

#### 1.5 Use Cases Section
```
┌─────────────────────────────────────────────────────────┐
│              Transform Your Evaluation Process            │
│                                                           │
│  [Competitions]  [Education]  [Recruitment]  [Reviews]   │
│   (4 cards with icons, titles, descriptions)             │
└─────────────────────────────────────────────────────────┘
```

#### 1.6 CTA Section
```
┌─────────────────────────────────────────────────────────┐
│       Empower Your Decisions with AI Fairness           │
│                                                           │
│               [Get Started with Aasim →]                 │
└─────────────────────────────────────────────────────────┘
```

#### 1.7 Footer
```
┌─────────────────────────────────────────────────────────┐
│ [Logo]                                                    │
│ Aasim AI Judge Agent                                      │
│                                                           │
│ Product      Company      Resources                       │
│ Features     About        Documentation                   │
│ Pricing      Contact      API Docs                        │
│                                                           │
│ © 2024 Aasim. All rights reserved.                       │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Login Page

**Route:** `/login`
**Access:** Public (redirects to dashboard if already logged in)
**Layout:** Centered form with glassmorphism

### Layout
```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│                  ┌─────────────────┐                    │
│                  │   [Aasim Logo]  │                    │
│                  │                 │                    │
│                  │  Welcome Back   │                    │
│                  │                 │                    │
│                  │  Email          │                    │
│                  │  [__________]   │                    │
│                  │                 │                    │
│                  │  Password       │                    │
│                  │  [__________]   │                    │
│                  │                 │                    │
│                  │  [ ] Remember   │                    │
│                  │                 │                    │
│                  │  [Login Button] │                    │
│                  │                 │                    │
│                  │  Forgot Pass?   │                    │
│                  │                 │                    │
│                  │  No account?    │                    │
│                  │  Sign Up        │                    │
│                  └─────────────────┘                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Components

**Input Fields:**
- Email input (with validation)
- Password input (with show/hide toggle)
- Remember me checkbox

**Buttons:**
- Primary button: "Login"
- Link: "Forgot Password?"
- Link: "Sign Up"

**Validation:**
- Email format validation
- Required field validation
- Error messages below fields
- Loading state on submit

**States:**
- Default
- Focused (input highlight)
- Error (red border + message)
- Loading (button with spinner)
- Success (redirect to dashboard)

### User Flow
```
User visits /login
  ↓
Enters credentials
  ↓
Clicks Login
  ↓
[Loading spinner]
  ↓
API Call: POST /api/v1/auth/login
  ↓
Success? → Save token → Redirect to /dashboard
Fail? → Show error message → Stay on page
```

---

## 3. Register Page

**Route:** `/register`
**Access:** Public
**Layout:** Centered form with glassmorphism

### Layout
```
┌─────────────────────────────────────────────────────────┐
│                  ┌─────────────────┐                    │
│                  │   [Aasim Logo]  │                    │
│                  │                 │                    │
│                  │  Create Account │                    │
│                  │                 │                    │
│                  │  First Name     │                    │
│                  │  [__________]   │                    │
│                  │                 │                    │
│                  │  Last Name      │                    │
│                  │  [__________]   │                    │
│                  │                 │                    │
│                  │  Email          │                    │
│                  │  [__________]   │                    │
│                  │                 │                    │
│                  │  Password       │                    │
│                  │  [__________]   │                    │
│                  │  [Strength Bar] │                    │
│                  │                 │                    │
│                  │  Confirm Pass   │                    │
│                  │  [__________]   │                    │
│                  │                 │                    │
│                  │  Organization   │                    │
│                  │  [__________]   │                    │
│                  │  (Optional)     │                    │
│                  │                 │                    │
│                  │  [Register]     │                    │
│                  │                 │                    │
│                  │  Have account?  │                    │
│                  │  Login          │                    │
│                  └─────────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### Components

**Input Fields:**
- First Name (required)
- Last Name (required)
- Email (required, with validation)
- Password (required, with strength indicator)
- Confirm Password (required, must match)
- Organization (optional)

**Password Strength Indicator:**
```
Weak:     [■□□□□] 20%  (red)
Fair:     [■■□□□] 40%  (orange)
Good:     [■■■□□] 60%  (yellow)
Strong:   [■■■■□] 80%  (light green)
Excellent:[■■■■■] 100% (green)
```

**Validation Rules:**
- Email: Valid format
- Password: Min 8 chars, 1 uppercase, 1 number
- Confirm Password: Must match password
- Real-time validation on blur

### User Flow
```
User visits /register
  ↓
Fills form
  ↓
Real-time validation on each field
  ↓
Clicks Register
  ↓
API Call: POST /api/v1/auth/register
  ↓
Success? → Auto-login → Redirect to /dashboard
Fail? → Show error (email exists, etc.) → Stay on page
```

---

## 4. Dashboard

**Route:** `/dashboard`
**Access:** Authenticated users only
**Layout:** Sidebar + main content

### Layout
```
┌──────┬──────────────────────────────────────────────────┐
│      │  Dashboard                          [Profile ▼]  │
│      ├──────────────────────────────────────────────────┤
│ [H]  │                                                   │
│ [D]  │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ [S]  │  │ Total    │ │ Pending  │ │ Completed│        │
│ [E]  │  │ Submiss. │ │ Evals    │ │ Evals    │        │
│ [C]  │  │   24     │ │    3     │ │    21    │        │
│ [R]  │  └──────────┘ └──────────┘ └──────────┘        │
│ [P]  │                                                   │
│ [N]  │  Recent Submissions                               │
│      │  ┌────────────────────────────────────────────┐  │
│ [L]  │  │ Video Presentation      [Completed] 92/100│  │
│      │  │ Document Review         [Processing]  --  │  │
│      │  │ Code Assessment         [Completed] 85/100│  │
│      │  └────────────────────────────────────────────┘  │
│      │                                                   │
│      │  [+ Create New Submission]                       │
└──────┴──────────────────────────────────────────────────┘

Legend:
H = Home/Dashboard
D = Submissions
S = Create Submission
E = Evaluations
C = Criteria
R = Reports
P = Profile
N = Notifications
L = Logout
```

### Components

#### 4.1 Sidebar Navigation
```
┌──────────────┐
│   [Logo]     │
│              │
│ Dashboard    │ (active)
│ Submissions  │
│ Evaluations  │
│ Criteria     │
│ Reports      │
│ ────────     │
│ Profile      │
│ Notifications│
│ ────────     │
│ Logout       │
└──────────────┘
```

**States:**
- Active page (highlighted)
- Hover state
- Collapsed mode (icons only)

#### 4.2 Statistics Cards
```
┌─────────────────┐
│ Total           │
│ Submissions     │
│      24         │
│  ↑ 12% vs last  │
└─────────────────┘
```

**Card Types:**
1. Total Submissions
2. Pending Evaluations
3. Completed Evaluations
4. Average Score

**Features:**
- Icon for each metric
- Large number display
- Trend indicator (↑↓)
- Glass card styling

#### 4.3 Recent Submissions List
```
┌────────────────────────────────────────────┐
│ Name              Status        Score      │
├────────────────────────────────────────────┤
│ Video Pres...    ✓ Completed    92/100    │
│ Doc Review       ⟳ Processing    --       │
│ Code Assess...   ✓ Completed    85/100    │
└────────────────────────────────────────────┘
```

**Columns:**
- Title (clickable)
- Status badge
- Score (if completed)
- Actions (view, delete)

**Status Badges:**
- 🔄 Pending (gray)
- ⟳ Processing (blue, animated)
- ✓ Completed (green)
- ✗ Failed (red)

#### 4.4 Quick Actions
- Primary button: "Create New Submission"
- Secondary buttons: "View All Submissions", "Browse Criteria"

---

## 5. Create Submission Page

**Route:** `/submissions/create`
**Access:** Authenticated
**Layout:** Multi-step form

### Layout - Step 1: Upload Files
```
┌─────────────────────────────────────────────────────────┐
│  Create New Submission                    Step 1 of 3    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Title *                                                  │
│  [_______________________________]                        │
│                                                           │
│  Description (Optional)                                   │
│  [_______________________________]                        │
│  [_______________________________]                        │
│  [_______________________________]                        │
│                                                           │
│  Upload Files *                                           │
│  ┌───────────────────────────────────────────┐          │
│  │                                             │          │
│  │        📁 Drag & Drop Files Here           │          │
│  │              or click to browse             │          │
│  │                                             │          │
│  │  Supported: Video, Audio, PDF, Code (ZIP)  │          │
│  │  Max size: 500MB per file                  │          │
│  └───────────────────────────────────────────┘          │
│                                                           │
│  Uploaded Files:                                          │
│  [📹 presentation.mp4  15MB  [×]]                        │
│  [📄 report.pdf        2MB   [×]]                        │
│                                                           │
│                          [Cancel]  [Next Step →]         │
└─────────────────────────────────────────────────────────┘
```

### Layout - Step 2: Select Criteria
```
┌─────────────────────────────────────────────────────────┐
│  Create New Submission                    Step 2 of 3    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Select Evaluation Criteria *                            │
│                                                           │
│  ○ Use Template Criteria                                 │
│    [Dropdown: Select template ▼]                        │
│      - Hackathon Evaluation                              │
│      - Education Assessment                              │
│      - Recruitment Review                                │
│                                                           │
│  ○ Use Custom Criteria                                   │
│    [Dropdown: Select custom ▼]                          │
│      - My Custom Criteria 1                              │
│      - My Custom Criteria 2                              │
│                                                           │
│  ○ Create New Criteria                                   │
│                                                           │
│  Selected Criteria Preview:                              │
│  ┌─────────────────────────────────────┐                │
│  │ • Technical Quality    (30%)        │                │
│  │ • Presentation        (25%)        │                │
│  │ • Innovation          (25%)        │                │
│  │ • Documentation       (20%)        │                │
│  └─────────────────────────────────────┘                │
│                                                           │
│                [← Back]  [Cancel]  [Next Step →]        │
└─────────────────────────────────────────────────────────┘
```

### Layout - Step 3: Review & Submit
```
┌─────────────────────────────────────────────────────────┐
│  Create New Submission                    Step 3 of 3    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Review Your Submission                                   │
│                                                           │
│  Title: My Project Presentation                          │
│  Description: Final project submission for...            │
│                                                           │
│  Files (2):                                               │
│  • presentation.mp4 (15MB)                               │
│  • report.pdf (2MB)                                      │
│                                                           │
│  Evaluation Criteria:                                     │
│  Hackathon Evaluation (4 criteria)                       │
│                                                           │
│  Estimated Processing Time: 5-7 minutes                  │
│                                                           │
│  [ ] I agree to the terms and conditions                 │
│                                                           │
│                [← Back]  [Cancel]  [Submit →]           │
└─────────────────────────────────────────────────────────┘
```

### Components

#### 5.1 File Upload Dropzone
- Drag & drop area
- Click to browse
- File type validation
- Size validation
- Multiple file support
- Upload progress bar
- Preview of uploaded files
- Remove file option

#### 5.2 Criteria Selection
- Radio buttons for selection method
- Dropdowns for templates/custom
- Preview of selected criteria
- Visual indicator of weights

#### 5.3 Progress Steps
```
[1 Upload] → [2 Criteria] → [3 Review]
```
- Active step highlighted
- Completed steps with checkmark
- Clickable to go back

### User Flow
```
User clicks "Create Submission"
  ↓
Step 1: Upload files
  ↓
Click "Next"
  ↓
Step 2: Select criteria
  ↓
Click "Next"
  ↓
Step 3: Review
  ↓
Click "Submit"
  ↓
API Call: POST /api/v1/submissions
  ↓
Show success message
  ↓
Redirect to submission details page
  ↓
Start polling for evaluation status
```

---

## 6. Submissions List Page

**Route:** `/submissions`
**Access:** Authenticated
**Layout:** Table view with filters

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  My Submissions                  [+ New Submission]      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  [Search: ____________]  [Filter ▼]  [Sort ▼]          │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Title          Type      Status     Score  Date │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Video Pres... Video     ✓ Complete  92   Nov 5 │→  │
│  │ Doc Review    Document  ⟳ Process   --   Nov 5 │→  │
│  │ Code Test     Code      ✓ Complete  85   Nov 4 │→  │
│  │ Interview     Video     ⏸ Pending   --   Nov 4 │→  │
│  │ Project       Document  ✓ Complete  88   Nov 3 │→  │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  Showing 1-5 of 24      [← 1 2 3 4 5 →]                │
└─────────────────────────────────────────────────────────┘
```

### Components

#### 6.1 Search & Filters
```
[Search Input]  [Filter Dropdown]  [Sort Dropdown]

Filter Options:
- All Status
- Pending
- Processing
- Completed
- Failed

- All Types
- Video/Audio
- Document
- Code

Sort Options:
- Newest First
- Oldest First
- Highest Score
- Lowest Score
```

#### 6.2 Submissions Table
**Columns:**
- Checkbox (for bulk actions)
- Title (clickable)
- Type icon + label
- Status badge
- Score (if completed)
- Date created
- Actions dropdown (•••)

**Actions Menu:**
- View Details
- Download Report
- Re-evaluate
- Delete

#### 6.3 Pagination
- Page numbers
- Previous/Next buttons
- Items per page selector
- Total count display

### States
- Empty state (no submissions yet)
- Loading state (skeleton loaders)
- Error state (retry button)

---

## 7. Submission Details Page

**Route:** `/submissions/:id`
**Access:** Authenticated (owner only)
**Layout:** Full-width content

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Submissions                                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Video Presentation Project              Status: ✓ Done  │
│  Submitted on Nov 5, 2024 at 10:30 AM                   │
│                                                           │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │ Overall Score   │  │ Confidence      │              │
│  │      92/100     │  │      95%        │              │
│  └─────────────────┘  └─────────────────┘              │
│                                                           │
│  Files (2):                                               │
│  • 📹 presentation.mp4 (15MB)  [Download]               │
│  • 📄 project_report.pdf (2MB) [Download]               │
│                                                           │
│  Evaluation Criteria Used:                               │
│  Hackathon Evaluation Template                           │
│                                                           │
│  [View Full Evaluation →]  [Download Report]            │
└─────────────────────────────────────────────────────────┘
```

### Components

#### 7.1 Header Section
- Back button
- Title
- Status badge (large)
- Submission timestamp
- Actions dropdown (re-evaluate, delete)

#### 7.2 Score Cards
```
┌─────────────────┐
│ Overall Score   │
│      92         │
│     /100        │
│                 │
│ [Progress Ring] │
└─────────────────┘
```
- Circular progress indicator
- Color-coded (green: >80, yellow: 60-80, red: <60)

#### 7.3 Files Section
- List of uploaded files
- File type icon
- File size
- Download button for each
- Preview option (for images/PDFs)

#### 7.4 Processing Status (if not complete)
```
┌─────────────────────────────────────────────────────────┐
│  Processing Your Submission...                 40%       │
│  [████████████░░░░░░░░░░░░░░░░]                         │
│                                                           │
│  Current Step: Analyzing video content                   │
│  Estimated time remaining: 3 minutes                     │
└─────────────────────────────────────────────────────────┘
```
- Real-time progress updates
- Current step display
- Time estimate
- Auto-refresh/polling

#### 7.5 Quick Actions
- View Full Evaluation (→ Evaluation Results Page)
- Download Report
- Request Re-evaluation
- Share (if sharing enabled)

---

## 8. Evaluation Results Page

**Route:** `/evaluations/:id`
**Access:** Authenticated (owner only)
**Layout:** Full-width content with sections

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Submission                                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Evaluation Report                                        │
│  Video Presentation Project                              │
│                                                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Overall: 92  │ │ Confidence   │ │ Processing   │   │
│  │    /100      │ │     95%      │ │   45 sec     │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                           │
│  ═══════════════════════════════════════════════════     │
│                                                           │
│  Score Breakdown                                          │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Technical Quality (30%)              92/100     │    │
│  │ [████████████████████░░] 92%                    │    │
│  │ "Excellent code structure and best practices"   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Presentation & Clarity (25%)         85/100     │    │
│  │ [█████████████████░░░░] 85%                     │    │
│  │ "Clear articulation with good visual aids"      │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Innovation (25%)                     88/100     │    │
│  │ [██████████████████░░] 88%                      │    │
│  │ "Creative approach to problem solving"          │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Documentation (20%)                  83/100     │    │
│  │ [████████████████░░░░] 83%                      │    │
│  │ "Good documentation, could be more detailed"    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ═══════════════════════════════════════════════════     │
│                                                           │
│  AI Insights & Recommendations                           │
│                                                           │
│  ✓ Strengths                                             │
│  • Excellent technical implementation                    │
│  • Strong presentation skills                            │
│  • Well-structured code architecture                     │
│                                                           │
│  ⚡ Recommendations                                       │
│  • Add more detailed API documentation                   │
│  • Include edge case handling in tests                   │
│  • Consider adding performance benchmarks                │
│                                                           │
│  ═══════════════════════════════════════════════════     │
│                                                           │
│  [Download PDF Report]  [Share Results]  [Print]        │
└─────────────────────────────────────────────────────────┘
```

### Components

#### 8.1 Summary Cards (Top)
- Overall Score (large, prominent)
- Confidence Score
- Processing Time
- Evaluated Date

#### 8.2 Score Breakdown Cards
Each criterion card includes:
- Criterion name
- Weight percentage
- Score (numeric)
- Progress bar (visual)
- AI comments/feedback
- Expand/collapse for details

**Visual Design:**
```
┌────────────────────────────────────────┐
│ Technical Quality (30%)      92/100    │
│ [████████████████████░░] 92%           │
│                                        │
│ "Excellent code structure..."          │
│                                        │
│ [Show Details ▼]                       │
└────────────────────────────────────────┘
```

#### 8.3 Insights Section
**Strengths:**
- ✓ Green checkmark
- List of positive points
- Glass card styling

**Recommendations:**
- ⚡ Lightning icon
- List of improvement areas
- Priority indicators

**Observations:**
- 👁️ Eye icon
- Neutral observations
- Additional context

#### 8.4 Score Visualization
- Radar chart showing all criteria
- Bar chart comparing scores
- Overall score gauge

#### 8.5 Actions
- Download PDF Report
- Share Results (generate link)
- Print Report
- Export JSON
- Request Re-evaluation

---

## 9. Profile Settings Page

**Route:** `/profile`
**Access:** Authenticated
**Layout:** Tabbed interface

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  Profile Settings                                         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  [Profile] [Security] [Notifications] [Billing]         │
│  ═══════                                                  │
│                                                           │
│  ┌─────────────┐                                         │
│  │   [Avatar]  │  First Name: [_________]                │
│  │     [📷]    │  Last Name:  [_________]                │
│  └─────────────┘                                         │
│                   Email: user@example.com                │
│                                                           │
│  Organization: [_____________________]                   │
│                                                           │
│  Bio:                                                     │
│  [___________________________________________]           │
│  [___________________________________________]           │
│  [___________________________________________]           │
│                                                           │
│  Timezone: [Dropdown ▼]                                  │
│  Language: [Dropdown ▼]                                  │
│                                                           │
│                          [Cancel]  [Save Changes]        │
└─────────────────────────────────────────────────────────┘
```

### Tabs

#### 9.1 Profile Tab
- Avatar upload
- First Name
- Last Name
- Email (read-only, verified badge)
- Organization
- Bio
- Timezone
- Language preference

#### 9.2 Security Tab
```
┌─────────────────────────────────────────────────────────┐
│  Change Password                                          │
│                                                           │
│  Current Password: [_______________]                     │
│  New Password:     [_______________]                     │
│  Confirm Password: [_______________]                     │
│                                                           │
│  [Update Password]                                       │
│                                                           │
│  ─────────────────────────────────────────────────       │
│                                                           │
│  Two-Factor Authentication                               │
│  [Enable 2FA] (Currently disabled)                       │
│                                                           │
│  ─────────────────────────────────────────────────       │
│                                                           │
│  Active Sessions                                          │
│  • Current session - Chrome on MacOS (This device)       │
│  • Safari on iPhone - Last active 2 days ago [Revoke]   │
│                                                           │
│  [Sign Out All Other Sessions]                           │
└─────────────────────────────────────────────────────────┘
```

#### 9.3 Notifications Tab
```
┌─────────────────────────────────────────────────────────┐
│  Email Notifications                                      │
│                                                           │
│  [✓] Evaluation completed                                │
│  [✓] Report ready for download                           │
│  [✓] New features and updates                            │
│  [ ] Marketing emails                                    │
│                                                           │
│  In-App Notifications                                     │
│                                                           │
│  [✓] Evaluation progress updates                         │
│  [✓] System announcements                                │
│  [✓] Tips and recommendations                            │
│                                                           │
│  [Save Preferences]                                       │
└─────────────────────────────────────────────────────────┘
```

#### 9.4 Billing Tab (If Paid)
```
┌─────────────────────────────────────────────────────────┐
│  Current Plan: Pro Plan                                  │
│  $50/month - 1000 evaluations/month                      │
│                                                           │
│  Usage This Month:                                        │
│  247 / 1000 evaluations used                             │
│  [████████░░░░░░░░░░] 24.7%                             │
│                                                           │
│  Next Billing Date: Dec 5, 2024                          │
│                                                           │
│  [Upgrade Plan]  [Manage Billing]                        │
│                                                           │
│  ─────────────────────────────────────────────────       │
│                                                           │
│  Payment Method                                           │
│  💳 Visa ending in 4242                                  │
│  Expires 12/2025                                          │
│                                                           │
│  [Update Payment Method]                                 │
│                                                           │
│  ─────────────────────────────────────────────────       │
│                                                           │
│  Billing History                                          │
│  Nov 5, 2024  $50.00  [Download Invoice]                │
│  Oct 5, 2024  $50.00  [Download Invoice]                │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Notifications Page

**Route:** `/notifications`
**Access:** Authenticated
**Layout:** List view

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  Notifications                    [Mark All as Read]     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Today                                                    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ● Evaluation Complete                    2m ago │    │
│  │   Your "Video Presentation" evaluation is       │    │
│  │   complete. Score: 92/100                       │    │
│  │   [View Results →]                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │   Processing Started                    15m ago │    │
│  │   Your submission "Code Review" is being        │    │
│  │   analyzed.                                     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  Yesterday                                                │
│  ┌─────────────────────────────────────────────────┐    │
│  │   Report Ready                          1d ago  │    │
│  │   PDF report for "Document Review" is ready     │    │
│  │   [Download →]                                  │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Components

#### Notification Card
- Icon (based on type)
- Title
- Description
- Timestamp
- Action button (if applicable)
- Mark as read option
- Delete option

**Notification Types:**
- 🟢 Success (green) - Evaluation complete
- 🔵 Info (blue) - Processing updates
- 🟡 Warning (yellow) - Warnings
- 🔴 Error (red) - Failed evaluations

**States:**
- Unread (bold, with dot)
- Read (normal weight)
- Empty state (no notifications)

---

## Component Library

### Reusable Components

#### Button
```jsx
<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```
Variants: primary, secondary, outline, ghost, danger
Sizes: sm, md, lg

#### Card
```jsx
<Card hover={true} glass={true}>
  Content
</Card>
```

#### Input
```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email"
  required
/>
```

#### Badge
```jsx
<Badge color="green" variant="solid">
  Completed
</Badge>
```

#### Progress Bar
```jsx
<ProgressBar value={75} max={100} color="purple" />
```

#### Modal
```jsx
<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Content</ModalBody>
  <ModalFooter>Actions</ModalFooter>
</Modal>
```

#### Dropdown
```jsx
<Dropdown>
  <DropdownTrigger>Menu</DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
**Repository:** Aasim-FE
