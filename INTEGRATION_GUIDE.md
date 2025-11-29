# Blood Bank Management System - Integration Guide

## 📋 Project Overview

This is a full-stack Blood Bank Management System consisting of:
- **Backend**: Node.js/Express REST API
- **Frontend**: Next.js React application

---

## 🏗️ Architecture Overview

### Backend (blood-bank-backend)
- **Port**: 5000 (default)
- **Framework**: Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **API Base**: `http://localhost:5000/api`

#### Key Endpoints:
- `/api/auth` - Authentication & Login
- `/api/donors` - Donor Management
- `/api/blood` - Blood Inventory Management
- `/api/requests` - Blood Request Management
- `/api/users` - User Management
- `/api/reports` - Reports & Analytics
- `/api/tests` - Blood Test Management
- `/api-docs` - Swagger API Documentation

#### Security Features:
- CORS Configuration (Allow frontend at `http://localhost:3001`)
- JWT Token Authentication
- Helmet Middleware (Security Headers)
- Rate Limiting
- API Key Authentication (via `x-api-key` header)
- IP Blocking
- Morgan Request Logging

### Frontend (blood-bank-frontend)
- **Port**: 3001 (Next.js default)
- **Framework**: Next.js 15.2.3
- **UI Library**: Radix UI Components with Tailwind CSS
- **API Client**: Axios
- **Theme**: Dark/Light Mode Support (next-themes)

#### Key Pages:
- `/login` - User Authentication
- `/dashboard` - Main Dashboard
- `/donors` - Donor Management
- `/inventory` - Blood Inventory
- `/requests` - Blood Requests
- `/blood-products` - Blood Products Management
- `/users` - User Management
- `/reports` - Reports & Analytics

---

## 🔗 API Integration Points

### Frontend Configuration
**File**: `.env.local`
```dotenv
NEXT_PUBLIC_API_KEY=11102004
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### Authentication Flow
1. User logs in via `/login` page
2. Frontend sends POST request to `http://localhost:5000/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Token stored in localStorage
5. Token included in Authorization header for subsequent requests

### Example API Call
```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
  { email, password },
  {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  }
);
```

---

## 🚀 Setup & Running Instructions

### Prerequisites
- Node.js 16+ installed
- npm or pnpm package manager
- PostgreSQL database configured

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd blood-bank-backend
   npm install
   ```

2. **Environment Configuration**
   Create `.env` file with database and JWT configuration:
   ```dotenv
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=blood_bank
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret_key
   API_KEY=11102004
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Run Migrations**
   ```bash
   npm run migrate
   ```

4. **Create Superuser (Optional)**
   ```bash
   node createSuperuser.js
   ```

5. **Start Server**
   ```bash
   npm start
   # Server will run at http://localhost:5000
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd blood-bank-frontend
   pnpm install
   # or npm install
   ```

2. **Start Development Server**
   ```bash
   pnpm dev
   # or npm run dev
   # Frontend will run at http://localhost:3001
   ```

3. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📁 Project Structure

### Backend Structure
```
blood-bank-backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── donorController.js
│   │   ├── bloodInventoryController.js
│   │   ├── bloodRequestController.js
│   │   ├── bloodTestController.js
│   │   ├── reportController.js
│   │   └── userController.js
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── roleMiddleware.js
│   │   └── securityMiddleware.js
│   ├── models/                # Sequelize models
│   │   ├── Donor.js
│   │   ├── User.js
│   │   ├── BloodInventory.js
│   │   ├── BloodRequest.js
│   │   ├── BloodTest.js
│   │   ├── Hospital.js
│   │   ├── BloodComponent.js
│   │   ├── BloodDonationLocation.js
│   │   └── index.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   ├── bloodInventoryRoutes.js
│   │   ├── bloodRequestRoutes.js
│   │   ├── bloodTestRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── userRoutes.js
│   │   └── index.js
│   └── services/              # Business services
│       ├── authService.js
│       ├── donorService.js
│       └── emailService.js
├── migrations/                # Database migrations
├── seeders/                   # Database seeds
├── server.js                  # Entry point
├── package.json
└── README.md
```

