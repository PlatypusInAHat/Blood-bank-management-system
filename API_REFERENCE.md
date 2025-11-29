# 🔌 API Reference - Blood Bank System

## Base Configuration

```
Base URL: http://localhost:5000/api
API Key: 11102004 (header: x-api-key)
Authentication: JWT Token (header: Authorization: Bearer {token})
Content-Type: application/json
```

---

## Authentication Endpoints

### 1. User Login
```http
POST /api/auth/login
Content-Type: application/json
x-api-key: 11102004

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "success": true,
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "ADMIN"
  }
}

Error (401 Unauthorized):
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 2. User Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 3. User Registration
```http
POST /api/auth/register
Content-Type: application/json
x-api-key: 11102004

Request Body:
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "phone": "+1234567890"
}

Response (201 Created):
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "name": "New User",
    "phone": "+1234567890",
    "role": "STAFF"
  }
}
```

### 4. Refresh Token
```http
POST /api/auth/refresh-token
Authorization: Bearer {old_token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Donor Management Endpoints

### 1. Get All Donors
```http
GET /api/donors
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters (Optional):
  ?page=1&limit=10
  ?bloodType=O+
  ?status=ACTIVE

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "bloodType": "O+",
      "address": "123 Main St",
      "age": 30,
      "gender": "MALE",
      "status": "ACTIVE",
      "lastDonation": "2024-01-10T10:30:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### 2. Get Donor by ID
```http
GET /api/donors/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "bloodType": "O+",
    "address": "123 Main St",
    "age": 30,
    "gender": "MALE",
    "status": "ACTIVE",
    "lastDonation": "2024-01-10T10:30:00Z",
    "donationCount": 5,
    "medicalHistory": "No allergies",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Create New Donor
```http
POST /api/donors
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "bloodType": "A+",
  "address": "456 Oak Ave",
  "age": 28,
  "gender": "FEMALE",
  "medicalHistory": "No known allergies"
}

Response (201 Created):
{
  "success": true,
  "message": "Donor created successfully",
  "data": {
    "id": 51,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "bloodType": "A+",
    "address": "456 Oak Ave",
    "age": 28,
    "gender": "FEMALE",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Update Donor
```http
PUT /api/donors/{id}
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "phone": "+9876543210",
  "address": "New Address",
  "medicalHistory": "Updated history"
}

Response (200 OK):
{
  "success": true,
  "message": "Donor updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "phone": "+9876543210",
    "address": "New Address",
    "medicalHistory": "Updated history",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Delete Donor
```http
DELETE /api/donors/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "message": "Donor deleted successfully"
}
```

### 6. Search Donors
```http
GET /api/donors/search
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters:
  ?bloodType=O+
  ?name=John
  ?location=City

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "bloodType": "O+",
      "phone": "+1234567890",
      "status": "ACTIVE"
    }
  ]
}
```

### 7. Add Donation History
```http
POST /api/donors/{id}/history
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "donationDate": "2024-01-15T10:30:00Z",
  "quantity": "450ml",
  "bloodType": "O+",
  "location": "Main Center",
  "notes": "Successful donation"
}

Response (201 Created):
{
  "success": true,
  "message": "Donation history added",
  "data": {
    "donorId": 1,
    "donationDate": "2024-01-15T10:30:00Z",
    "quantity": "450ml"
  }
}
```

---

## Blood Inventory Endpoints

### 1. Get All Blood Inventory
```http
GET /api/blood
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters (Optional):
  ?bloodType=O+
  ?status=AVAILABLE
  ?page=1&limit=10

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "bloodType": "O+",
      "quantity": 100,
      "units": "bags",
      "location": "Main Store",
      "collectionDate": "2024-01-10T10:30:00Z",
      "expirationDate": "2024-02-10T10:30:00Z",
      "status": "AVAILABLE",
      "component": "Whole Blood",
      "donorId": 1
    }
  ],
  "summary": {
    "O+": 100,
    "O-": 50,
    "A+": 75,
    "A-": 30,
    "B+": 60,
    "B-": 25,
    "AB+": 20,
    "AB-": 10,
    "total": 370
  }
}
```

### 2. Get Blood by ID
```http
GET /api/blood/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "bloodType": "O+",
    "quantity": 100,
    "units": "bags",
    "location": "Main Store",
    "collectionDate": "2024-01-10T10:30:00Z",
    "expirationDate": "2024-02-10T10:30:00Z",
    "status": "AVAILABLE",
    "component": "Whole Blood",
    "donorId": 1,
    "testResults": {
      "hiv": "NEGATIVE",
      "hepatitisB": "NEGATIVE",
      "hepatitisC": "NEGATIVE",
      "syphilis": "NEGATIVE"
    }
  }
}
```

### 3. Add Blood Stock
```http
POST /api/blood
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "bloodType": "B+",
  "quantity": 50,
  "units": "bags",
  "location": "Main Store",
  "collectionDate": "2024-01-15T10:30:00Z",
  "expirationDate": "2024-02-15T10:30:00Z",
  "component": "Red Blood Cells",
  "donorId": 2
}

Response (201 Created):
{
  "success": true,
  "message": "Blood stock added successfully",
  "data": {
    "id": 2,
    "bloodType": "B+",
    "quantity": 50,
    "status": "AVAILABLE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Update Blood Stock
```http
PUT /api/blood/{id}
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "quantity": 45,
  "status": "AVAILABLE"
}

