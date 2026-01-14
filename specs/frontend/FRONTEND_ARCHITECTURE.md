# Frontend Architecture - React Application

## Overview

This document outlines the frontend architecture for the Aasim AI Judge Agent React application.

## Technology Stack

- **Framework:** React 18.x with Hooks
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+) / TypeScript (optional)
- **State Management:** Zustand or Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod validation
- **File Upload:** React Dropzone
- **Charts:** Recharts
- **Icons:** Material Icons / Heroicons
- **Notifications:** React Hot Toast
- **Loading States:** React Loading Skeleton

---

## Project Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── assets/
├── src/
│   ├── assets/              # Images, fonts, static files
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   │       └── global.css
│   │
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Generic components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.test.jsx
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Dropdown/
│   │   │   ├── Table/
│   │   │   ├── Pagination/
│   │   │   ├── Loading/
│   │   │   └── Toast/
│   │   │
│   │   ├── layout/          # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   ├── Navigation/
│   │   │   └── MainLayout/
│   │   │
│   │   └── features/        # Feature-specific components
│   │       ├── auth/
│   │       │   ├── LoginForm/
│   │       │   ├── RegisterForm/
│   │       │   └── PasswordReset/
│   │       │
│   │       ├── submissions/
│   │       │   ├── SubmissionCard/
│   │       │   ├── SubmissionList/
│   │       │   ├── SubmissionUpload/
│   │       │   ├── FileDropzone/
│   │       │   └── StatusBadge/
│   │       │
│   │       ├── evaluations/
│   │       │   ├── EvaluationDetails/
│   │       │   ├── ScoreCard/
│   │       │   ├── ScoreChart/
│   │       │   ├── InsightsList/
│   │       │   └── CriteriaDisplay/
│   │       │
│   │       ├── reports/
│   │       │   ├── ReportViewer/
│   │       │   ├── ReportDownload/
│   │       │   └── ReportShare/
│   │       │
│   │       └── profile/
│   │           ├── ProfileCard/
│   │           ├── ProfileEdit/
│   │           └── AvatarUpload/
│   │
│   ├── pages/               # Page components (routes)
│   │   ├── Home/
│   │   │   └── HomePage.jsx
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.jsx
│   │   ├── Submissions/
│   │   │   ├── SubmissionsPage.jsx
│   │   │   ├── CreateSubmissionPage.jsx
│   │   │   └── SubmissionDetailsPage.jsx
│   │   ├── Evaluations/
│   │   │   └── EvaluationDetailsPage.jsx
│   │   ├── Criteria/
│   │   │   ├── CriteriaListPage.jsx
│   │   │   └── CreateCriteriaPage.jsx
│   │   ├── Profile/
│   │   │   └── ProfilePage.jsx
│   │   └── NotFound/
│   │       └── NotFoundPage.jsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useSubmissions.js
│   │   ├── useEvaluations.js
│   │   ├── useCriteria.js
│   │   ├── useNotifications.js
│   │   ├── useFileUpload.js
│   │   └── useDebounce.js
│   │
│   ├── services/            # API services
│   │   ├── api.js           # Axios instance
│   │   ├── authService.js
│   │   ├── submissionService.js
│   │   ├── evaluationService.js
│   │   ├── criteriaService.js
│   │   ├── reportService.js
│   │   └── userService.js
│   │
│   ├── store/               # State management
│   │   ├── index.js         # Store configuration
│   │   ├── authStore.js
│   │   ├── submissionStore.js
│   │   ├── uiStore.js
│   │   └── notificationStore.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── storage.js       # LocalStorage helpers
│   │
│   ├── router/              # Routing configuration
│   │   ├── index.jsx
│   │   ├── routes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── config/              # Configuration
│   │   └── config.js
│   │
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
│
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Key Components

### 1. Common Components

#### Button Component
```jsx
// src/components/common/Button/Button.jsx
import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-full font-semibold transition-all';

  const variants = {
    primary: 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg',
    secondary: 'glass border border-white/30 text-white hover:bg-white/20',
    outline: 'border-2 border-purple-400 text-purple-400 hover:bg-purple-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
```

#### Card Component
```jsx
// src/components/common/Card/Card.jsx
const Card = ({ children, className = '', hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  return (
    <div className={`glass-card rounded-3xl p-6 transition-all ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
```

### 2. Layout Components

#### MainLayout Component
```jsx
// src/components/layout/MainLayout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
```

### 3. Feature Components

#### SubmissionUpload Component
```jsx
// src/components/features/submissions/SubmissionUpload/SubmissionUpload.jsx
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

