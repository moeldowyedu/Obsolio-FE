# API Debugging Guide for Admin Console

## 🔍 Issue Reports

### 1. Agents Page (`/agents`) - Flashing Issue
**Symptom:** Page appears then disappears immediately
**Possible Causes:**
- JavaScript error in console
- API response format mismatch
- Missing data causing render error
- useEffect dependency loop

### 2. Tenants Page (`/tenants`) - No Data
**Symptom:** "No tenants found" message
**Possible Causes:**
- No tenants in database
- API returning empty array
- Missing system_admin permission
- Wrong API endpoint

---

## 🛠️ Debugging Steps

### Step 1: Open Browser Console

1. Navigate to the problem page
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Look for red error messages

**Common Errors to Look For:**
```javascript
// JavaScript errors
Uncaught TypeError: Cannot read property 'map' of undefined
Uncaught ReferenceError: X is not defined

// React errors
Warning: Each child in a list should have a unique "key" prop
Error: Objects are not valid as a React child

// API errors
GET https://api.obsolio.com/api/v1/admin/agents 404 (Not Found)
GET https://api.obsolio.com/api/v1/admin/agents 500 (Internal Server Error)
```

### Step 2: Check Network Tab

1. In DevTools, go to **Network** tab
2. Refresh the page
3. Look for API calls (filter by `XHR` or `Fetch`)
4. Click on the API call to see:
   - **Request Headers** (check Authorization token)
   - **Response** (actual data returned)
   - **Status Code** (200 = success, 404 = not found, 500 = server error)

**Expected API Calls:**

#### For Agents Page:
```
GET /api/v1/admin/agents?page=1&per_page=20
GET /api/v1/admin/agent-categories
```

#### For Tenants Page:
```
GET /api/v1/tenants
```

### Step 3: Test APIs Directly with curl

#### Test Agents API:
```bash
# Get your auth token from browser localStorage
# Then run:
curl https://api.obsolio.com/api/v1/admin/agents?page=1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -v

# Expected Response:
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [ /* array of agents */ ],
    "last_page": 1,
    "per_page": 20,
    "total": 0
  }
}
```

#### Test Tenants API:
```bash
curl https://api.obsolio.com/api/v1/tenants \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -v

# Expected Response:
{
  "success": true,
  "data": [ /* array of tenants */ ]
}
```

#### Test Categories API:
```bash
curl https://api.obsolio.com/api/v1/admin/agent-categories \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -v

# Expected Response:
{
  "success": true,
  "data": [ /* array of categories */ ]
}
```

---

## 🔧 Quick Fixes

### Fix 1: If Agents API Returns Empty Data

If the API returns:
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [],
    "last_page": 1,
    "per_page": 20,
    "total": 0
  }
}
```

**This is normal!** It means there are no agents in the database yet. The page should show "No agents found" message, not disappear.

**Check:** Open browser console and look for errors when rendering empty state.

### Fix 2: If Tenants API Returns Empty Array

```json
{
  "success": true,
  "data": []
}
```

**This is normal!** You need to create at least one tenant first.

**Solution:** Create test data in database or use API to create tenant.

### Fix 3: If You See Authentication Error (401)

```json
{
  "message": "Unauthenticated"
}
```

**Problem:** Token is missing or invalid

**Solution:**
1. Logout and login again
2. Check if token exists: `localStorage.getItem('auth_token')`
3. Verify user has `is_system_admin: true`

### Fix 4: If You See 404 Error

```
GET /api/v1/admin/agents 404 (Not Found)
```

**Problem:** API endpoint not implemented or wrong path

**Solution:**
1. Verify backend API is deployed
2. Check API path matches: `/api/v1/admin/agents`
3. Run backend migration/deployment

---

## 📊 Debug Console Commands

Open browser console and run these commands:

### Check Auth Token:
```javascript
localStorage.getItem('auth_token')
```

### Check User Data:
```javascript
JSON.parse(localStorage.getItem('user'))
```

### Check if User is System Admin:
```javascript
JSON.parse(localStorage.getItem('user'))?.is_system_admin
// Should return: true
```

### Test API Call Manually:
```javascript
// Test agents API
fetch('https://api.obsolio.com/api/v1/admin/agents?page=1', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log('Agents API Response:', data))
.catch(error => console.error('Agents API Error:', error))

// Test tenants API
fetch('https://api.obsolio.com/api/v1/tenants', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log('Tenants API Response:', data))
.catch(error => console.error('Tenants API Error:', error))
```

---

## 🎯 Common Solutions

### Solution 1: Clear Browser Cache
```javascript
// Clear localStorage
localStorage.clear()

// Then reload page and login again
```

### Solution 2: Check API Base URL

The frontend expects APIs at: `/api/v1/`

Verify in `src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
```

### Solution 3: Create Test Data

If database is empty, create test data:

**For Tenants:**
```sql
INSERT INTO tenants (name, short_name, slug, type, created_at, updated_at)
VALUES ('Test Organization', 'TEST', 'test-org', 'organization', NOW(), NOW());
```

**For Agent Categories:**
```sql
INSERT INTO agent_categories (name, slug, description, icon, display_order, created_at, updated_at)
VALUES ('Test Category', 'test-category', 'Test description', 'folder', 1, NOW(), NOW());
```

**For Agents:**
```sql
INSERT INTO agents (name, slug, category_id, description, runtime_type, version, is_active, created_at, updated_at)
VALUES ('Test Agent', 'test-agent', 1, 'Test agent description', 'python', '1.0.0', true, NOW(), NOW());
```

---

## 📝 Reporting Issues

When reporting issues, please provide:

1. **Browser Console Screenshot** - Full error messages
2. **Network Tab Screenshot** - API request/response
3. **Steps to Reproduce** - Exactly what you clicked
4. **Expected vs Actual Behavior**
5. **API Response** - Copy the full JSON response

**Example Issue Report:**
```
Issue: Agents page disappears immediately

Browser: Chrome 120.0.0.0
URL: https://console.obsolio.com/agents

Console Error:
TypeError: Cannot read property 'map' of undefined
  at AgentsManagementPage.jsx:234

API Response:
GET /api/v1/admin/agents
Status: 200 OK
{
  "success": true,
  "data": {
    "data": [],
    "total": 0
  }
}

Expected: Should show "No agents found" message
Actual: Page disappears/crashes
```

---

## ✅ Verification Checklist

Before deploying, verify:

- [ ] Browser console shows no errors
- [ ] Network tab shows 200 OK for all API calls
- [ ] Auth token is present in localStorage
- [ ] User has is_system_admin: true
- [ ] APIs return expected JSON structure
- [ ] Empty state renders correctly (no agents/tenants)
- [ ] Loading state shows during API calls
- [ ] Error state shows if API fails

---

## 🚀 Next Steps

1. **Check Browser Console** - Look for JavaScript errors
2. **Check Network Tab** - Verify API responses
3. **Test APIs with curl** - Confirm backend is working
4. **Report specific errors** - Share console/network screenshots

---

Last Updated: 2024-12-27
