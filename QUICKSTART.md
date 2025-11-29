# 🚀 Quick Start Guide

## System Overview

**Blood Bank Management System** is a full-stack application with:
- **Backend API** (Node.js + Express) on port 5000
- **Frontend UI** (Next.js + React) on port 3001

---

## ⚡ Quick Start (5 minutes)

### 1. Start Backend

```bash
cd blood-bank-backend
npm install
npm start
```

**Expected output:**
```
🚀 Server đang chạy tại http://localhost:5000
```

### 2. Start Frontend (New Terminal)

```bash
cd blood-bank-frontend
pnpm install  # or npm install
pnpm dev      # or npm run dev
```

**Expected output:**
```
- Local:        http://localhost:3001
```

### 3. Access Application

- **Frontend**: http://localhost:3001 (Login page)
- **API Docs**: http://localhost:5000/api-docs (Swagger)

---

## 🔑 Default Credentials

Check `.env` files for:
- **API Key**: `11102004`
- **Default User**: Check backend setup or create with `createSuperuser.js`

---

## 📝 File Locations

| Item | Location |
|------|----------|
| Backend Config | `blood-bank-backend/.env` |
| Frontend Config | `blood-bank-frontend/.env.local` |
| API Routes | `blood-bank-backend/src/routes/` |
| UI Pages | `blood-bank-frontend/app/` |
| API Docs | `http://localhost:5000/api-docs` |

---

## 🔗 API Integration Points

All frontend API calls use:
- **Base URL**: `http://localhost:5000`
- **API Key Header**: `x-api-key: 11102004`
- **Auth Header**: `Authorization: Bearer {token}` (after login)

### Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | User login |
| GET | `/api/donors` | Get all donors |
| POST | `/api/donors` | Add new donor |
| GET | `/api/blood` | Blood inventory |
| GET | `/api/requests` | Blood requests |
| GET | `/api/reports/*` | Reports |

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Backend won't start | Check PostgreSQL is running, verify `.env` credentials |
| Frontend can't connect | Ensure backend is running on 5000, check CORS in `server.js` |
| CORS error | Verify `x-api-key` header is included in requests |
| Port already in use | Kill process: `npx kill-port 5000` or `npx kill-port 3001` |

---

## 📚 Next Steps

1. Review full integration guide: `INTEGRATION_GUIDE.md`
2. Explore API documentation: `http://localhost:5000/api-docs`
3. Check data models in `blood-bank-backend/src/models/`
4. Review frontend components in `blood-bank-frontend/components/`

---

## 🛠️ Development Tips

### Add New Feature
1. Create backend controller/route
2. Create frontend component/page
3. Test API with Swagger docs first
4. Integrate in frontend component
5. Test end-to-end flow

### Debug
- **Backend**: Check terminal logs
- **Frontend**: Open browser DevTools (F12)
- **API**: Use Swagger UI at `/api-docs`

### File Watch
- **Backend**: Changes require restart
- **Frontend**: Auto-refreshes on file save

---

## 📞 API Quick Reference

```typescript
// Get all donors
GET /api/donors
Header: x-api-key: 11102004

// Create new donor
POST /api/donors
Body: { name, email, phone, bloodType, ... }
Header: x-api-key: 11102004

// Get blood inventory
GET /api/blood
Header: x-api-key: 11102004

// Get reports
GET /api/reports/blood
Header: x-api-key: 11102004
```

---

**Ready?** Start with backend and frontend terminals, then open http://localhost:3001! 🎉
