# 🩸 Blood Bank Management System

A full-stack application for managing blood donations, inventory, and requests in a hospital blood bank.

## 📌 Quick Links

- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup
- **Full Integration Guide**: See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Technical Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Reference**: See [API_REFERENCE.md](./API_REFERENCE.md)
- **Environment Setup**: See [ENV_SETUP.md](./ENV_SETUP.md)

---

## 🎯 Project Overview

This project consists of two main parts:

### Backend (Node.js + Express)
- REST API for all operations
- PostgreSQL database
- JWT authentication
- Swagger documentation
- **Location**: `./blood-bank-backend`
- **Port**: 5000

### Frontend (Next.js + React)
- Modern web interface
- Responsive design
- Real-time updates
- Dark/Light theme support
- **Location**: `./blood-bank-frontend`
- **Port**: 3001

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+
- PostgreSQL installed
- npm or pnpm

### 1. Backend Setup

```bash
cd blood-bank-backend
npm install
npm start
```

Server runs at: `http://localhost:5000`

### 2. Frontend Setup (New Terminal)

```bash
cd blood-bank-frontend
pnpm install
pnpm dev
```

App runs at: `http://localhost:3001`

### 3. Access Application

- **Frontend**: http://localhost:3001
- **API Docs**: http://localhost:5000/api-docs

---

## 📊 System Architecture

```
┌─────────────────────────┐
│   Frontend (Next.js)    │
│   http://localhost:3001 │
├─────────────────────────┤
│  React Components       │
│  Tailwind + Radix UI    │
│  Axios HTTP Client      │
└────────────┬────────────┘
             │ REST API
             ▼
┌─────────────────────────┐
│   Backend (Express)     │
│   http://localhost:5000 │
├─────────────────────────┤
│  Controllers            │
│  Services               │
│  Sequelize ORM          │
└────────────┬────────────┘
             │ SQL
             ▼
┌─────────────────────────┐
│  PostgreSQL Database    │
│  localhost:5432         │
└─────────────────────────┘
```

---

## 🔑 Key Features

### Authentication
- User login/registration
- JWT token-based auth
- Role-based access control
- Session management

### Donor Management
- Register new donors
- Track donation history
- Search by blood type
- Manage donor information

### Blood Inventory
- Track available blood stock
- Manage blood components
- Monitor expiration dates
- Generate stock reports

### Blood Requests
- Create/manage blood requests
- Request approval workflow
- Status tracking
- Priority management

### Blood Testing
- Record test results
- Disease screening
- Quality approval
- Test history

### Reports & Analytics
- Inventory reports
- Donation trends
- Request statistics
- Donor analytics

---

## 📁 Project Structure

### Backend Structure
```
blood-bank-backend/
├── src/
│   ├── controllers/      # Business logic handlers
│   ├── models/           # Database models
│   ├── routes/           # API endpoints
│   ├── services/         # Business services
│   ├── middleware/       # Express middleware
│   └── config/           # Configuration files
├── migrations/           # Database migrations
├── server.js             # Entry point
├── package.json
└── .env                  # Environment variables
```

### Frontend Structure
```
blood-bank-frontend/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
├── context/             # React context
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── public/              # Static assets
└── .env.local          # Environment variables
```

---

## 🔗 API Integration

### Base Configuration
```
Base URL: http://localhost:5000/api
API Key: 11102004 (header: x-api-key)
Authentication: JWT Token (header: Authorization: Bearer {token})
Content-Type: application/json
```

### Example Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | User login |
| GET | `/api/donors` | Get all donors |
| POST | `/api/donors` | Add new donor |
| GET | `/api/blood` | Blood inventory |
| POST | `/api/requests` | Create request |
| GET | `/api/reports/blood` | Blood report |
| GET | `/api-docs` | Swagger documentation |

See [API_REFERENCE.md](./API_REFERENCE.md) for complete API documentation.

---

## 🔐 Security Features

- **CORS**: Restricted to frontend origin
- **JWT Authentication**: Secure token-based auth
- **API Key**: Additional layer of security
- **Helmet Middleware**: Security headers
- **Rate Limiting**: Prevent abuse
- **Password Hashing**: bcryptjs
- **Input Validation**: Request validation
- **SQL Injection Prevention**: ORM usage

---

## 📋 Database Models

### Core Entities
- **User** - System users
- **Donor** - Blood donors
- **BloodInventory** - Blood stock
- **BloodRequest** - Hospital requests
- **BloodTest** - Test results
- **Hospital** - Hospital info
- **BloodComponent** - Component types

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed schema.

---

## 🛠️ Development Setup

### 1. Environment Configuration

#### Backend `.env`
```dotenv
PORT=5000
DB_HOST=localhost
DB_NAME=blood_bank_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
API_KEY=11102004
```

#### Frontend `.env.local`
```dotenv
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=11102004
```

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed configuration.

### 2. Database Setup

```bash
# Create database
createdb -U postgres blood_bank_db

# Run migrations
cd blood-bank-backend
npm run migrate

# Create superuser (optional)
node createSuperuser.js
```

