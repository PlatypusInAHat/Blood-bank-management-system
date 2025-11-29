# 🏗️ Technical Architecture - Blood Bank System

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    WEB BROWSER                              │
│              (Frontend Application)                         │
│         http://localhost:3001                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │ (CORS Enabled)
                     │
┌────────────────────▼────────────────────────────────────────┐
│              NEXT.JS FRONTEND                               │
│                                                             │
│  ├─ Authentication Pages (Login, Reset Password)          │
│  ├─ Dashboard (Metrics, Charts)                           │
│  ├─ Data Management (Donors, Inventory, Requests)         │
│  ├─ Reports & Analytics                                   │
│  └─ Components (Forms, Tables, UI Elements)               │
│                                                             │
│  API Client: Axios                                         │
│  State Management: React Context                          │
│  Styling: Tailwind CSS + Radix UI                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ REST API Calls
                     │ Base URL: http://localhost:5000
                     │ Headers: x-api-key, Authorization
                     │
┌────────────────────▼────────────────────────────────────────┐
│           EXPRESS.JS BACKEND API                            │
│        http://localhost:5000                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         SECURITY & MIDDLEWARE LAYER                 │  │
│  ├─ CORS (Allow frontend origin)                      │  │
│  ├─ Helmet (Security Headers)                         │  │
│  ├─ Rate Limiting                                      │  │
│  ├─ API Key Authentication                            │  │
│  ├─ IP Blocking                                        │  │
│  └─ Request Logging (Morgan)                          │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           API ROUTES & CONTROLLERS                  │  │
│  ├─ /api/auth           (Authentication)              │  │
│  ├─ /api/donors         (Donor Management)            │  │
│  ├─ /api/blood          (Blood Inventory)             │  │
│  ├─ /api/requests       (Blood Requests)              │  │
│  ├─ /api/users          (User Management)             │  │
│  ├─ /api/tests          (Blood Tests)                 │  │
│  ├─ /api/reports        (Reports & Analytics)         │  │
│  └─ /api-docs           (Swagger Documentation)       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           BUSINESS LOGIC LAYER                      │  │
│  ├─ Controllers (Request Handling)                    │  │
│  ├─ Services (Business Logic)                         │  │
│  ├─ Middleware (Auth, Roles, Error Handling)         │  │
│  └─ Email Service (Notifications)                    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         DATA ACCESS LAYER (ORM)                     │  │
│  ├─ Sequelize ORM                                     │  │
│  ├─ Database Models                                   │  │
│  ├─ Query Builder                                     │  │
│  └─ Relationships & Validations                       │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ SQL Queries
                     │ Connection Pool
                     │
┌────────────────────▼────────────────────────────────────────┐
│              POSTGRESQL DATABASE                            │
│                                                             │
│  ├─ Users Table                                            │
│  ├─ Donors Table                                           │
│  ├─ Blood Inventory Table                                  │
│  ├─ Blood Requests Table                                   │
│  ├─ Blood Tests Table                                      │
│  ├─ Hospitals Table                                        │
│  ├─ Blood Components Table                                 │
│  ├─ Donation Locations Table                               │
│  └─ Relationships & Indexes                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology Stack
```
Next.js 15.2.3          → Meta framework for React
React 19               → UI component library
TypeScript             → Type safety
Tailwind CSS          → Utility-first CSS framework
Radix UI              → Accessible component library
Axios                 → HTTP client
React Hook Form       → Form state management
date-fns              → Date utilities
next-themes           → Theme management
```

### Project Structure

```
frontend/
├── app/
│   ├── (auth)              # Protected auth routes
│   │   ├── layout.tsx       # Auth layout wrapper
│   │   ├── login/           # Login page
│   │   ├── forgot-password/ # Forgot password
│   │   └── reset-password/  # Reset password
│   │
│   ├── (dashboard)         # Protected dashboard routes
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── dashboard/       # Main dashboard
│   │   ├── donors/          # Donor management
│   │   ├── inventory/       # Blood inventory
│   │   ├── requests/        # Blood requests
│   │   ├── blood-products/  # Products management
│   │   ├── users/           # User management
│   │   └── reports/         # Reports & analytics
│   │
│   ├── page.tsx            # Root page (redirect)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
│
├── components/
│   ├── auth/               # Authentication forms
│   ├── dashboard/          # Dashboard widgets
│   ├── donors/             # Donor components
│   ├── inventory/          # Inventory components
│   ├── blood-products/     # Product components
│   ├── users/              # User components
│   ├── reports/            # Report components
│   ├── requests/           # Request components
│   ├── ui/                 # Radix UI wrappers
│   ├── layout/             # Header, Sidebar, Footer
│   └── theme-provider.tsx  # Theme provider
│
├── context/
│   └── auth-context.tsx    # Auth context & provider
│
├── hooks/
│   ├── use-mobile.tsx      # Mobile detection
│   └── use-toast.ts        # Toast notifications
│
├── lib/
│   └── utils.ts            # Utility functions
│
├── config/
│   └── nav.tsx             # Navigation configuration
│
├── public/                 # Static assets
└── styles/                 # Additional CSS files
```

