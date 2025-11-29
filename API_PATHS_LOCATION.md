# 📍 API Paths Location - Quick Reference

## Where Frontend API Paths Are Defined

### ✅ MAIN Location: `blood-bank-frontend/lib/api.ts`

All API endpoints are centralized here. This is where you:
- Add new endpoints
- Change API configuration
- Update headers
- Handle interceptors

```
blood-bank-frontend/
├── lib/
│   ├── api.ts         ← ⭐ ALL API PATHS HERE
│   └── utils.ts
├── .env.local         ← Base URL & API Key
├── components/
│   └── auth/
│       └── login-form.tsx  ← Uses: import { API } from '@/lib/api'
├── context/
│   └── auth-context.tsx    ← Uses: import { API } from '@/lib/api'
└── ...
```

### Quick Map

```typescript
// lib/api.ts
export const API = {
  auth: {
    login: POST /auth/login
    register: POST /auth/register
    logout: POST /auth/logout
  },
  donors: {
    getAll: GET /donors
    getById: GET /donors/:id
    create: POST /donors
    update: PUT /donors/:id
    delete: DELETE /donors/:id
    search: GET /donors/search
  },
  blood: {
    getAll: GET /blood
    getById: GET /blood/:id
    create: POST /blood
    update: PUT /blood/:id
    delete: DELETE /blood/:id
  },
  requests: {
    getAll: GET /requests
    getById: GET /requests/:id
    create: POST /requests
    update: PUT /requests/:id
    delete: DELETE /requests/:id
  },
  tests: {
    getAll: GET /tests
    getById: GET /tests/:id
    create: POST /tests
    update: PUT /tests/:id
  },
  users: {
    getAll: GET /users
    getById: GET /users/:id
    create: POST /users
    update: PUT /users/:id
    delete: DELETE /users/:id
  },
  reports: {
    blood: GET /reports/blood
    donations: GET /reports/donations
    requests: GET /reports/requests
    donors: GET /reports/donors
    trends: GET /reports/trends
  },
}
```

---

## How to Use in Components

### Example 1: Login Form
```typescript
// components/auth/login-form.tsx

import { API } from '@/lib/api';  // ← Import from here!

async function onSubmit(data) {
  const response = await API.auth.login(data.email, data.password);
  // response.data.token
  // response.data.user
}
```

### Example 2: Get Donors
```typescript
// app/donors/page.tsx

import { API } from '@/lib/api';  // ← Import from here!

export default function DonorsPage() {
  useEffect(() => {
    const donors = await API.donors.getAll();
    // Use donors
  }, []);
}
```

### Example 3: Search Donors
```typescript
// components/donors/search.tsx

import { API } from '@/lib/api';  // ← Import from here!

const results = await API.donors.search({ bloodType: 'O+' });
```

---

## Backend API Paths

```
blood-bank-backend/
├── src/
│   ├── app.js              ← Route mounting (base URLs)
│   ├── routes/
│   │   ├── authRoutes.js        → /api/auth/*
│   │   ├── donorRoutes.js       → /api/donors/*
│   │   ├── bloodInventoryRoutes.js → /api/blood/*
│   │   ├── bloodRequestRoutes.js → /api/requests/*
│   │   ├── userRoutes.js        → /api/users/*
│   │   ├── reportRoutes.js      → /api/reports/*
│   │   ├── BloodTestRoutes.js   → /api/tests/*
│   │   └── index.js
│   ├── controllers/        ← Request handlers
│   ├── models/             ← Database models
│   ├── middleware/
│   │   ├── securityMiddleware.js ← API key check
│   │   ├── authMiddleware.js     ← JWT check
│   │   └── errorHandler.js
│   └── services/           ← Business logic
├── .env                    ← Config (PORT, DB, API_KEY)
└── server.js              ← Entry point
```

---

## Configuration Files

### Frontend Configuration
**File**: `.env.local`
```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=11102004
```