Response (200 OK):
{
  "success": true,
  "message": "Blood stock updated",
  "data": {
    "id": 1,
    "quantity": 45,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Delete Blood Stock
```http
DELETE /api/blood/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "message": "Blood stock deleted successfully"
}
```

---

## Blood Request Endpoints

### 1. Get All Blood Requests
```http
GET /api/requests
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters (Optional):
  ?status=PENDING
  ?bloodType=O+
  ?hospitalId=1
  ?page=1&limit=10

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hospitalId": 1,
      "hospitalName": "City Hospital",
      "bloodType": "O+",
      "quantity": 10,
      "units": "bags",
      "status": "PENDING",
      "priority": "HIGH",
      "requestDate": "2024-01-15T10:30:00Z",
      "neededBy": "2024-01-16T10:30:00Z",
      "approvedBy": null,
      "approvalDate": null,
      "notes": "Emergency request"
    }
  ]
}
```

### 2. Get Request by ID
```http
GET /api/requests/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "hospitalId": 1,
    "hospitalName": "City Hospital",
    "contactPerson": "Dr. Smith",
    "contactEmail": "smith@hospital.com",
    "bloodType": "O+",
    "quantity": 10,
    "units": "bags",
    "status": "PENDING",
    "priority": "HIGH",
    "requestDate": "2024-01-15T10:30:00Z",
    "neededBy": "2024-01-16T10:30:00Z",
    "notes": "Emergency request",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Create Blood Request
```http
POST /api/requests
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "hospitalId": 1,
  "bloodType": "AB+",
  "quantity": 5,
  "units": "bags",
  "priority": "MEDIUM",
  "neededBy": "2024-01-17T10:30:00Z",
  "notes": "Scheduled surgery"
}

Response (201 Created):
{
  "success": true,
  "message": "Blood request created successfully",
  "data": {
    "id": 2,
    "hospitalId": 1,
    "bloodType": "AB+",
    "quantity": 5,
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Update Request Status
```http
PUT /api/requests/{id}
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "status": "APPROVED",
  "notes": "Approved by manager"
}

Response (200 OK):
{
  "success": true,
  "message": "Request updated successfully",
  "data": {
    "id": 1,
    "status": "APPROVED",
    "approvalDate": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Delete Request
```http
DELETE /api/requests/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "message": "Request deleted successfully"
}
```

---

## Blood Test Endpoints

### 1. Get All Blood Tests
```http
GET /api/tests
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters (Optional):
  ?donorId=1
  ?status=COMPLETED
  ?page=1&limit=10

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "donorId": 1,
      "donorName": "John Doe",
      "testDate": "2024-01-10T10:30:00Z",
      "status": "COMPLETED",
      "results": {
        "hiv": "NEGATIVE",
        "hepatitisB": "NEGATIVE",
        "hepatitisC": "NEGATIVE",
        "syphilis": "NEGATIVE",
        "bloodType": "O+",
        "rhFactor": "POSITIVE"
      },
      "approvedBy": "Dr. Johnson",
      "approvalDate": "2024-01-11T10:30:00Z"
    }
  ]
}
```

### 2. Get Test by ID
```http
GET /api/tests/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "donorId": 1,
    "testDate": "2024-01-10T10:30:00Z",
    "status": "COMPLETED",
    "results": {
      "hiv": "NEGATIVE",
      "hepatitisB": "NEGATIVE",
      "hepatitisC": "NEGATIVE",
      "syphilis": "NEGATIVE",
      "bloodType": "O+",
      "rhFactor": "POSITIVE",
      "hemoglobin": 14.5,
      "hematocrit": 45
    },
    "labTechnician": "Mary Smith",
    "approvedBy": "Dr. Johnson",
    "approvalDate": "2024-01-11T10:30:00Z"
  }
}
```

### 3. Create Blood Test
```http
POST /api/tests
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "donorId": 1,
  "testDate": "2024-01-15T10:30:00Z",
  "results": {
    "hiv": "NEGATIVE",
    "hepatitisB": "NEGATIVE",
    "hepatitisC": "NEGATIVE",
    "syphilis": "NEGATIVE",
    "bloodType": "O+",
    "rhFactor": "POSITIVE",
    "hemoglobin": 14.2,
    "hematocrit": 44
  },
  "labTechnician": "Mary Smith"
}