### 3. Start Services

**Terminal 1 - Backend:**
```bash
cd blood-bank-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd blood-bank-frontend
pnpm dev
```

---

## 📖 Documentation

### Main Documents
1. **QUICKSTART.md** - 5-minute setup guide
2. **INTEGRATION_GUIDE.md** - Complete integration details
3. **ARCHITECTURE.md** - System architecture & design
4. **API_REFERENCE.md** - API endpoints documentation
5. **ENV_SETUP.md** - Environment variables guide

### Reading Order
1. Start with QUICKSTART.md (get it running)
2. Read INTEGRATION_GUIDE.md (understand structure)
3. Review ARCHITECTURE.md (system design)
4. Check API_REFERENCE.md (API details)
5. Refer to ENV_SETUP.md (configuration help)

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
```
Error: connect ECONNREFUSED
Solution: Check PostgreSQL is running and .env credentials
```

**Frontend can't connect to backend**
```
Error: CORS error / Connection refused
Solution: Verify NEXT_PUBLIC_BACKEND_URL in .env.local
```

**Port already in use**
```
Error: EADDRINUSE: address already in use :::5000
Solution: npx kill-port 5000
```

See [TROUBLESHOOTING](./TROUBLESHOOTING.md) for more help.

---

## 🧪 Testing

### API Testing
- Swagger UI: `http://localhost:5000/api-docs`
- Postman: Import from exported collection
- cURL: Use examples in API_REFERENCE.md

### Frontend Testing
- Browser DevTools (F12)
- React DevTools extension
- Network tab for API calls

---

## 📦 Technology Stack

### Backend
- Node.js & Express.js
- PostgreSQL & Sequelize ORM
- JWT & bcryptjs
- Helmet, CORS, Morgan
- Swagger/OpenAPI

### Frontend
- Next.js 15.2.3
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Axios HTTP Client

---

## 🚢 Deployment

### Frontend Deployment (Vercel)
```bash
pnpm run build
# Deploy to Vercel
```

### Backend Deployment (Heroku/AWS)
```bash
npm run build
# Configure environment variables
# Deploy
```

See documentation in each folder for detailed deployment steps.

---

## 👥 User Roles

### Admin
- Full system access
- User management
- Report generation
- System configuration

### Staff
- Data management
- Donor registration
- Request handling
- Inventory management

### Donor
- View own profile
- Check donation history
- Update contact info

---

## 📞 Support & Documentation

### Getting Help
1. Check the documentation files in this directory
2. Review code comments and inline documentation
3. Check browser console for errors
4. Review backend logs in terminal
5. Check database connectivity

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/)

---

## 📋 Development Checklist

### Initial Setup
- [ ] Clone/download project
- [ ] Read QUICKSTART.md
- [ ] Install Node.js & PostgreSQL
- [ ] Configure backend .env
- [ ] Configure frontend .env.local
- [ ] Run migrations
- [ ] Start backend
- [ ] Start frontend

### Before Coding
- [ ] Understand project structure
- [ ] Review API documentation
- [ ] Check existing components
- [ ] Test API endpoints

### When Adding Features
- [ ] Plan feature scope
- [ ] Create backend endpoint
- [ ] Test with Swagger UI
- [ ] Create frontend component
- [ ] Test end-to-end
- [ ] Update documentation

---

## 🔄 Workflow

### Adding a New Feature

1. **Backend**
   - Create model/controller/route
   - Add API endpoint
   - Test with Swagger

2. **Frontend**
   - Create component/page
   - Add API call
   - Integrate with form

3. **Testing**
   - Test API response
   - Test UI interaction
   - Test error handling

4. **Documentation**
   - Update API docs
   - Add code comments
   - Update this README

---

## 📝 Contributing

### Code Style
- Use consistent naming conventions
- Add comments for complex logic
- Keep functions small and focused
- Handle errors gracefully

### Git Workflow
```bash
git checkout -b feature/your-feature
# Make changes
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 👨‍💻 Development Team

Blood Bank Management System v1.0.0

---

## 📅 Version History

### v1.0.0 (Current)
- ✅ User authentication
- ✅ Donor management
- ✅ Blood inventory
- ✅ Blood requests
- ✅ Blood testing
- ✅ Reports & analytics
- ✅ Responsive UI
- ✅ API documentation

---

## 🎯 Next Steps

1. **Get Started**: Follow [QUICKSTART.md](./QUICKSTART.md)
2. **Understand Structure**: Read [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
3. **Learn Architecture**: Review [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Explore API**: Check [API_REFERENCE.md](./API_REFERENCE.md)
5. **Configure Environment**: Use [ENV_SETUP.md](./ENV_SETUP.md)

---

**Ready to get started?** 🚀

Run the Quick Start commands above and access the application at http://localhost:3001!

---

## Support

For issues or questions:
1. Check documentation files
2. Review error logs
3. Check browser console (Frontend)
4. Check terminal logs (Backend)
5. Verify database connectivity

**Everything you need to know is in the documentation files above!** 📚
