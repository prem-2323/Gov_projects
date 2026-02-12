# Backend - Waste Reporting API

Node.js/Express backend server for the Geo-Tagged Waste Reporting App.

## Features

- User authentication (JWT)
- Waste report management
- Role-based access control (Citizen, Cleaner, Admin)
- File upload support
- MongoDB integration
- RESTful API

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/waste-reporting
JWT_SECRET=your_secret_key_here
AI_MODEL_URL=http://localhost:8000
```

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### 4. Run Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Reports
- `POST /api/reports` - Create new report (with images)
- `GET /api/reports/my-reports` - Get user's reports
- `GET /api/reports/:id` - Get report by ID
- `GET /api/reports/assigned/me` - Get assigned reports (Cleaner)
- `PUT /api/reports/:id/start` - Start working on report (Cleaner)
- `PUT /api/reports/:id/complete` - Complete report (Cleaner)
- `PUT /api/reports/:id/assign` - Assign report (Admin)
- `PUT /api/reports/:id/status` - Update status (Admin)
- `DELETE /api/reports/:id` - Delete report (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/users` - Get all users
- `GET /api/admin/cleaners` - Get all cleaners
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/reports/all` - Get all reports

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/rewards` - Get reward points
- `GET /api/users/notifications` - Get notifications

## Project Structure

```
backend/
├── models/           # Database models
│   ├── User.model.js
│   └── Report.model.js
├── routes/           # API routes
│   ├── auth.routes.js
│   ├── report.routes.js
│   ├── user.routes.js
│   └── admin.routes.js
├── controllers/      # Route controllers
│   ├── auth.controller.js
│   ├── report.controller.js
│   ├── user.controller.js
│   └── admin.controller.js
├── middleware/       # Custom middleware
│   ├── auth.middleware.js
│   └── upload.middleware.js
├── config/           # Configuration files
│   └── database.js
├── utils/            # Utility functions
│   └── logger.js
└── server.js         # Entry point
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## File Uploads

Images are uploaded to the `uploads/` directory. Configure `MAX_FILE_SIZE` and `UPLOAD_PATH` in `.env`.

## Testing

```bash
npm test
```

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use proper MongoDB Atlas connection
3. Set strong `JWT_SECRET`
4. Configure CORS properly
5. Use HTTPS
6. Set up logging and monitoring
