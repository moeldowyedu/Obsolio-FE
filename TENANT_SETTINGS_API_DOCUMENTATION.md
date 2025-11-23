# Tenant Settings API Documentation

## Overview
This document provides comprehensive information about the Tenant Settings form fields and API endpoints used in the TenantSettingsPage.

## API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints

#### 1. Get Tenant Settings
```http
GET /tenants/{tenantId}/settings
```

**Headers:**
- `Authorization: Bearer {token}`
- `X-Tenant-ID: {tenantId}`

**Response:**
```json
{
  "success": true,
  "data": {
    "tenantInfo": { ... },
    "settings": { ... }
  }
}
```

#### 2. Update Tenant Settings
```http
PUT /tenants/{tenantId}/settings
```

**Headers:**
- `Authorization: Bearer {token}`
- `X-Tenant-ID: {tenantId}`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "tenantInfo": { ... },
  "settings": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": { ... }
}
```

## Form Fields Structure

### 1. Tenant Information (`tenantInfo`)

#### Organization Details
| Field Name | Type | Required | Description | Example |
|------------|------|----------|-------------|---------|
| `name` | string | Yes | Organization display name | "Acme Corporation" |
| `logo` | file | No | Organization logo file | File object |
| `logoPreview` | string | No | Logo preview URL | "https://..." |
| `legalName` | string | No | Legal business name | "Acme Corporation Inc." |
| `industry` | string | Yes | Industry category | "Technology" |
| `companySize` | string | No | Company size range | "50-200" |
| `taxId` | string | No | Tax ID or EIN | "US-123456789" |
| `registrationNumber` | string | No | Business registration number | "REG-2024-12345" |
| `website` | string (url) | No | Company website URL | "https://www.acme.com" |
| `linkedIn` | string (url) | No | LinkedIn profile URL | "https://linkedin.com/company/acme" |
| `foundedYear` | string | No | Year company was founded | "2010" |
| `description` | string (textarea) | No | Company description | "Leading provider..." |
| `domain` | string | No | Custom subdomain | "acme.aasim.ai" |

#### Contact Information
| Field Name | Type | Required | Description | Example |
|------------|------|----------|-------------|---------|
| `primaryPhone` | string (tel) | Yes | Main contact phone | "+1 (555) 123-4567" |
| `secondaryPhone` | string (tel) | No | Alternative phone | "+1 (555) 123-4568" |
| `supportPhone` | string (tel) | No | Support line | "+1 (555) 123-4569" |
| `fax` | string (tel) | No | Fax number | "+1 (555) 123-4570" |
| `primaryEmail` | string (email) | Yes | Main contact email | "contact@acme.com" |
| `supportEmail` | string (email) | No | Support email | "support@acme.com" |
| `billingEmail` | string (email) | No | Billing email | "billing@acme.com" |
| `salesEmail` | string (email) | No | Sales email | "sales@acme.com" |
| `adminEmail` | string (email) | No | Admin email | "admin@acme.com" |

#### Business Address
| Field Name | Type | Required | Description | Example |
|------------|------|----------|-------------|---------|
| `streetAddress` | string | Yes | Street address | "123 Tech Avenue" |
| `addressLine2` | string | No | Additional address info | "Suite 100" |
| `city` | string | Yes | City | "San Francisco" |
| `stateProvince` | string | Yes | State or province | "California" |
| `postalCode` | string | Yes | Postal/ZIP code | "94102" |
| `country` | string | Yes | Country | "United States" |

#### Billing Address (if different)
| Field Name | Type | Required | Description | Example |
|------------|------|----------|-------------|---------|
| `useSameAddress` | boolean | No | Use same as business address | true |
| `billingStreetAddress` | string | No | Billing street address | "456 Billing Ave" |
| `billingAddressLine2` | string | No | Additional billing address | "Floor 2" |
| `billingCity` | string | No | Billing city | "New York" |
| `billingStateProvince` | string | No | Billing state/province | "New York" |
| `billingPostalCode` | string | No | Billing postal code | "10001" |
| `billingCountry` | string | No | Billing country | "United States" |

#### Regional Settings
| Field Name | Type | Required | Description | Example | Options |
|------------|------|----------|-------------|---------|---------|
| `timezone` | string | Yes | Time zone | "America/Los_Angeles" | See list below |
| `language` | string | Yes | Language code | "en" | en, es, fr, de, ja, zh, ar, pt |
| `currency` | string | Yes | Currency code | "USD" | USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY |
| `dateFormat` | string | No | Date format | "MM/DD/YYYY" | MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, DD.MM.YYYY |
| `timeFormat` | string | No | Time format | "12h" | 12h, 24h |

#### System Information (Read-only)
| Field Name | Type | Description | Example |
|------------|------|-------------|---------|
| `plan` | string | Subscription plan | "Enterprise" |
| `maxUsers` | number | Maximum users allowed | 100 |
| `currentUsers` | number | Current active users | 47 |
| `storageLimit` | string | Storage limit | "1TB" |
| `storageUsed` | string | Storage currently used | "450GB" |
| `planStartDate` | string (date) | Plan start date | "2024-01-01" |
| `planRenewalDate` | string (date) | Plan renewal date | "2025-01-01" |

### 2. Security & Compliance Settings (`settings`)

| Field Name | Type | Description | Default |
|------------|------|-------------|---------|
| `enableSSO` | boolean | Enable Single Sign-On | true |
| `enableMFA` | boolean | Enable Multi-Factor Authentication | true |
| `enableAuditLogs` | boolean | Enable audit logging | true |
| `enableAPIAccess` | boolean | Enable API access | true |
| `dataRetention` | number | Data retention period (days) | 90 |
| `autoBackup` | boolean | Enable automatic backups | true |

### 3. Agent Permissions (`settings`)

| Field Name | Type | Description | Default |
|------------|------|-------------|---------|
| `allowPublicAgents` | boolean | Allow public marketplace agents | true |
| `allowPrivateAgents` | boolean | Allow custom private agents | true |

## Available Options

### Industries
```javascript
['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
 'Consulting', 'Real Estate', 'E-commerce', 'Transportation', 'Energy',
 'Telecommunications', 'Other']