### Data Flow

```
User Input (Form)
      ↓
Form Component (React Hook Form)
      ↓
Validation
      ↓
API Call (Axios)
      ↓
Store in State/Context
      ↓
Re-render Component
      ↓
Display Data to User
```

### Authentication Flow

```
Login Page
   ↓
User enters email/password
   ↓
Submit form
   ↓
POST /api/auth/login
   ↓
Backend validates credentials
   ↓
Returns JWT token
   ↓
Store token in localStorage
   ↓
Store user info in Auth Context
   ↓
Redirect to /dashboard
   ↓
Include token in Authorization header for all requests
```

---

## Backend Architecture

### Technology Stack
```
Node.js 16+           → Runtime
Express.js            → Web framework
Sequelize             → ORM
PostgreSQL            → Database
JWT                   → Authentication
Helmet                → Security headers
CORS                  → Cross-origin requests
Morgan                → HTTP logging
Bcryptjs              → Password hashing
Nodemailer            → Email service
Swagger               → API documentation
```

### Layered Architecture

```
REQUEST
   ↓
┌─────────────────────────────────────┐
│  MIDDLEWARE LAYER                   │
│  • CORS                             │
│  • Rate Limiting                    │
│  • API Key Auth                     │
│  • Request Logging                  │
│  • Error Handling                   │
└─────────────────────────────────────┘
   ↓
┌─────────────────────────────────────┐
│  ROUTING LAYER                      │
│  • Express Routers                  │
│  • Route Definitions                │
│  • Parameter Validation             │
└─────────────────────────────────────┘
   ↓
┌─────────────────────────────────────┐
│  CONTROLLER LAYER                   │
│  • Request Handling                 │
│  • Input Validation                 │
│  • Service Calls                    │
│  • Response Formatting              │
└─────────────────────────────────────┘
   ↓
┌─────────────────────────────────────┐
│  SERVICE LAYER                      │
│  • Business Logic                   │
│  • Data Processing                  │
│  • Email Notifications              │
│  • Calculations & Reports           │
└─────────────────────────────────────┘
   ↓
┌─────────────────────────────────────┐
│  DATA ACCESS LAYER (Sequelize)      │
│  • Model Definitions                │
│  • Relationships                    │
│  • Validations                      │
│  • Query Building                   │
└─────────────────────────────────────┘
   ↓
┌─────────────────────────────────────┐
│  DATABASE LAYER                     │
│  • PostgreSQL                       │
│  • SQL Execution                    │
│  • Data Persistence                 │
└─────────────────────────────────────┘
   ↓
RESPONSE
```

### API Endpoint Structure

```
Authentication
├── POST   /api/auth/login           - User login
├── POST   /api/auth/logout          - User logout
├── POST   /api/auth/register        - User registration
└── POST   /api/auth/refresh-token   - Refresh JWT token

Donors
├── GET    /api/donors               - List all donors
├── GET    /api/donors/:id           - Get donor by ID
├── POST   /api/donors               - Create new donor
├── PUT    /api/donors/:id           - Update donor
├── DELETE /api/donors/:id           - Delete donor
├── GET    /api/donors/search        - Search donors
└── POST   /api/donors/:id/history   - Add donation history

Blood Inventory
├── GET    /api/blood                - List blood inventory
├── GET    /api/blood/:id            - Get blood by ID
├── POST   /api/blood                - Add blood stock
├── PUT    /api/blood/:id            - Update blood stock
└── DELETE /api/blood/:id            - Remove blood stock

Blood Requests
├── GET    /api/requests             - List requests
├── GET    /api/requests/:id         - Get request by ID
├── POST   /api/requests             - Create new request
├── PUT    /api/requests/:id         - Update request
└── DELETE /api/requests/:id         - Delete request

Blood Tests
├── GET    /api/tests                - List blood tests
├── GET    /api/tests/:id            - Get test by ID
├── POST   /api/tests                - Create new test
├── PUT    /api/tests/:id            - Update test
└── DELETE /api/tests/:id            - Delete test

Users
├── GET    /api/users                - List users
├── GET    /api/users/:id            - Get user by ID
├── POST   /api/users                - Create user
├── PUT    /api/users/:id            - Update user
└── DELETE /api/users/:id            - Delete user

Reports
├── GET    /api/reports/blood        - Blood statistics
├── GET    /api/reports/donations    - Donation statistics
├── GET    /api/reports/requests     - Request statistics
├── GET    /api/reports/donors       - Donor statistics
└── GET    /api/reports/trends       - Donation trends

Documentation
└── GET    /api-docs                 - Swagger UI
```

