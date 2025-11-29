# 🔧 Environment Setup Guide

## Quick Summary

| Component | Port | Service | Status |
|-----------|------|---------|--------|
| Backend API | 5000 | Node.js/Express | Not running |
| Frontend | 3001 | Next.js | Not running |
| Database | 5432 | PostgreSQL | Needs setup |

---

## 1. Backend Environment Setup

### File: `blood-bank-backend/.env`

Create this file in the backend root directory:

```dotenv
# ===== SERVER CONFIGURATION =====
PORT=5000
NODE_ENV=development

# ===== DATABASE CONFIGURATION =====
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blood_bank_db
DB_USER=postgres
DB_PASSWORD=your_secure_password_here
DB_DIALECT=postgres

# ===== JWT AUTHENTICATION =====
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRATION=24h
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRATION=7d

# ===== API SECURITY =====
API_KEY=11102004
ALLOWED_IPS=127.0.0.1,localhost
BLOCKED_IPS=

# ===== CORS CONFIGURATION =====
FRONTEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001

# ===== EMAIL SERVICE (Gmail) =====
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=Blood Bank System <noreply@bloodbank.com>

# ===== LOGGING =====
LOG_LEVEL=debug
LOG_FILE=./logs/app.log

# ===== RATE LIMITING =====
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ===== APPLICATION =====
APP_NAME=Blood Bank Management System
APP_VERSION=1.0.0
```

### Configuration Explanation

```
SERVER CONFIGURATION
  PORT              - Server port (default: 5000)
  NODE_ENV          - Environment (development/production)

DATABASE
  DB_HOST           - PostgreSQL server address
  DB_PORT           - PostgreSQL port (default: 5432)
  DB_NAME           - Database name
  DB_USER           - Database user
  DB_PASSWORD       - Database password

AUTHENTICATION
  JWT_SECRET        - Secret key for JWT signing (generate with: openssl rand -base64 32)
  JWT_EXPIRATION    - Token expiration time
  
SECURITY
  API_KEY           - API key for endpoints (current: 11102004)
  
EMAIL
  EMAIL_SERVICE     - Email provider
  EMAIL_USER        - Sender email
  EMAIL_PASSWORD    - App-specific password (not regular password)
```

### Getting Gmail App Password

1. Enable 2-Step Verification on Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Generate app password (16 characters)
5. Use this in EMAIL_PASSWORD

---

## 2. Frontend Environment Setup

### File: `blood-bank-frontend/.env.local`

Already exists with basic configuration:

```dotenv
# ===== API CONFIGURATION =====
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=11102004

# ===== APP CONFIGURATION =====
NEXT_PUBLIC_APP_NAME=Blood Bank System
NEXT_PUBLIC_APP_VERSION=1.0.0

# ===== FEATURE FLAGS =====
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# ===== THEME =====
NEXT_PUBLIC_THEME=light
```

### Production .env.production.local

For production deployment:

```dotenv
NEXT_PUBLIC_BACKEND_URL=https://api.bloodbank.com
NEXT_PUBLIC_API_KEY=your_production_api_key
NEXT_PUBLIC_APP_NAME=Blood Bank System
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 3. Database Setup

### PostgreSQL Installation

#### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer and follow prompts
3. Note the password you set for postgres user
4. Keep pgAdmin for database management

#### Mac
```bash
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE blood_bank_db;

# Create user (optional)
CREATE USER blood_bank_user WITH PASSWORD 'your_password';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE blood_bank_db TO blood_bank_user;

# Exit
\q
```

### Verify Connection

```bash
psql -U postgres -h localhost -d blood_bank_db

# Should show PostgreSQL prompt
blood_bank_db=#
```

---

## 4. Backend Installation & Setup

### Step 1: Install Dependencies

```bash
cd blood-bank-backend
npm install
```

### Step 2: Create .env File

Copy the example above and customize for your setup

### Step 3: Run Migrations

```bash
# Using Sequelize CLI (if available)
npx sequelize-cli db:migrate

# Or manually run migration files
npm run migrate
```

### Step 4: Seed Database (Optional)

```bash
# Create superuser
node createSuperuser.js

# Or seed with sample data
npm run seed
```

### Step 5: Start Backend

```bash
npm start

