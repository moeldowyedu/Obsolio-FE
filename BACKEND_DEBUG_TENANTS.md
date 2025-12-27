# Backend Debugging Guide - API Returning Empty Data

## 🚨 Critical Issue: Data Exists but APIs Return Empty Arrays

**Affected Endpoints:**
1. `GET /api/v1/tenants` - Returns `{data: []}` but tenants exist
2. `GET /api/v1/admin/agents` - Possibly causing page "flashing" issue

**Status:** Database tables contain data, but APIs return empty arrays

---

## 📊 Current Situation

### Frontend Evidence
- **API Call:** `GET https://api.obsolio.com/api/v1/tenants`
- **Response Status:** `200 OK`
- **Response Body:** `{data: []}`
- **Frontend Code:** Working correctly (`src/pages/Admin/TenantsManagement.jsx:38`)

### User Statement
> "لا جدول ال tenants يحتوى على بيانات بالفعل ولا حاجة لملئه"
>
> Translation: "The tenants table already contains data and doesn't need to be filled"

### Conclusion
This is a **backend query or filtering issue**, NOT a frontend or database issue.

---

## 🔍 Backend Investigation Steps

### Step 1: Check Backend Controller for `/api/v1/tenants`

Find the controller handling the `GET /api/v1/tenants` endpoint (likely `TenantsController.php` or similar).

**What to check:**
1. Is there a WHERE clause filtering out all data?
2. Is there tenant scoping applied incorrectly?
3. Are there soft deletes being applied?
4. Is user context limiting data visibility?

**Example problematic code patterns:**
```php
// BAD - This would filter out all data for console subdomain users
public function index(Request $request)
{
    $tenants = Tenant::where('owner_id', auth()->id())->get(); // ❌ Only shows user's own tenants
    return response()->json(['data' => $tenants]);
}

// BAD - Console admin might not have tenant_id set
public function index(Request $request)
{
    $tenants = Tenant::where('id', auth()->user()->current_tenant_id)->get(); // ❌ Filters by current tenant
    return response()->json(['data' => $tenants]);
}

// GOOD - Admin should see ALL tenants
public function index(Request $request)
{
    // Check if user is system admin
    if (!auth()->user()->is_system_admin) {
        abort(403, 'Unauthorized');
    }

    $tenants = Tenant::query();

    // Apply filters if provided
    if ($request->has('type')) {
        $tenants->where('type', $request->type);
    }

    if ($request->has('status')) {
        $tenants->where('status', $request->status);
    }

    if ($request->has('search')) {
        $tenants->where('name', 'LIKE', "%{$request->search}%");
    }

    return response()->json([
        'success' => true,
        'data' => $tenants->paginate($request->per_page ?? 20)
    ]);
}
```

---

### Step 2: Check Global Scopes and Model Scopes

Check the `Tenant` model for global scopes that might filter data:

```php
// Check: app/Models/Tenant.php

class Tenant extends Model
{
    // ❌ BAD - Global scope might filter everything
    protected static function booted()
    {
        static::addGlobalScope('active', function (Builder $query) {
            $query->where('status', 'active'); // If all tenants have different status, returns empty
        });

        static::addGlobalScope('currentUser', function (Builder $query) {
            $query->where('owner_id', auth()->id()); // System admin has no owner_id
        });
    }
}
```

**Solution:** Remove global scopes or add check for system admin:
```php
protected static function booted()
{
    static::addGlobalScope('tenantScope', function (Builder $query) {
        // Skip scope for system admins
        if (auth()->check() && auth()->user()->is_system_admin) {
            return;
        }

        $query->where('owner_id', auth()->id());
    });
}
```

---

### Step 3: Check Middleware

Look for middleware that might filter tenant data:

```php
// Check: app/Http/Middleware/TenantScopeMiddleware.php or similar

// ❌ BAD - Middleware forcing tenant filtering even for admins
public function handle($request, Closure $next)
{
    // This applies tenant scoping to ALL queries
    Tenant::addGlobalScope('tenant', function ($query) {
        $query->where('id', session('current_tenant_id'));
    });

    return $next($request);
}

// ✅ GOOD - Skip for console subdomain
public function handle($request, Closure $next)
{
    // Skip tenant scoping for console.obsolio.com
    if ($request->getHost() === 'console.obsolio.com') {
        return $next($request);
    }

    // Apply tenant scoping only for tenant subdomains
    Tenant::addGlobalScope('tenant', function ($query) {
        $query->where('id', session('current_tenant_id'));
    });

    return $next($request);
}
```

---

### Step 4: Check Authentication Context

Verify the authenticated user has proper permissions:

**Add debug logging to backend:**
```php
public function index(Request $request)
{
    // Debug: Log user context
    \Log::info('Tenants API called', [
        'user_id' => auth()->id(),
        'user_email' => auth()->user()->email,
        'is_system_admin' => auth()->user()->is_system_admin,
        'current_tenant_id' => auth()->user()->current_tenant_id ?? 'null',
        'subdomain' => $request->getHost(),
    ]);

    $query = Tenant::query();

    // Debug: Log query before filters
    \Log::info('Query before filters', [
        'sql' => $query->toSql(),
        'count' => Tenant::count(), // Direct count without scopes
    ]);

    // Apply filters...

    $tenants = $query->get();

    // Debug: Log results
    \Log::info('Tenants query results', [
        'count' => $tenants->count(),
        'first_tenant' => $tenants->first()?->name ?? 'none',
    ]);

    return response()->json([
        'success' => true,
        'data' => $tenants
    ]);
}
```

