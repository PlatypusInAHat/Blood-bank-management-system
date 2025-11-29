# 🔗 API Integration Points - Where API Paths Are Configured

## Frontend API Configuration

### 1. **API Client** (`/lib/api.ts`) - CENTRALIZED
**This is the main place where all API endpoints are configured!**

```typescript
// File: blood-bank-frontend/lib/api.ts

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '11102004',
  },
});

// All API endpoints are defined here:
export const API = {
  auth: {
    login: (email, password) => apiClient.post('/auth/login', ...),
    register: (data) => apiClient.post('/auth/register', ...),
    logout: () => apiClient.post('/auth/logout'),
  },
  donors: {
    getAll: () => apiClient.get('/donors', ...),
    create: (data) => apiClient.post('/donors', ...),
    // ... more endpoints
  },
  blood: { ... },
  requests: { ... },
  tests: { ... },
  users: { ... },
  reports: { ... },
}
```

**Usage in components:**
```typescript
import { API } from '@/lib/api';

// Call API
const response = await API.auth.login(email, password);
const donors = await API.donors.getAll();
```

### 2. **Environment Variables** (`.env.local`)

```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=11102004
```

- `NEXT_PUBLIC_BACKEND_URL` - Base URL for all API calls
- `NEXT_PUBLIC_API_KEY` - API key sent in `x-api-key` header

### 3. **Login Form** (`/components/auth/login-form.tsx`)

```typescript
import { API } from "@/lib/api";

async function onSubmit(data: LoginFormValues) {
  const response = await API.auth.login(data.email, data.password);
  localStorage.setItem("token", response.data.token);
  router.push("/dashboard");
}
```

### 4. **Auth Context** (`/context/auth-context.tsx`)

```typescript
import { API } from "@/lib/api";

const login = async (email: string, password: string) => {
  const response = await API.auth.login(email, password);
  setUser(response.data.user);
  localStorage.setItem("token", response.data.token);
  return true;
}
```

---

## Backend API Configuration

### 1. **Routes** (`/src/routes/`)

**Authentication Routes** (`/src/routes/authRoutes.js`):
```javascript
router.post("/login", login);      // POST /api/auth/login
router.post("/register", register); // POST /api/auth/register
```

**Other Routes** (`/src/routes/*Routes.js`):
```javascript
router.get("/", authenticate, getAllDonors);     // GET /api/donors
router.post("/", authenticate, createDonor);     // POST /api/donors
// ... more routes
```

### 2. **App Configuration** (`/src/app.js`)

```javascript
// No API key required for auth
app.use("/api/auth", authRoutes);

// API key required for other endpoints
app.use(apiKeyAuth);
app.use("/api/donors", donorRoutes);
app.use("/api/blood", bloodInventoryRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tests", bloodTestRoutes);
```

### 3. **Environment Variables** (`.env`)

```dotenv
PORT=5000
DB_HOST=localhost
DB_NAME=blood_bank_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=supersecretkey
API_KEY=11102004
CORS_ORIGIN=http://localhost:3001
```

### 4. **CORS Configuration** (`/src/app.js`)

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true,
}));
```

### 5. **API Key Middleware** (`/src/middleware/securityMiddleware.js`)

```javascript
const apiKeyAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') return next(); // Allow CORS preflight
  
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "API Key invalid" });
  }
  next();
};
```

---

## 🔑 Authentication Flow with API Keys

### Step 1: Login (No API Key Required)
```
Frontend POST /api/auth/login
├─ x-api-key: 11102004
├─ email: user@example.com
└─ password: password123

Backend Response:
{
  "token": "jwt_token_here",
  "user": { "id": 1, "name": "User", "role": "admin" }
}
```

### Step 2: Subsequent Requests (API Key + JWT Required)
```
Frontend GET /api/donors
├─ x-api-key: 11102004
└─ Authorization: Bearer jwt_token_here

Backend validates:
1. x-api-key matches process.env.API_KEY ✓
2. JWT token is valid ✓
3. Return data ✓
```

---

## 📋 Summary Table

| Component | File | What It Does |
|-----------|------|-------------|
| **API Client** | `lib/api.ts` | ✅ **MAIN** - All endpoints defined here |
| **Frontend Config** | `.env.local` | Backend URL & API key |
| **Login Form** | `components/auth/login-form.tsx` | Calls `API.auth.login()` |
| **Auth Context** | `context/auth-context.tsx` | Calls `API.auth.login()` |
| **Backend Routes** | `src/routes/*.js` | API endpoint definitions |
| **Backend Config** | `.env` | DB, JWT, API key, port |
| **App Setup** | `src/app.js` | Route mounting & middleware |
| **Middleware** | `src/middleware/` | Auth, API key, CORS |

---

## 🎯 Where to Add New API Endpoints

### 1. Add Backend Endpoint

**File**: `src/routes/donorRoutes.js`
```javascript
router.get("/search", authenticate, searchDonors);
```

### 2. Add Frontend API Call

**File**: `lib/api.ts`
```javascript
donors: {
  search: (params) => apiClient.get('/donors/search', { params }),
}
```

### 3. Use in Components

```typescript
import { API } from '@/lib/api';

const results = await API.donors.search({ bloodType: 'O+' });
```

---

## ✅ Verification Checklist

- [x] Frontend `.env.local` has correct `NEXT_PUBLIC_BACKEND_URL`
- [x] Backend `.env` has `API_KEY=11102004`
- [x] Frontend `.env.local` has `NEXT_PUBLIC_API_KEY=11102004`
- [x] API client in `lib/api.ts` is configured correctly
- [x] Auth routes don't require API key
- [x] Other routes require API key via middleware
- [x] CORS is properly configured
- [x] Login form uses `API.auth.login()`
- [x] Auth context uses `API.auth.login()`

---

## 🚀 Testing the Connection

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "x-api-key: 11102004" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Test Protected Endpoint
```bash
curl -X GET http://localhost:5000/api/donors \
  -H "Authorization: Bearer {jwt_token}" \
  -H "x-api-key: 11102004"
```

---

**All API paths in the frontend are now centralized in `/lib/api.ts`!**
Use `import { API } from '@/lib/api'` in all components.