```

### Company Sizes
```javascript
['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+']
```

### Countries
```javascript
['United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Australia',
 'Japan', 'Singapore', 'United Arab Emirates', 'India', 'China', 'Brazil',
 'Mexico', 'Netherlands', 'Switzerland', 'Other']
```

### Timezones
```javascript
['America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam',
 'Asia/Tokyo', 'Asia/Singapore', 'Asia/Dubai', 'Australia/Sydney']
```

### Currencies
```javascript
[
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
]
```

## Complete Payload Example

```json
{
  "tenantInfo": {
    "name": "Acme Corporation",
    "logo": null,
    "logoPreview": "https://ui-avatars.com/api/?name=Acme+Corporation&size=200&background=4F46E5&color=fff",
    "legalName": "Acme Corporation Inc.",
    "industry": "Technology",
    "companySize": "50-200",
    "taxId": "US-123456789",
    "registrationNumber": "REG-2024-12345",
    "website": "https://www.acme.com",
    "linkedIn": "https://linkedin.com/company/acme",
    "foundedYear": "2010",
    "description": "Leading provider of AI-powered business solutions",
    "domain": "acme.aasim.ai",
    "primaryPhone": "+1 (555) 123-4567",
    "secondaryPhone": "+1 (555) 123-4568",
    "supportPhone": "+1 (555) 123-4569",
    "fax": "+1 (555) 123-4570",
    "primaryEmail": "contact@acme.com",
    "supportEmail": "support@acme.com",
    "billingEmail": "billing@acme.com",
    "salesEmail": "sales@acme.com",
    "adminEmail": "admin@acme.com",
    "streetAddress": "123 Tech Avenue",
    "addressLine2": "Suite 100",
    "city": "San Francisco",
    "stateProvince": "California",
    "postalCode": "94102",
    "country": "United States",
    "useSameAddress": true,
    "billingStreetAddress": "",
    "billingAddressLine2": "",
    "billingCity": "",
    "billingStateProvince": "",
    "billingPostalCode": "",
    "billingCountry": "United States",
    "timezone": "America/Los_Angeles",
    "language": "en",
    "currency": "USD",
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "12h",
    "plan": "Enterprise",
    "maxUsers": 100,
    "currentUsers": 47,
    "storageLimit": "1TB",
    "storageUsed": "450GB",
    "planStartDate": "2024-01-01",
    "planRenewalDate": "2025-01-01"
  },
  "settings": {
    "enableSSO": true,
    "enableMFA": true,
    "enableAuditLogs": true,
    "enableAPIAccess": true,
    "dataRetention": 90,
    "allowPublicAgents": true,
    "allowPrivateAgents": true,
    "autoBackup": true,
    "notificationEmail": true,
    "notificationSlack": false
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "name": ["Organization name is required"],
    "primaryEmail": ["Invalid email format"]
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Tenant not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Testing with cURL

### Get Tenant Settings
```bash
curl -X GET \
  http://localhost:8000/api/v1/tenants/{tenantId}/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Tenant-ID: YOUR_TENANT_ID"
```

### Update Tenant Settings
```bash
curl -X PUT \
  http://localhost:8000/api/v1/tenants/{tenantId}/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Tenant-ID: YOUR_TENANT_ID" \
  -H "Content-Type: application/json" \
  -d @tenant_settings.json
```
