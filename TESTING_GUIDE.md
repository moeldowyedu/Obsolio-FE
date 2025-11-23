# Tenant Settings Testing Guide

## Overview
This guide explains how to test the Tenant Settings page with full CRUD operations using the backend API.

## Prerequisites

1. **Backend Server Running**
   ```bash
   # Make sure the backend API is running at:
   http://localhost:8000/api/v1
   ```

2. **Authentication Token**
   - Login to the application
   - Get your auth token from localStorage or browser dev tools
   - Token is stored as `auth_token` in localStorage

3. **Tenant ID**
   - Get your current tenant ID from localStorage
   - Key: `current_tenant_id`

## Method 1: Testing via Web UI

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Login and Navigate
1. Login to the application
2. Navigate to Settings → Tenant Settings
3. You should see the multi-step form

### Step 3: Test CRUD Operations

#### READ (GET)
- The page automatically fetches settings on load
- Check browser console for: `📥 Fetched tenant settings:`
- You should see a success toast: "Settings loaded successfully"

#### UPDATE (PUT)
1. Fill out the form fields across all 4 steps:
   - **Step 1:** Company Identity
   - **Step 2:** Contact Information
   - **Step 3:** Business Address
   - **Step 4:** Regional Settings

2. Navigate through steps using "Next" button

3. On the final step, click "Save All Settings"

4. Check browser console for: `💾 Saving tenant settings:`

5. You should see a success toast: "Settings saved successfully!"

#### Verify Update
1. Refresh the page
2. Settings should persist and reload with your changes

## Method 2: Testing via API Script

### Step 1: Set Environment Variables
```bash
# Set your authentication token
export AUTH_TOKEN="your-actual-auth-token-here"

# Set your tenant ID
export TENANT_ID="your-actual-tenant-id-here"

# (Optional) Set custom API URL
export API_BASE_URL="http://localhost:8000/api/v1"
```

### Step 2: Run the Test Script
```bash
./test_tenant_settings_api.sh
```

### Expected Output
The script will run 4 tests:
1. ✅ GET Tenant Settings (READ)
2. ✅ PUT Tenant Settings (UPDATE)
3. ✅ Verify Update (READ after UPDATE)
4. ✅ Test Validation (Invalid Data)

### Sample Output
```
========================================
Tenant Settings API Test Suite
========================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST: 1. GET Tenant Settings (READ Operation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Endpoint: GET http://localhost:8000/api/v1/tenants/123/settings

✅ GET Request Successful (HTTP 200)

Response Body:
{
  "success": true,
  "data": {
    "tenantInfo": { ... },
    "settings": { ... }
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST: 2. PUT Tenant Settings (UPDATE Operation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
...
```

## Method 3: Testing with cURL

### GET Tenant Settings
```bash
curl -X GET \
  http://localhost:8000/api/v1/tenants/YOUR_TENANT_ID/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Tenant-ID: YOUR_TENANT_ID" \
  -H "Content-Type: application/json"
```

### PUT Tenant Settings
```bash
curl -X PUT \
  http://localhost:8000/api/v1/tenants/YOUR_TENANT_ID/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Tenant-ID: YOUR_TENANT_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantInfo": {
      "name": "Updated Corporation",
      "primaryEmail": "updated@test.com",
      "primaryPhone": "+1 (555) 111-2222",
      "industry": "Technology",
      "streetAddress": "123 Updated Street",
      "city": "San Francisco",
      "stateProvince": "California",
      "postalCode": "94102",
      "country": "United States",
      "timezone": "America/Los_Angeles",
      "language": "en",
      "currency": "USD"
    },
    "settings": {
      "enableSSO": true,
      "enableMFA": true,
      "enableAuditLogs": true,
      "enableAPIAccess": true,
      "dataRetention": 90,
      "allowPublicAgents": true,
      "allowPrivateAgents": true,
      "autoBackup": true
    }
  }'
```

## Method 4: Testing with Postman/Insomnia

### Import Collection
1. Create a new request collection
2. Set base URL: `http://localhost:8000/api/v1`

### Setup Environment Variables
```
baseUrl: http://localhost:8000/api/v1
authToken: your-token-here
tenantId: your-tenant-id-here
```

