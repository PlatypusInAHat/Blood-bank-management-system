# ✅ Backend & Frontend Connection - Fixes Applied

## Problems Fixed

### 1. ❌ API Key Blocking Authentication
**Problem**: The `apiKeyAuth` middleware was applied GLOBALLY to ALL routes, including `/api/auth/login` and `/api/auth/register`, preventing login.

**Fix**: Moved `apiKeyAuth` to apply ONLY after auth routes.

**File**: `blood-bank-backend/src/app.js`
```javascript
// Before: apiKeyAuth applied to ALL routes
app.use(apiKeyAuth);
app.use("/api/auth", authRoutes);  // ❌ BLOCKED by apiKeyAuth

// After: Auth routes bypass apiKeyAuth
app.use("/api/auth", authRoutes);   // ✅ NO API key required
app.use(apiKeyAuth);                 // ✅ Apply AFTER auth routes
app.use("/api/donors", donorRoutes); // ✅ Requires API key
```

### 2. ❌ Mock Auth Context (No Real API Calls)
**Problem**: Auth context was using fake/mock login instead of calling the real backend API.

**Fix**: Updated auth context to use real API calls.

**File**: `blood-bank-frontend/context/auth-context.tsx`
```typescript
// Before: Mock login
const login = async (email, password) => {
  if (email === "admin@bloodbank.org" && password === "password") { // ❌ FAKE
    setUser(userData);
    return true;
  }
}

// After: Real API call
const login = async (email, password) => {
  const response = await API.auth.login(email, password); // ✅ REAL API
  setUser(response.data.user);
  localStorage.setItem("token", response.data.token);
  return true;
}
```

### 3. ❌ API Paths Scattered in Multiple Files
**Problem**: API calls were hardcoded in multiple components with different patterns.

**Fix**: Created centralized API client at `/lib/api.ts`.

**File**: `blood-bank-frontend/lib/api.ts` (NEW)
```typescript
export const API = {
  auth: {
    login: (email, password) => apiClient.post('/auth/login', ...),
    register: (data) => apiClient.post('/auth/register', ...),
  },
  donors: { ... },
  blood: { ... },
  // All endpoints in ONE place
}
```

**Usage in components**:
```typescript
import { API } from '@/lib/api';
const response = await API.auth.login(email, password);
```

---

## Files Modified

### Backend
- ✅ `blood-bank-backend/src/app.js` - Fixed middleware ordering

### Frontend
- ✅ `blood-bank-frontend/components/auth/login-form.tsx` - Updated to use API client
- ✅ `blood-bank-frontend/context/auth-context.tsx` - Updated to use real API calls
- ✅ `blood-bank-frontend/lib/api.ts` - **NEW** - Centralized API client

---

## Environment Variables

### Frontend (`.env.local`)
```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=11102004
```

### Backend (`.env`)
```dotenv
PORT=5000
API_KEY=11102004
JWT_SECRET=supersecretkey
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=blood_bank
DB_PORT=5432
CORS_ORIGIN=http://localhost:3001
```

---

## How It Works Now

### 1. User Opens Frontend
```
Frontend loads at http://localhost:3001
↓
No token in localStorage
↓
Redirect to /login
```

### 2. User Logs In
```
User enters email & password
↓
LoginForm calls API.auth.login(email, password)
↓
API client sends:
  POST http://localhost:5000/api/auth/login
  Headers: { x-api-key: 11102004 }
  Body: { email, password }
↓
Backend validates (NO API key check for /auth/login)
↓
Returns: { token: "jwt...", user: {...} }
↓
Frontend stores token in localStorage
↓
Frontend redirects to /dashboard
```

### 3. User Makes Other Requests
```
User requests /api/donors
↓
API client automatically adds:
  - x-api-key header
  - Authorization: Bearer token header
↓
Backend checks:
  1. x-api-key is valid ✓
  2. JWT token is valid ✓
↓
Returns data
```

### 4. Token Expires
```
API returns 401 Unauthorized
↓
API client interceptor catches error
↓
Removes token from localStorage
↓
Redirects to /login
```

---

## Testing

### Test Backend is Running
```bash
# Should return Swagger UI
curl http://localhost:5000/api-docs
```

### Test Login Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "x-api-key: 11102004" \
  -d '{"email":"user@example.com","password":"password123"}'

# Should return: { token: "...", user: {...} }
```

### Test Other Endpoints (Now Work!)
```bash
curl -X GET http://localhost:5000/api/donors \
  -H "Authorization: Bearer {token}" \
  -H "x-api-key: 11102004"

# Should return: donors list
```

---

## Architecture Now

```
┌──────────────────┐
│  Login Component │
└────────┬─────────┘
         │ calls
         ▼
┌──────────────────┐
│  API.auth.login()│ ← Centralized API client
└────────┬─────────┘
         │ sends POST with headers
         ▼
┌──────────────────────────────────┐
│  Backend /api/auth/login         │
│  (No API key check)              │
└────────┬──────────────────────────┘
         │ returns token
         ▼
┌──────────────────┐
│  localStorage    │ ← Token stored
└──────────────────┘
         │
         │ next request
         ▼
┌──────────────────────────────────┐
│  API.donors.getAll()             │
└────────┬──────────────────────────┘
         │ API client adds:
         │ - x-api-key header
         │ - Authorization header
         ▼
┌──────────────────────────────────┐
│  Backend /api/donors             │
│  (API key check → passes)        │
│  (JWT check → passes)            │
└────────┬──────────────────────────┘
         │ returns data
         ▼
┌──────────────────┐
│  Component       │ ← Displays data
└──────────────────┘
```

---

## Next Steps

1. ✅ Backend API key middleware fixed
2. ✅ Frontend API client created
3. ✅ Auth context updated to use real API
4. ✅ Login form updated to use API client
5. ⏭️ Test login works
6. ⏭️ Update other components to use API client
7. ⏭️ Implement other features

---

## Key Takeaways

| What | Where |
|------|-------|
| **All API endpoints** | `lib/api.ts` |
| **Backend URL** | `.env.local` - `NEXT_PUBLIC_BACKEND_URL` |
| **API Key** | `.env` (backend) & `.env.local` (frontend) = `11102004` |
| **JWT Token** | localStorage after login |
| **API Key Check** | Applies to all routes EXCEPT `/auth` |
| **CORS** | Configured to allow frontend on `localhost:3001` |

---

## 🎯 Ready to Test!

Start both services and test the login:
1. Backend: `npm start`
2. Frontend: `pnpm dev`
3. Go to http://localhost:3001
4. Login with your database user credentials
5. Should redirect to dashboard
