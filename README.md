# 🧠 Aasim-FE – Frontend Application

> **AI-powered judging and evaluation system - React Frontend**

---

## 🌍 Overview

**Aasim-FE** is the React-based frontend application for the Aasim AI Judge Agent platform. It provides a beautiful, responsive, and intuitive user interface for managing evaluations, viewing results, and interacting with the AI evaluation system.

**Repository:** `https://github.com/moeldowyedu/Aasim-FE`

---

## ✨ Features

### Current (Landing Page)
- ✅ Professional glassmorphism design
- ✅ iOS-inspired styling
- ✅ Fully responsive
- ✅ All marketing sections

### Planned (React Application)
- 🔄 User authentication (login, register)
- 🔄 File upload with drag & drop
- 🔄 Multi-step submission form
- 🔄 Real-time evaluation progress
- 🔄 Interactive score visualizations
- 🔄 PDF report viewer
- 🔄 Responsive dashboard
- 🔄 Notification system

---

## 🎨 Design System

**Theme:** Modern iOS-style glassmorphism

**Color Palette:**
- Background: Purple gradient (`#667eea` → `#764ba2` → `#f093fb`)
- Glass elements: Transparent white with backdrop blur
- Accents: Lavender, soft purple, mauve tones

**Typography:**
- Font Family: Inter, SF Pro, Poppins
- Clean, modern sans-serif

**Effects:**
- Frosted glass panels
- Blurred transparency
- Soft shadows
- Glowing accents
- Smooth transitions

---

## 🚀 Tech Stack

- **Framework:** React 18.x
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod
- **File Upload:** React Dropzone
- **Charts:** Recharts
- **Icons:** Material Icons / Heroicons
- **Notifications:** React Hot Toast

---

## 📁 Project Structure

```
Aasim-FE/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── assets/              # Images, fonts
│   ├── components/          # Reusable components
│   │   ├── common/          # Button, Input, Card, etc.
│   │   ├── layout/          # Header, Footer, Sidebar
│   │   └── features/        # Feature-specific components
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Submissions/
│   │   └── Profile/
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   ├── store/               # Zustand stores
│   ├── utils/               # Utility functions
│   ├── router/              # Routing config
│   ├── App.jsx
│   └── main.jsx
├── specs/                   # Frontend specifications
│   ├── README.md
│   ├── SCREEN_SPECIFICATIONS.md
│   ├── FRONTEND_ARCHITECTURE.md
│   └── UI_COMPONENTS.md
├── .env.example
├── index.html               # Current landing page
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/moeldowyedu/Aasim-FE.git
cd Aasim-FE

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev

# Open browser at http://localhost:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build
# or
yarn build

# Preview production build
npm run preview
```

---

## 📖 Documentation

Complete frontend specifications are available in the `specs/` directory:

### Screen Specifications
📄 **[SCREEN_SPECIFICATIONS.md](./specs/frontend/SCREEN_SPECIFICATIONS.md)**
- All 17 screen layouts with wireframes
- Component breakdowns
- User flows
- Interactive states

### Architecture
📄 **[FRONTEND_ARCHITECTURE.md](./specs/frontend/FRONTEND_ARCHITECTURE.md)**
- Project structure
- Component organization
- State management
- API integration

---

## 🎯 Development Roadmap

### Phase 1: Foundation (Current)
- [x] Landing page with glassmorphism design
- [ ] Setup React + Vite project
- [ ] Configure Tailwind CSS
- [ ] Setup routing
- [ ] Create component library

### Phase 2: Authentication
- [ ] Login page
- [ ] Register page
- [ ] Password reset flow
- [ ] JWT token management
- [ ] Protected routes

### Phase 3: Core Features
- [ ] Dashboard
- [ ] Create submission (multi-step form)
- [ ] File upload with drag & drop
- [ ] Submissions list
- [ ] Submission details

### Phase 4: Evaluation Results
- [ ] Evaluation results page
- [ ] Score visualizations
- [ ] PDF report viewer
- [ ] Download/share functionality

### Phase 5: User Features
- [ ] Profile settings
- [ ] Notifications
- [ ] Criteria library
- [ ] Search & filters

---

## 🔌 API Integration

The frontend connects to the Aasim backend API:

**Backend Repository:** `Aasim-BE` (separate repository)

**API Base URL:** `https://api.aasim.app/v1`

**Authentication:** JWT Bearer Token

**Key Endpoints:**
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /submissions` - List submissions
- `POST /submissions` - Create submission
- `GET /evaluations/:id` - Get evaluation results

---

## 🎨 Component Library

### Common Components
- **Button** - Primary, secondary, outline variants
- **Input** - Text, email, password with validation
- **Card** - Glass effect cards
- **Modal** - Overlay dialogs
- **Badge** - Status indicators
- **Progress Bar** - Loading and score indicators
- **Dropdown** - Menu and select dropdowns

### Layout Components
- **Header** - Navigation bar
- **Footer** - Site footer
- **Sidebar** - Dashboard navigation
- **MainLayout** - Page wrapper

### Feature Components
- **FileDropzone** - Drag & drop file upload
- **ScoreCard** - Evaluation score display
- **SubmissionCard** - Submission list item
- **NotificationCard** - Notification item

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 📦 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1

# App Configuration
VITE_APP_NAME=Aasim
VITE_MAX_FILE_SIZE=524288000  # 500MB in bytes

# Feature Flags
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_ANALYTICS=false
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

### Docker

```bash
# Build image
docker build -t aasim-fe .

# Run container
docker run -p 3000:80 aasim-fe
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🔗 Related Repositories

- **Backend API:** [Aasim-BE](https://github.com/moeldowyedu/Aasim-BE) (Coming soon)
- **Documentation:** [Aasim-Docs](https://github.com/moeldowyedu/Aasim-Docs) (Coming soon)

---

## 📧 Contact

For questions or support, please open an issue in this repository.

---

**Made with ❤️ by the Aasim Team**