# Or for development with auto-reload
npm run dev
```

Expected output:
```
🚀 Server đang chạy tại http://localhost:5000
```

---

## 5. Frontend Installation & Setup

### Step 1: Install Dependencies

```bash
cd blood-bank-frontend
pnpm install
# or: npm install
```

### Step 2: Verify .env.local

Check `blood-bank-frontend/.env.local` exists with:
```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=11102004
```

### Step 3: Start Development Server

```bash
pnpm dev
# or: npm run dev
```

Expected output:
```
- Local:        http://localhost:3001
- Environments: .env.local
```

### Step 4: Access Application

Open browser: http://localhost:3001

---

## 6. Complete Startup Checklist

### Pre-Startup
- [ ] PostgreSQL installed and running
- [ ] Database created (`blood_bank_db`)
- [ ] Backend `.env` file created
- [ ] Frontend `.env.local` verified

### Terminal 1 - Backend Setup
```bash
cd blood-bank-backend
npm install          # Only first time
npm start
```
- [ ] Backend running on http://localhost:5000
- [ ] No error messages

### Terminal 2 - Frontend Setup
```bash
cd blood-bank-frontend
pnpm install         # Only first time
pnpm dev
```
- [ ] Frontend running on http://localhost:3001
- [ ] No build errors

### Verify Integration
- [ ] Open http://localhost:3001
- [ ] Should show login page
- [ ] Enter test credentials
- [ ] Should navigate to dashboard

### Verify API
- [ ] Open http://localhost:5000/api-docs
- [ ] Should show Swagger documentation
- [ ] Try test endpoint

---

## 7. Environment Variables by Purpose

### Development
```dotenv
NODE_ENV=development
JWT_EXPIRATION=24h
LOG_LEVEL=debug
```

### Production
```dotenv
NODE_ENV=production
JWT_EXPIRATION=8h
LOG_LEVEL=warn
# Use secure HTTPS URLs
FRONTEND_URL=https://app.bloodbank.com
CORS_ORIGIN=https://app.bloodbank.com
```

### Testing
```dotenv
NODE_ENV=test
DB_NAME=blood_bank_test
JWT_EXPIRATION=1h
```

---

## 8. Troubleshooting Environment Issues

### Database Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:5432

Solution:
  1. Start PostgreSQL: sudo systemctl start postgresql
  2. Verify DB_HOST and DB_PORT in .env
  3. Check password is correct
  4. Test: psql -U postgres -h localhost
```

### API Key Invalid
```
Error: API Key không hợp lệ!

Solution:
  1. Check API_KEY in backend .env
  2. Check NEXT_PUBLIC_API_KEY in frontend .env.local
  3. Both must match (default: 11102004)
  4. Headers must include: x-api-key: 11102004
```

### CORS Errors
```
Error: Access to XMLHttpRequest blocked by CORS policy

Solution:
  1. Check FRONTEND_URL in backend .env (http://localhost:3001)
  2. Check CORS_ORIGIN matches
  3. Check backend CORS middleware in src/app.js
  4. Verify x-api-key header is sent
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000

Solution:
  # Windows PowerShell
  Get-NetTCPConnection -LocalPort 5000 | Stop-Process
  
  # Mac/Linux
  lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
  
  # Or use npx
  npx kill-port 5000
```

### JWT Token Invalid
```
Error: jwt malformed

Solution:
  1. Regenerate JWT_SECRET in .env
  2. Clear browser localStorage
  3. Login again to get new token
  4. Check Authorization header format: "Bearer {token}"
```

---

## 9. Environment Variable Validation

### Backend Startup Check
Backend will validate:
- ✓ DATABASE connection
- ✓ JWT_SECRET set
- ✓ API_KEY configured
- ✓ PORT available
- ✓ EMAIL service (if enabled)

### Frontend Build Check
Frontend will validate:
- ✓ NEXT_PUBLIC_BACKEND_URL accessible
- ✓ NEXT_PUBLIC_API_KEY present
- ✓ TypeScript compilation
- ✓ ESLint (warnings only)

---

## 10. Multiple Environment Support

### Development
```bash
npm start                    # Uses .env
```

### Production Build
```bash
npm run build               # Uses .env.production.local
npm start
```

### Testing
```bash
NODE_ENV=test npm test      # Uses .env.test
```

---

## 11. Securing Sensitive Data

### Never Commit
- `.env` files
- `.env.local` files
- Private keys
- API keys
- Database passwords

### Use .gitignore
```
# Environment
.env
.env.local
.env.*.local

# Logs
*.log
logs/

# Dependencies
node_modules/

# Next.js
.next/
out/

# Build
dist/
build/
```

---

## 12. Generate Secure Keys

### JWT Secret
```bash
# Generate random JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use openssl
openssl rand -base64 32
```

### API Key (Development)
```
Use: 11102004 (default for testing)
Production: Generate with crypto.randomBytes()
```

---

## Quick Reference

| Variable | Value | Purpose |
|----------|-------|---------|
| PORT | 5000 | Backend server port |
| DB_HOST | localhost | PostgreSQL host |
| DB_PORT | 5432 | PostgreSQL port |
| DB_NAME | blood_bank_db | Database name |
| JWT_SECRET | (random) | Token signing key |
| API_KEY | 11102004 | API authentication |
| FRONTEND_URL | http://localhost:3001 | Frontend address |
| EMAIL_SERVICE | gmail | Email provider |

---

**Status**: Ready to start development! 🚀

Once all environment variables are configured, follow the startup steps above to run both services.
