#!/bin/bash

# Tenant Settings API Test Script
# This script tests the full CRUD operations for tenant settings

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
API_BASE_URL="${API_BASE_URL:-https://api.obsolio.com//api/v1}"
AUTH_TOKEN="${AUTH_TOKEN:-your-auth-token-here}"
TENANT_ID="${TENANT_ID:-your-tenant-id-here}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Tenant Settings API Test Suite${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "API Base URL: ${YELLOW}${API_BASE_URL}${NC}"
echo -e "Tenant ID: ${YELLOW}${TENANT_ID}${NC}"
echo ""

# Function to print test header
print_test() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}TEST: $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to print info
print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if required tools are installed
command -v curl >/dev/null 2>&1 || {
    print_error "curl is required but not installed. Aborting."
    exit 1
}

command -v jq >/dev/null 2>&1 || {
    print_error "jq is required but not installed. Please install jq for JSON processing."
    exit 1
}

# Test 1: GET Tenant Settings (READ)
print_test "1. GET Tenant Settings (READ Operation)"
echo "Endpoint: GET ${API_BASE_URL}/tenants/${TENANT_ID}/settings"
echo ""

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X GET \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -H "X-Tenant-ID: ${TENANT_ID}" \
    -H "Content-Type: application/json" \
    "${API_BASE_URL}/tenants/${TENANT_ID}/settings")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_success "GET Request Successful (HTTP 200)"
    echo ""
    echo "Response Body:"
    echo "$BODY" | jq '.'

    # Save response for update test
    echo "$BODY" > /tmp/tenant_settings_response.json
elif [ "$HTTP_STATUS" -eq 404 ]; then
    print_error "Tenant settings not found (HTTP 404)"
    echo "$BODY" | jq '.'
elif [ "$HTTP_STATUS" -eq 401 ]; then
    print_error "Unauthorized (HTTP 401) - Check your auth token"
    echo "$BODY" | jq '.'
else
    print_error "Request failed with HTTP status: $HTTP_STATUS"
    echo "$BODY"
fi

# Test 2: PUT Tenant Settings (UPDATE)
print_test "2. PUT Tenant Settings (UPDATE Operation)"
echo "Endpoint: PUT ${API_BASE_URL}/tenants/${TENANT_ID}/settings"
echo ""

# Prepare test payload
TEST_PAYLOAD=$(cat <<'EOF'
{
  "tenantInfo": {
    "name": "Test Corporation",
    "legalName": "Test Corporation Inc.",
    "industry": "Technology",
    "companySize": "50-200",
    "taxId": "US-987654321",
    "registrationNumber": "REG-TEST-12345",
    "website": "https://www.test.com",
    "linkedIn": "https://linkedin.com/company/test",
    "foundedYear": "2020",
    "description": "Test organization for API testing",
    "domain": "test.aasim.ai",
    "primaryPhone": "+1 (555) 999-9999",
    "secondaryPhone": "+1 (555) 999-9998",
    "supportPhone": "+1 (555) 999-9997",
    "fax": "+1 (555) 999-9996",
    "primaryEmail": "test@test.com",
    "supportEmail": "support@test.com",
    "billingEmail": "billing@test.com",
    "salesEmail": "sales@test.com",
    "adminEmail": "admin@test.com",
    "streetAddress": "999 Test Street",
    "addressLine2": "Suite 999",
    "city": "Test City",
    "stateProvince": "California",
    "postalCode": "99999",
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
    "timeFormat": "12h"
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
EOF
)

echo "Request Payload:"
echo "$TEST_PAYLOAD" | jq '.'
echo ""

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X PUT \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -H "X-Tenant-ID: ${TENANT_ID}" \
    -H "Content-Type: application/json" \
    -d "$TEST_PAYLOAD" \
    "${API_BASE_URL}/tenants/${TENANT_ID}/settings")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_success "PUT Request Successful (HTTP 200)"
    echo ""
    echo "Response Body:"
    echo "$BODY" | jq '.'
elif [ "$HTTP_STATUS" -eq 400 ]; then
    print_error "Bad Request (HTTP 400) - Validation errors"
    echo "$BODY" | jq '.'
elif [ "$HTTP_STATUS" -eq 401 ]; then
    print_error "Unauthorized (HTTP 401) - Check your auth token"
    echo "$BODY" | jq '.'
elif [ "$HTTP_STATUS" -eq 403 ]; then
    print_error "Forbidden (HTTP 403) - Insufficient permissions"
    echo "$BODY" | jq '.'
else
    print_error "Request failed with HTTP status: $HTTP_STATUS"
    echo "$BODY"
fi

# Test 3: Verify Update (READ after UPDATE)
print_test "3. Verify Update - GET After PUT"
echo "Endpoint: GET ${API_BASE_URL}/tenants/${TENANT_ID}/settings"
echo ""

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X GET \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -H "X-Tenant-ID: ${TENANT_ID}" \
    -H "Content-Type: application/json" \
    "${API_BASE_URL}/tenants/${TENANT_ID}/settings")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_success "Verification GET Request Successful (HTTP 200)"
    echo ""

    # Check if update was persisted
    UPDATED_NAME=$(echo "$BODY" | jq -r '.data.tenantInfo.name')
    if [ "$UPDATED_NAME" = "Test Corporation" ]; then
        print_success "Update verified: Organization name was successfully updated to 'Test Corporation'"
    else
        print_error "Update verification failed: Expected 'Test Corporation', got '$UPDATED_NAME'"
    fi

    echo ""
    echo "Current Settings:"
    echo "$BODY" | jq '.'
else
    print_error "Verification failed with HTTP status: $HTTP_STATUS"
    echo "$BODY"
fi

# Test 4: Test Validation (Invalid Data)
print_test "4. Test Validation - Invalid Data"
echo "Endpoint: PUT ${API_BASE_URL}/tenants/${TENANT_ID}/settings"
echo ""

INVALID_PAYLOAD=$(cat <<'EOF'
{
  "tenantInfo": {
    "name": "",
    "primaryEmail": "invalid-email",
    "primaryPhone": "invalid-phone"
  },
  "settings": {
    "dataRetention": -10
  }
}
EOF
)

echo "Invalid Request Payload:"
echo "$INVALID_PAYLOAD" | jq '.'
echo ""

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X PUT \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -H "X-Tenant-ID: ${TENANT_ID}" \
    -H "Content-Type: application/json" \
    -d "$INVALID_PAYLOAD" \
    "${API_BASE_URL}/tenants/${TENANT_ID}/settings")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')

if [ "$HTTP_STATUS" -eq 400 ]; then
    print_success "Validation working correctly - Rejected invalid data (HTTP 400)"
    echo ""
    echo "Validation Errors:"
    echo "$BODY" | jq '.'
else
    print_error "Expected HTTP 400 for invalid data, got HTTP $HTTP_STATUS"
    echo "$BODY"
fi

# Summary
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Test Suite Completed${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

print_info "Summary:"
echo "- GET (READ) tenant settings"
echo "- PUT (UPDATE) tenant settings"
echo "- Verify updates persisted"
echo "- Test validation with invalid data"
echo ""
print_info "To run this test script:"
echo "1. Set your environment variables:"
echo "   export AUTH_TOKEN=\"your-token-here\""
echo "   export TENANT_ID=\"your-tenant-id\""
echo "2. Make the script executable: chmod +x test_tenant_settings_api.sh"
echo "3. Run the script: ./test_tenant_settings_api.sh"
echo ""
print_info "For custom API URL:"
echo "   export API_BASE_URL=\"http://your-api-url/api/v1\""