---

### Step 5: Direct Database Query Test

Run this directly in Laravel Tinker or database console:

```php
// Laravel Tinker
php artisan tinker

// Test 1: Direct database query (bypasses all scopes)
DB::table('tenants')->count();
// Expected: Should return number > 0

// Test 2: Model query with scopes
\App\Models\Tenant::count();
// If this returns 0 but Test 1 returns > 0, there's a global scope issue

// Test 3: Get all tenants without scopes
\App\Models\Tenant::withoutGlobalScopes()->get();
// This should return all tenants

// Test 4: Check what scopes are applied
\App\Models\Tenant::query()->toSql();
// Shows the SQL with all scopes applied
```

---

### Step 6: Check Route Middleware

Verify the route isn't applying incorrect middleware:

```php
// Check: routes/api.php or routes/web.php

// ❌ BAD - Tenant middleware on admin endpoint
Route::middleware(['auth:sanctum', 'tenant.scope'])->group(function () {
    Route::get('/api/v1/tenants', [TenantsController::class, 'index']);
});

// ✅ GOOD - Admin middleware without tenant scoping
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/api/v1/tenants', [TenantsController::class, 'index']);
});

// ✅ EVEN BETTER - Separate admin routes
Route::prefix('api/v1')->middleware(['auth:sanctum'])->group(function () {
    // Admin routes (no tenant scoping)
    Route::middleware('system.admin')->group(function () {
        Route::get('/tenants', [Admin\TenantsController::class, 'index']);
    });
});
```

---

## 🔧 Quick Diagnostic Commands

### Database Query (SQL)
```sql
-- Check if tenants exist
SELECT COUNT(*) FROM tenants;

-- Get sample tenants
SELECT id, name, slug, type, status, created_at FROM tenants LIMIT 5;

-- Check for soft deletes
SELECT COUNT(*) FROM tenants WHERE deleted_at IS NULL;
```

### Laravel Artisan Commands
```bash
# Check routes
php artisan route:list | grep tenants

# Test in tinker
php artisan tinker
>>> \App\Models\Tenant::count()
>>> \App\Models\Tenant::withoutGlobalScopes()->count()
>>> DB::table('tenants')->count()
```

---

## 🎯 Most Likely Causes

Based on the symptoms, the most likely issues are:

### 1. **Global Scope Filtering** (70% probability)
The Tenant model has a global scope that filters tenants based on user context, and system admins are being incorrectly filtered.

**Fix:** Add system admin check in global scopes.

### 2. **Tenant Middleware Applied Incorrectly** (20% probability)
The `/api/v1/tenants` route has tenant scoping middleware that shouldn't apply to console subdomain.

**Fix:** Skip tenant middleware for console.obsolio.com.

### 3. **Controller Query Filtering** (10% probability)
The controller itself has WHERE clauses that filter out all data for system admins.

**Fix:** Update controller to allow system admins to see all tenants.

---

## ✅ Verification Steps After Fix

1. **Test the API endpoint:**
   ```bash
   curl https://api.obsolio.com/api/v1/tenants \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -v
   ```

2. **Expected response:**
   ```json
   {
     "success": true,
     "data": [
       {
         "id": "uuid",
         "name": "Tenant Name",
         "slug": "tenant-slug",
         "type": "organization",
         "status": "active",
         ...
       }
     ]
   }
   ```

3. **Frontend test:**
   - Visit https://console.obsolio.com/tenants
   - Should show list of tenants, not "No tenants found"

---

## 📋 Backend Code Checklist

- [ ] Controller: Check `TenantsController` for filtering logic
- [ ] Model: Check `Tenant.php` for global scopes
- [ ] Middleware: Check route middleware for tenant scoping
- [ ] Routes: Verify `/api/v1/tenants` route configuration
- [ ] Database: Confirm data exists with direct SQL query
- [ ] Authentication: Verify system admin status is set correctly
- [ ] Logging: Add debug logs to track query execution

---

## 🚀 Recommended Immediate Action

1. **Add debug logging** to the tenants endpoint
2. **Check Laravel logs** at `storage/logs/laravel.log`
3. **Run Tinker tests** to isolate the issue
4. **Review global scopes** in Tenant model
5. **Check middleware stack** for the route

---

---

## 📄 Similar Issue: Agents Page "Flashing"

**Symptom:** https://console.obsolio.com/agents appears then disappears

**Root Cause:** Most likely the same issue - `GET /api/v1/admin/agents` returning empty data.

**Frontend Code Status:** ✅ Verified working correctly
- Handles empty arrays properly
- Shows "No agents found" message
- No JavaScript errors expected

**Investigation:** Apply same debugging steps above to:
- `GET /api/v1/admin/agents` endpoint
- `Agent` model global scopes
- Agent controller filtering logic

**Specific checks:**
```php
// Check if Agent model has global scopes
class Agent extends Model
{
    protected static function booted()
    {
        // Check for any global scopes that filter data
        static::addGlobalScope('active', function (Builder $query) {
            // This might filter everything if incorrectly applied
        });
    }
}

// Check AgentController
public function index(Request $request)
{
    // Should allow system admins to see ALL agents
    if (!auth()->user()->is_system_admin) {
        abort(403);
    }

    return Agent::withoutGlobalScopes()
        ->with('category')
        ->paginate($request->per_page ?? 20);
}
```

---

**Created:** 2024-12-27
**Issues:**
- Tenants API returns empty array despite database having data
- Agents API possibly returning empty data causing page flash
**Priority:** High - Blocking production deployment
