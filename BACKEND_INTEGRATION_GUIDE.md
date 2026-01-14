# Backend Integration Guide

## Overview

This guide explains how to connect the Aasim-FE frontend to the Aasim-BE Laravel backend API. All the necessary service files have been created, and you just need to replace the mock data calls with real API calls.

## Prerequisites

1. ✅ Laravel backend running at `https://api.obsolio.com/`
2. ✅ Backend database seeded with test data
3. ✅ Frontend development server running at `http://localhost:5173`
4. ✅ CORS configured on backend to allow frontend origin

## Environment Setup

The `.env` file has been created with:

```env
VITE_API_URL=https://api.obsolio.com//api
VITE_APP_NAME="Aasim AI"
VITE_APP_ENV=development
```

**Important:** Make sure your backend URL matches the `VITE_API_URL` in the `.env` file.

## Service Files Created

All API service files have been created in `src/services/`:

- ✅ `authService.js` - Authentication (login, register, logout, profile)
- ✅ `usersService.js` - User management
- ✅ `rolesService.js` - Roles & permissions
- ✅ `organizationService.js` - Branches, departments, projects, teams
- ✅ `integrationsService.js` - API keys, webhooks, connected apps

## Integration Pattern

### Current Mock Pattern (TO REPLACE):

```javascript
// ❌ OLD: Mock data with setTimeout
const handleCreateBranch = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  setTimeout(() => {
    const newBranch = {
      id: branches.length + 1,
      ...formData
    };
    setBranches([...branches, newBranch]);
    setIsLoading(false);
  }, 500);
};
```

### New API Pattern (TO USE):

```javascript
// ✅ NEW: Real API call
import organizationService from '../../services/organizationService';

const handleCreateBranch = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await organizationService.branches.create(formData);
    if (response.success) {
      setBranches([...branches, response.data]);
      setIsCreateModalOpen(false);
      // Optional: Show success notification
    }
  } catch (error) {
    console.error('Failed to create branch:', error);
    alert(error.response?.data?.message || 'Failed to create branch');
  } finally {
    setIsLoading(false);
  }
};
```

## Step-by-Step Integration by Page

### 1. Branches Page

**File:** `src/pages/Organization/BranchesPage.jsx`

**Add import:**
```javascript
import organizationService from '../../services/organizationService';
```

**Replace these handlers:**

**List Branches (useEffect):**
```javascript
useEffect(() => {
  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const response = await organizationService.branches.list();
      if (response.success) {
        setBranches(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch branches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchBranches();
}, []);
```

**Create Branch:**
```javascript
const handleSubmitNewBranch = async (e) => {
  e.preventDefault();

  // Validation
  if (!formData.name.trim()) {
    alert('Please enter a branch name');
    return;
  }

  setIsLoading(true);

  try {
    const response = await organizationService.branches.create(formData);
    if (response.success) {
      setBranches([...branches, response.data]);
      setIsCreateModalOpen(false);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to create branch');
  } finally {
    setIsLoading(false);
  }
};
```

**Update Branch:**
```javascript
const handleUpdateBranch = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const response = await organizationService.branches.update(editingBranch.id, formData);
    if (response.success) {
      setBranches(branches.map(b => b.id === editingBranch.id ? response.data : b));
      setIsEditModalOpen(false);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to update branch');
  } finally {
    setIsLoading(false);
  }
};
```

**Delete Branch:**
```javascript
const handleConfirmDelete = async () => {
  setIsLoading(true);

  try {
    await organizationService.branches.delete(deletingBranch.id);
    setBranches(branches.filter(b => b.id !== deletingBranch.id));
    setIsDeleteModalOpen(false);
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to delete branch');
  } finally {
    setIsLoading(false);
  }
};
```

### 2. Departments Page

**File:** `src/pages/Organization/DepartmentsPage.jsx`

**Add import:**
```javascript
import organizationService from '../../services/organizationService';
```

**Load Departments:**
```javascript
useEffect(() => {
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await organizationService.departments.list();
      if (response.success) {
        // Backend returns nested structure
        setDepartments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchDepartments();
}, []);
```