### Database Schema (Relationships)

```
Users (Admins, Staff)
   ↓
   ├── manages → Blood Donations
   ├── manages → Blood Requests
   ├── manages → Blood Tests
   └── manages → Hospitals
        ↓
        ├── Donors (Blood Donors)
        │   ├── Blood Type
        │   ├── Contact Info
        │   └── Donation History
        │
        ├── BloodInventory
        │   ├── Blood Type
        │   ├── Quantity
        │   ├── Blood Components
        │   └── Expiration Date
        │
        ├── BloodRequests (from Hospitals)
        │   ├── Blood Type Required
        │   ├── Quantity Needed
        │   ├── Status (Pending, Approved, Rejected)
        │   └── Priority Level
        │
        ├── BloodTests
        │   ├── Test Results
        │   ├── Disease Screening
        │   └── Donor Reference
        │
        └── DonationLocations
            └── Donation Centers
```

---

## API Communication Protocol

### Request Format

```http
POST /api/donors HTTP/1.1
Host: localhost:5000
Content-Type: application/json
x-api-key: 11102004
Authorization: Bearer {jwt_token}

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "bloodType": "O+",
  "address": "123 Main St"
}
```

### Response Format

```json
{
  "success": true,
  "message": "Donor created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "bloodType": "O+",
    "address": "123 Main St",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## Security Architecture

### CORS Configuration
```javascript
{
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
}
```

### Authentication Strategy
- **JWT Tokens**: Issued on login
- **Token Storage**: localStorage (frontend)
- **Token Expiration**: Configurable (typically 24 hours)
- **Refresh Token**: Implement for long sessions

### Authorization Levels
```
Public Routes
├── POST /api/auth/login
├── POST /api/auth/register
└── GET  /api-docs

Protected Routes (Require API Key)
└── All other endpoints require valid JWT token

Role-Based Routes
├── ADMIN    → User management, Reports
├── STAFF    → Data management, Requests
└── DONOR    → View own profile, Donation history
```

### Security Headers (Helmet)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

---

## Performance Optimization

### Frontend
- Code splitting via Next.js dynamic imports
- Image optimization with next/image
- CSS minification via Tailwind
- SPA for fast client-side navigation

### Backend
- Connection pooling for database
- Query optimization with Sequelize
- Caching strategies
- Rate limiting to prevent abuse

---

## Error Handling Strategy

### Frontend
```typescript
try {
  const response = await axios.post(url, data, { headers })
  // Success
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
  } else if (error.response?.status === 403) {
    // Forbidden - insufficient permissions
  } else if (error.response?.status === 400) {
    // Bad request - validation error
  } else {
    // Server error
  }
}
```

### Backend
```javascript
try {
  // Business logic
} catch (error) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.message })
  } else if (error instanceof AuthenticationError) {
    return res.status(401).json({ message: error.message })
  } else if (error instanceof AuthorizationError) {
    return res.status(403).json({ message: error.message })
  } else {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
```

---

## Deployment Considerations

### Environment Variables
```
Development  → localhost:3000/5000
Staging      → staging.example.com
Production   → app.example.com
```

### Database
- Migrations for schema changes
- Backup strategy
- Connection pooling
- Query optimization

### Frontend Deployment
- Build optimization
- CDN for static assets
- Environment-specific configs

### Backend Deployment
- Process manager (PM2)
- Reverse proxy (Nginx)
- SSL certificates
- Monitoring & logging

---

## Monitoring & Logging

### Backend Logging
- Morgan HTTP request logging
- Console error logging
- File-based error logs
- Application performance monitoring

### Frontend Monitoring
- Browser console errors
- User activity tracking
- Performance metrics
- Error boundary implementation

---

**Note**: This architecture supports horizontal scaling and can handle enterprise-level blood bank operations.