Used in `lib/api.ts`:
```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '11102004',
  },
});
```

### Backend Configuration
**File**: `.env`
```dotenv
PORT=5000
API_KEY=11102004
CORS_ORIGIN=http://localhost:3001
```

---

## Request Headers

### Every API Call Automatically Includes

```
x-api-key: 11102004
Content-Type: application/json
Authorization: Bearer {jwt_token} (after login)
```

Handled by `lib/api.ts` interceptor:
```typescript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Flow Diagram

```
Component Code
    ↓
import { API } from '@/lib/api'
    ↓
API.auth.login(email, password)
    ↓
lib/api.ts
├─ Add headers (x-api-key, Authorization)
├─ Add base URL (http://localhost:5000/api)
└─ Send request
    ↓
http://localhost:5000/api/auth/login
(with headers)
    ↓
Backend
├─ Check x-api-key (skip for /auth)
├─ Validate credentials
└─ Return token
    ↓
Store in localStorage
    ↓
Save user context
```

---

## API Paths Quick Reference

### Authentication (No API Key Required)
- `POST /api/auth/login` - API.auth.login(email, password)
- `POST /api/auth/register` - API.auth.register(userData)
- `POST /api/auth/logout` - API.auth.logout()

### Donors (API Key Required)
- `GET /api/donors` - API.donors.getAll(params)
- `GET /api/donors/:id` - API.donors.getById(id)
- `POST /api/donors` - API.donors.create(data)
- `PUT /api/donors/:id` - API.donors.update(id, data)
- `DELETE /api/donors/:id` - API.donors.delete(id)
- `GET /api/donors/search` - API.donors.search(params)

### Blood Inventory (API Key Required)
- `GET /api/blood` - API.blood.getAll(params)
- `GET /api/blood/:id` - API.blood.getById(id)
- `POST /api/blood` - API.blood.create(data)
- `PUT /api/blood/:id` - API.blood.update(id, data)
- `DELETE /api/blood/:id` - API.blood.delete(id)

### Blood Requests (API Key Required)
- `GET /api/requests` - API.requests.getAll(params)
- `GET /api/requests/:id` - API.requests.getById(id)
- `POST /api/requests` - API.requests.create(data)
- `PUT /api/requests/:id` - API.requests.update(id, data)
- `DELETE /api/requests/:id` - API.requests.delete(id)

### Blood Tests (API Key Required)
- `GET /api/tests` - API.tests.getAll(params)
- `GET /api/tests/:id` - API.tests.getById(id)
- `POST /api/tests` - API.tests.create(data)
- `PUT /api/tests/:id` - API.tests.update(id, data)

### Users (API Key Required)
- `GET /api/users` - API.users.getAll(params)
- `GET /api/users/:id` - API.users.getById(id)
- `POST /api/users` - API.users.create(data)
- `PUT /api/users/:id` - API.users.update(id, data)
- `DELETE /api/users/:id` - API.users.delete(id)

### Reports (API Key Required)
- `GET /api/reports/blood` - API.reports.blood(params)
- `GET /api/reports/donations` - API.reports.donations(params)
- `GET /api/reports/requests` - API.reports.requests(params)
- `GET /api/reports/donors` - API.reports.donors(params)
- `GET /api/reports/trends` - API.reports.trends(params)

---

## Summary

| What | Where | Used Like |
|------|-------|-----------|
| All API paths | `lib/api.ts` | `API.auth.login()` |
| Backend URL | `.env.local` | `NEXT_PUBLIC_BACKEND_URL` |
| API Key | `.env` & `.env.local` | `x-api-key: 11102004` |
| Interceptors | `lib/api.ts` | Auto-add headers & token |
| Error handling | `lib/api.ts` | Auto-redirect on 401 |
| Components | `components/**/*.tsx` | Import and use API |

---

**Remember**: Everything is now centralized in `lib/api.ts`! 🎯