### GET Request
- **URL:** `{{baseUrl}}/tenants/{{tenantId}}/settings`
- **Method:** GET
- **Headers:**
  - `Authorization: Bearer {{authToken}}`
  - `X-Tenant-ID: {{tenantId}}`
  - `Content-Type: application/json`

### PUT Request
- **URL:** `{{baseUrl}}/tenants/{{tenantId}}/settings`
- **Method:** PUT
- **Headers:**
  - `Authorization: Bearer {{authToken}}`
  - `X-Tenant-ID: {{tenantId}}`
  - `Content-Type: application/json`
- **Body:** (See TENANT_SETTINGS_API_DOCUMENTATION.md for complete payload)

## Debugging Tips

### Check Browser Console
Open browser developer tools (F12) and check the Console tab for:
- `🌐 API Configuration:` - Shows API base URL
- `📥 Fetched tenant settings:` - Shows GET response
- `💾 Saving tenant settings:` - Shows PUT request
- `✅ Settings saved successfully:` - Confirms save
- `❌ Error ...` - Shows any errors

### Check Network Tab
1. Open browser developer tools (F12)
2. Go to Network tab
3. Filter by "settings"
4. Look for:
   - GET request to `/tenants/{id}/settings`
   - PUT request to `/tenants/{id}/settings`
5. Check request/response headers and body

### Common Issues

#### 1. "No tenant selected" Error
**Problem:** No tenant ID in localStorage

**Solution:**
```javascript
// In browser console:
localStorage.setItem('current_tenant_id', 'your-tenant-id');
```

#### 2. 401 Unauthorized
**Problem:** Invalid or missing auth token

**Solution:**
```javascript
// Login first, then check:
const token = localStorage.getItem('auth_token');
console.log('Current token:', token);
```

#### 3. Network Error / Cannot reach backend
**Problem:** Backend server not running

**Solution:**
- Start the backend server
- Check if it's running at `http://localhost:8000`
- Verify the correct port

#### 4. 404 Not Found
**Problem:** Tenant doesn't exist or wrong tenant ID

**Solution:**
- Verify tenant ID is correct
- Check if tenant exists in the system

## Expected Behavior

### Loading State
- Shows spinner with "Loading tenant settings..."
- Fetches settings from API
- Updates form with fetched data

### Form Interaction
- 4-step stepper navigation
- All fields are editable
- Validation on required fields

### Save Operation
- Button shows "Saving..." with spinner
- Sends PUT request to API
- Shows success toast on success
- Shows error toast with details on failure

### Error States
- Shows error page if loading fails
- "Retry" button to reload
- Detailed error messages in toast notifications

## Test Scenarios

### Happy Path
1. ✅ Page loads successfully
2. ✅ Settings are fetched and displayed
3. ✅ User fills out all required fields
4. ✅ User navigates through all steps
5. ✅ User saves settings
6. ✅ Success toast appears
7. ✅ Page refresh shows saved changes

### Error Scenarios
1. ❌ Network error → Shows error page
2. ❌ Invalid data → Shows validation errors
3. ❌ Unauthorized → Redirects to login
4. ❌ Forbidden → Shows permission error

### Edge Cases
1. Missing tenant ID → Shows error
2. Partial data → Shows validation errors
3. Very large descriptions → Handles correctly
4. Special characters in fields → Saves correctly

## Performance Testing

### Load Time
- Initial load should be < 2 seconds
- API response should be < 500ms

### Save Time
- Save operation should complete < 1 second
- Should show loading state during save

## Browser Console Commands

### Get Current Tenant ID
```javascript
localStorage.getItem('current_tenant_id')
```

### Get Auth Token
```javascript
localStorage.getItem('auth_token')
```

### Set Tenant ID (for testing)
```javascript
localStorage.setItem('current_tenant_id', 'test-tenant-123')
```

### Clear Settings Cache
```javascript
localStorage.clear()
location.reload()
```

## API Response Examples

See `TENANT_SETTINGS_API_DOCUMENTATION.md` for:
- Complete field list
- Request/response examples
- Error response formats
- Validation rules