const SubmissionUpload = ({ onUpload }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles);
      onUpload(acceptedFiles);
    },
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
      'audio/*': ['.mp3', '.wav'],
      'application/pdf': ['.pdf'],
      'application/zip': ['.zip']
    },
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  return (
    <div {...getRootProps()} className="glass-card rounded-3xl p-12 text-center cursor-pointer">
      <input {...getInputProps()} />
      <div className="material-icons text-6xl mb-4">cloud_upload</div>
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag & drop files here, or click to select</p>
      )}
      <p className="text-sm text-purple-200 mt-2">
        Supported: Video, Audio, PDF, ZIP (Max 500MB)
      </p>
    </div>
  );
};

export default SubmissionUpload;
```

#### ScoreCard Component
{% raw %}
```jsx
// src/components/features/evaluations/ScoreCard/ScoreCard.jsx
const ScoreCard = ({ criterion, score, maxScore, weight, comments }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{criterion}</h3>
        <span className="text-purple-200">{score}/{maxScore}</span>
      </div>

      <div className="score-bar mb-4">
        <div
          className="score-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-purple-200">{comments}</p>

      <div className="mt-3 text-xs text-purple-300">
        Weight: {(weight * 100).toFixed(0)}%
      </div>
    </div>
  );
};

export default ScoreCard;
```
{% endraw %}

---

## Custom Hooks

### useAuth Hook
```jsx
// src/hooks/useAuth.js
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser, setToken, clearAuth } = useAuthStore();

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data.user);
      setToken(response.data.token);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    clearAuth();
    navigate('/');
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.data.user);
      setToken(response.data.token);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };
};
```

### useFileUpload Hook
```jsx
// src/hooks/useFileUpload.js
import { useState } from 'react';
import { submissionService } from '../services/submissionService';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFiles = async (files, metadata) => {
    setUploading(true);
    setError(null);

    try {
      const response = await submissionService.createSubmission(
        files,
        metadata,
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      );

      setUploading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      setUploading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    uploading,
    progress,
    error,
    uploadFiles
  };
};
```

---

## State Management (Zustand)

### Auth Store
```jsx
// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      clearAuth: () => set({
        user: null,
        token: null,
        refreshToken: null
      })
    }),
    {
      name: 'auth-storage'
    }
  )
);
```

### Submission Store
```jsx
// src/store/submissionStore.js
import { create } from 'zustand';

export const useSubmissionStore = create((set) => ({
  submissions: [],
  currentSubmission: null,
  loading: false,
  error: null,

  setSubmissions: (submissions) => set({ submissions }),
  setCurrentSubmission: (submission) => set({ currentSubmission: submission }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addSubmission: (submission) => set((state) => ({
    submissions: [submission, ...state.submissions]
  })),

  updateSubmission: (id, updates) => set((state) => ({
    submissions: state.submissions.map(sub =>
      sub.id === id ? { ...sub, ...updates } : sub
    )
  }))
}));
```

---

## Routing Configuration

```jsx
// src/router/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import SubmissionsPage from '../pages/Submissions/SubmissionsPage';
import CreateSubmissionPage from '../pages/Submissions/CreateSubmissionPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
      },
      {
        path: 'submissions',
        element: <ProtectedRoute><SubmissionsPage /></ProtectedRoute>
      },
      {
        path: 'submissions/create',
        element: <ProtectedRoute><CreateSubmissionPage /></ProtectedRoute>
      }
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]);
```

---

## API Service Layer

```jsx
// src/services/api.js
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.obsolio.com//api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Environment Variables

```env
# .env.example
VITE_API_BASE_URL=https://api.obsolio.com//api/v1
VITE_APP_NAME=Aasim
VITE_MAX_FILE_SIZE=524288000
VITE_ALLOWED_FILE_TYPES=video/*,audio/*,application/pdf,application/zip
```

---

## Performance Optimization

1. **Code Splitting:** Use React.lazy() for route-based code splitting
2. **Memoization:** Use React.memo(), useMemo(), useCallback()
3. **Image Optimization:** Lazy loading images
4. **Bundle Optimization:** Tree shaking, minification
5. **Caching:** Cache API responses with React Query (optional)

---

## Testing Strategy

- **Unit Tests:** Jest + React Testing Library
- **Component Tests:** Test user interactions
- **Integration Tests:** Test API integration
- **E2E Tests:** Cypress for critical user flows

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