**Create Department:**
```javascript
const handleSubmitNewDepartment = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const data = {
      ...formData,
      parent_id: parentDepartment?.id || null
    };

    const response = await organizationService.departments.create(data);
    if (response.success) {
      // Refresh departments list to get updated hierarchy
      const updatedDepts = await organizationService.departments.list();
      setDepartments(updatedDepts.data);
      setIsCreateModalOpen(false);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to create department');
  } finally {
    setIsLoading(false);
  }
};
```

### 3. Projects Page

**File:** `src/pages/Organization/ProjectsPage.jsx`

**Add import:**
```javascript
import organizationService from '../../services/organizationService';
```

**Load Projects:**
```javascript
useEffect(() => {
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await organizationService.projects.list();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProjects();
}, []);
```

**Create/Update/Delete:** Follow the same pattern as Branches above.

### 4. Teams Page

**File:** `src/pages/Organization/TeamsPage.jsx`

**Add import:**
```javascript
import organizationService from '../../services/organizationService';
```

**Create Team:**
```javascript
const handleSubmitNewTeam = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const data = {
      ...formData,
      members: members // Members array with name and role
    };

    const response = await organizationService.teams.create(data);
    if (response.success) {
      setTeams([...teams, response.data]);
      setIsCreateModalOpen(false);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to create team');
  } finally {
    setIsLoading(false);
  }
};
```

### 5. API Keys Page

**File:** `src/pages/Integrations/APIKeysPage.jsx`

**Add import:**
```javascript
import integrationsService from '../../services/integrationsService';
```

**Load API Keys:**
```javascript
useEffect(() => {
  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const response = await integrationsService.apiKeys.list();
      if (response.success) {
        // Keys are automatically masked by backend
        setApiKeys(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchApiKeys();
}, []);
```

**Create API Key:**
```javascript
const handleCreateApiKey = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const response = await integrationsService.apiKeys.create(formData);
    if (response.success) {
      // Backend returns full key ONLY ONCE
      setNewApiKey(response.data.key);
      // Refresh list to get masked version
      const updatedKeys = await integrationsService.apiKeys.list();
      setApiKeys(updatedKeys.data);
      setIsCreateModalOpen(false);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to create API key');
  } finally {
    setIsLoading(false);
  }
};
```

### 6. Webhooks Page

**File:** `src/pages/Integrations/WebhooksPage.jsx`

**Add import:**
```javascript
import integrationsService from '../../services/integrationsService';
```

**Load Webhooks:**
```javascript
useEffect(() => {
  const fetchWebhooks = async () => {
    setIsLoading(true);
    try {
      const response = await integrationsService.webhooks.list();
      if (response.success) {
        setWebhooks(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch webhooks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchWebhooks();
}, []);
```

**Test Webhook:**
```javascript
const handleTestWebhook = async (id) => {
  setIsLoading(true);

  try {
    const response = await integrationsService.webhooks.test(id);
    if (response.success) {
      // Update last triggered timestamp
      const updatedWebhooks = await integrationsService.webhooks.list();
      setWebhooks(updatedWebhooks.data);
      alert('Test webhook sent successfully!');
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to test webhook');
  } finally {
    setIsLoading(false);
  }
};
```

**Toggle Status:**
```javascript
const handleToggleStatus = async (id) => {
  setIsLoading(true);

  try {
    const response = await integrationsService.webhooks.toggle(id);
    if (response.success) {
      setWebhooks(webhooks.map(w => w.id === id ? response.data : w));
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to toggle status');
  } finally {
    setIsLoading(false);
  }
};
```

### 7. Connected Apps Page

**File:** `src/pages/Integrations/ConnectedAppsPage.jsx`

**Add import:**
```javascript
import integrationsService from '../../services/integrationsService';
```

**Connect App:**
```javascript
const handleConnectApp = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const data = {
      name: selectedAppToConnect.name,
      app_type: selectedAppToConnect.id,
      description: selectedAppToConnect.description,
      icon: selectedAppToConnect.icon,
      permissions: connectFormData.permissions
    };

    const response = await integrationsService.connectedApps.connect(data);
    if (response.success) {
      setConnectedApps([...connectedApps, response.data]);
      setIsConnectModalOpen(false);
      setSelectedAppToConnect(null);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to connect app');
  } finally {
    setIsLoading(false);
  }
};
```