### Frontend Structure
```
blood-bank-frontend/
├── app/
│   ├── page.tsx               # Home/redirect page
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   ├── (auth)/                # Auth route group
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── (dashboard)/           # Dashboard route group
│       ├── dashboard/
│       ├── donors/
│       ├── inventory/
│       ├── requests/
│       ├── blood-products/
│       ├── users/
│       └── reports/
├── components/
│   ├── auth/                  # Auth components
│   ├── dashboard/             # Dashboard widgets
│   ├── donors/                # Donor components
│   ├── inventory/             # Inventory components
│   ├── blood-products/        # Blood product components
│   ├── users/                 # User components
│   ├── reports/               # Report components
│   ├── requests/              # Request components
│   ├── ui/                    # Radix UI components
│   └── layout/                # Layout components
├── config/
│   └── nav.tsx                # Navigation configuration
├── context/
│   └── auth-context.tsx       # Auth context provider
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notification hook
├── lib/
│   └── utils.ts               # Utility functions
├── styles/
│   └── globals.css            # Global CSS
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 🔐 Security Considerations

### API Key
- **Header**: `x-api-key: 11102004`
- Required for all protected endpoints
- Should be changed in production

### JWT Token
- Generated on login
- Valid for configured duration (check backend config)
- Stored in localStorage
- Sent in Authorization header: `Authorization: Bearer {token}`

### CORS
- Frontend at `http://localhost:3001` is allowed
- Allowed methods: GET, POST, PUT, DELETE
- Update CORS config in `server.js` for production URLs

### Environment Variables
Keep sensitive data in `.env` files (not committed to git):
- Database credentials
- API keys
- JWT secrets
- Email service credentials

---

## 🧪 API Testing

### Using Swagger UI
- Navigate to `http://localhost:5000/api-docs`
- View all available endpoints
- Test API directly from browser

### Using Postman/Insomnia
1. Set `x-api-key` header to `11102004`
2. Include JWT token in Authorization header (if authenticated)
3. Make requests to endpoints like:
   - `GET http://localhost:5000/api/donors`
   - `POST http://localhost:5000/api/auth/login`

---

## 📊 Database Models

### Core Models
- **User** - System users
- **Donor** - Blood donors
- **Hospital** - Hospital information
- **BloodInventory** - Available blood stock
- **BloodRequest** - Blood requests from hospitals
- **BloodTest** - Blood test results
- **BloodComponent** - Blood component types
- **BloodDonationLocation** - Donation centers

---

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify `.env` database credentials
- Check port 5000 is available
- Run migrations: `npm run migrate`

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- Check CORS configuration in `server.js`
- Check browser console for exact error

### CORS Errors
- Backend CORS settings must match frontend origin
- Ensure `x-api-key` header is included
- Check allowed headers in security middleware

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3001
npx kill-port 3001
```

---

## 🚀 Development Workflow

### Starting Both Services

**Terminal 1 - Backend**:
```bash
cd blood-bank-backend
npm install
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd blood-bank-frontend
pnpm install
pnpm dev
# Runs on http://localhost:3001
```

### Making API Changes
1. Update backend endpoint in controller/route
2. Update frontend component to call new endpoint
3. Test using Swagger UI or Postman
4. Verify frontend receives expected response

---

## 📦 Key Dependencies

### Backend
- express: Web framework
- sequelize: ORM for PostgreSQL
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- nodemailer: Email service
- helmet: Security headers
- cors: Cross-origin resource sharing
- morgan: HTTP request logger

### Frontend
- next: React framework
- react: UI library
- typescript: Type safety
- tailwind: Utility CSS
- radix-ui: Component library
- axios: HTTP client
- react-hook-form: Form management
- date-fns: Date utilities

---

## 📞 Support

For issues or questions:
1. Check API documentation at `/api-docs`
2. Review error logs in browser console (frontend) or terminal (backend)
3. Verify environment variables are correctly set
4. Check database connection and migrations

---

## ✅ Checklist

- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] PostgreSQL database configured
- [ ] Backend `.env` file created
- [ ] Frontend `.env.local` file configured
- [ ] Migrations run successfully
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access Swagger docs at `/api-docs`
- [ ] Can login through frontend
- [ ] Can retrieve data from API