Response (201 Created):
{
  "success": true,
  "message": "Blood test created successfully",
  "data": {
    "id": 2,
    "donorId": 1,
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Approve Test Results
```http
PUT /api/tests/{id}
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "status": "APPROVED",
  "approvedBy": "Dr. Johnson",
  "notes": "All results normal"
}

Response (200 OK):
{
  "success": true,
  "message": "Test approved successfully",
  "data": {
    "id": 1,
    "status": "APPROVED",
    "approvalDate": "2024-01-15T10:30:00Z"
  }
}
```

---

## User Management Endpoints

### 1. Get All Users
```http
GET /api/users
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "phone": "+1234567890",
      "role": "ADMIN",
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. Get User by ID
```http
GET /api/users/{id}
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "phone": "+1234567890",
    "role": "ADMIN",
    "status": "ACTIVE",
    "department": "Management",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### 3. Create User
```http
POST /api/users
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "name": "New Staff",
  "email": "staff@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "STAFF",
  "department": "Operations"
}

Response (201 Created):
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 10,
    "name": "New Staff",
    "email": "staff@example.com",
    "role": "STAFF",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Update User
```http
PUT /api/users/{id}
Authorization: Bearer {token}
x-api-key: 11102004
Content-Type: application/json

Request Body:
{
  "name": "Updated Name",
  "phone": "+9876543210",
  "role": "MANAGER"
}

Response (200 OK):
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Name",
    "phone": "+9876543210",
    "role": "MANAGER"
  }
}
```

---

## Report Endpoints

### 1. Blood Inventory Report
```http
GET /api/reports/blood
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters (Optional):
  ?startDate=2024-01-01&endDate=2024-01-31
  ?bloodType=O+

Response (200 OK):
{
  "success": true,
  "data": {
    "totalBlood": 370,
    "byBloodType": {
      "O+": 100,
      "O-": 50,
      "A+": 75,
      "A-": 30,
      "B+": 60,
      "B-": 25,
      "AB+": 20,
      "AB-": 10
    },
    "expiringSoon": 15,
    "critical": 5,
    "summary": "Good stock levels"
  }
}
```

### 2. Donation Report
```http
GET /api/reports/donations
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "totalDonations": 250,
    "activeDonors": 150,
    "newDonorsThisMonth": 25,
    "donationsByMonth": [
      { "month": "January", "count": 25 },
      { "month": "February", "count": 30 }
    ]
  }
}
```

### 3. Blood Request Report
```http
GET /api/reports/requests
Authorization: Bearer {token}
x-api-key: 11102004

Response (200 OK):
{
  "success": true,
  "data": {
    "totalRequests": 120,
    "approved": 100,
    "rejected": 10,
    "pending": 10,
    "averageProcessingTime": "2.5 hours"
  }
}
```

### 4. Donation Trends
```http
GET /api/reports/trends
Authorization: Bearer {token}
x-api-key: 11102004

Query Parameters (Optional):
  ?period=monthly
  ?months=12

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "date": "2024-01-01",
      "donations": 10,
      "donors": 8,
      "bloodType": "O+"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Response Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 204 | No Content | Successful, no response body |
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Permission denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict |
| 500 | Server Error | Internal server error |
| 503 | Service Unavailable | Server temporarily unavailable |

---

## Example Usage with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "x-api-key: 11102004" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Donors
curl -X GET http://localhost:5000/api/donors \
  -H "Authorization: Bearer {token}" \
  -H "x-api-key: 11102004"

# Create Donor
curl -X POST http://localhost:5000/api/donors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -H "x-api-key: 11102004" \
  -d '{
    "name":"Jane Doe",
    "email":"jane@example.com",
    "bloodType":"A+",
    "phone":"+1234567890"
  }'
```

---

**Note**: Replace `{token}` with actual JWT token obtained from login endpoint.
All endpoints require valid `x-api-key` header.