**Reconnect App:**
```javascript
const handleReconnect = async (app) => {
  setIsLoading(true);

  try {
    const response = await integrationsService.connectedApps.reconnect(app.id);
    if (response.success) {
      setConnectedApps(connectedApps.map(a => a.id === app.id ? response.data : a));
      alert(`Successfully reconnected to ${app.name}!`);
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to reconnect app');
  } finally {
    setIsLoading(false);
  }
};
```

### 8. All Users Page

**File:** `src/pages/Team/AllUsersPage.jsx`

**Add import:**
```javascript
import usersService from '../../services/usersService';
```

**Load Users:**
```javascript
useEffect(() => {
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await usersService.getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUsers();
}, []);
```

**Create/Update/Delete:** Follow the same pattern as Branches above.

### 9. Roles & Permissions Page

**File:** `src/pages/Team/RolesPermissionsPage.jsx`

**Add import:**
```javascript
import rolesService from '../../services/rolesService';
```

**Load Roles:**
```javascript
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [rolesResponse, permissionsResponse] = await Promise.all([
        rolesService.getRoles(),
        rolesService.getPermissions()
      ]);

      if (rolesResponse.success) {
        setRoles(rolesResponse.data);
      }
      if (permissionsResponse.success) {
        // Permissions are grouped by category
        setPermissions(permissionsResponse.data);
      }
    } catch (error) {
      console.error('Failed to fetch roles/permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);
```

## Error Handling Pattern

For better UX, create a reusable error handler:

```javascript
// src/utils/errorHandler.js
export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || fallbackMessage;
    const errors = error.response.data?.errors;

    if (errors && typeof errors === 'object') {
      // Validation errors
      const errorMessages = Object.values(errors).flat().join('\n');
      return errorMessages;
    }

    return message;
  } else if (error.request) {
    // Request made but no response
    return 'Cannot connect to server. Please check your connection.';
  } else {
    // Error in request configuration
    return error.message || fallbackMessage;
  }
};
```

**Usage:**
```javascript
import { handleApiError } from '../../utils/errorHandler';

try {
  await organizationService.branches.create(formData);
} catch (error) {
  const errorMessage = handleApiError(error, 'Failed to create branch');
  alert(errorMessage); // or use a toast notification
}
```

## Backend Response Format

All Laravel backend endpoints return data in this format:

### Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["Error message"]
  }
}
```

### Paginated Response:
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 47,
    "last_page": 4
  },
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  }
}
```

## Testing Checklist

After integration, test these flows:

- [ ] **Authentication**
  - [ ] Login with admin@aasim.ai / password
  - [ ] Register new user
  - [ ] Logout
  - [ ] Profile update
  - [ ] Change password

- [ ] **Organization Management**
  - [ ] Create branch
  - [ ] Update branch
  - [ ] Delete branch
  - [ ] Create department with hierarchy
  - [ ] Create project
  - [ ] Create team with members

- [ ] **User Management**
  - [ ] List users
  - [ ] Create user
  - [ ] Update user
  - [ ] Toggle user status
  - [ ] View user activity

- [ ] **Roles & Permissions**
  - [ ] List roles
  - [ ] Create custom role
  - [ ] Cannot edit/delete system roles
  - [ ] View permissions

- [ ] **Integrations**
  - [ ] Create API key (verify full key shown once)
  - [ ] Create webhook (verify secret shown once)
  - [ ] Test webhook
  - [ ] Toggle webhook status
  - [ ] Connect app
  - [ ] Disconnect app

## Common Issues & Solutions

### Issue: CORS Error
**Solution:** Ensure backend `config/cors.php` has:
```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')]
```

### Issue: 401 Unauthorized
**Solution:** Check that token is saved in localStorage and sent in headers.

### Issue: 404 Not Found
**Solution:** Verify backend routes match the service URLs.

### Issue: Validation Errors
**Solution:** Check that frontend form fields match backend validation rules.

## Next Steps

1. Replace all mock `setTimeout` calls with real API calls
2. Add loading spinners during API calls
3. Add toast notifications for success/error messages
4. Test all CRUD operations
5. Handle edge cases (network errors, timeouts)
6. Add retry logic for failed requests (already implemented in api.js)

## Support

If you encounter issues:
1. Check browser console for errors
2. Check network tab for API requests/responses
3. Verify backend is running (`php artisan serve`)
4. Verify database has seeded data (`php artisan db:seed`)
5. Check backend logs in `storage/logs/laravel.log`
