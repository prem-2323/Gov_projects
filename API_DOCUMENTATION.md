# API Documentation

## Overview
Complete REST API documentation for the Geo-Tagged Waste Reporting System with AI integration.

**Base URL:** `http://localhost:5000/api`
**AI Service:** `http://localhost:8000/api`

---

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "citizen",  // citizen, cleaner, admin
  "phone": "+1234567890"
}

Response: 201
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

---

## Reports

### Create Report (with AI Analysis)
```http
POST /api/reports
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
  title: "Large waste pile on Main Street"
  description: "Mixed plastic and organic waste"
  category: "plastic"
  location: '{"type":"Point","coordinates":[77.5946,12.9716]}'
  images: [file1.jpg, file2.jpg]

Response: 201
{
  "success": true,
  "report": {
    "_id": "report_id",
    "title": "Large waste pile on Main Street",
    "status": "pending",
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716],
      "address": "Main Street, City, State"
    },
    "aiVerification": {
      "verified": true,
      "confidence": 0.87,
      "wasteCount": 5,
      "severity": {
        "level": "high",
        "score": 35,
        "priority": 2,
        "dominantType": "plastic"
      }
    },
    "rewardPoints": {
      "basePoints": 18,
      "totalPoints": 18
    }
  }
}
```

### Get My Reports
```http
GET /api/reports/my-reports
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 5,
  "reports": [...]
}
```

### Get Report by ID
```http
GET /api/reports/:id
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "report": {
    "_id": "report_id",
    "title": "...",
    "status": "completed",
    "reportedBy": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignedTo": {
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    ...
  }
}
```

### Assign Report to Cleaner (Admin Only)
```http
PUT /api/reports/:id/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "cleanerId": "cleaner_user_id"
}

Response: 200
{
  "success": true,
  "report": {
    "_id": "report_id",
    "status": "assigned",
    "assignedTo": "cleaner_user_id"
  }
}
```

### Start Task (Cleaner)
```http
PUT /api/reports/:id/start
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "report": {
    "_id": "report_id",
    "status": "in-progress"
  }
}
```

### Complete Task with Verification (Cleaner)
```http
PUT /api/reports/:id/complete
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
  afterImage: file.jpg

Response: 200
{
  "success": true,
  "report": {
    "_id": "report_id",
    "status": "completed",
    "afterImage": "/uploads/after_image.jpg",
    "cleanupVerification": {
      "verified": true,
      "cleanupQuality": 92,
      "status": "excellent",
      "rewardMultiplier": 2.0
    },
    "rewardPoints": {
      "basePoints": 18,
      "bonusPoints": 70,
      "totalPoints": 88,
      "awarded": true
    }
  }
}
```

### Get Assigned Tasks (Cleaner)
```http
GET /api/reports/assigned/me
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 3,
  "reports": [...]
}
```

---

## Admin

### Dashboard Statistics
```http
GET /api/admin/dashboard
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "stats": {
    "totalUsers": 150,
    "totalReports": 245,
    "pendingReports": 12,
    "completedReports": 198
  }
}
```

### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 150,
  "users": [...]
}
```

### Get All Cleaners
```http
GET /api/admin/cleaners
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 25,
  "cleaners": [...]
}
```

### Get All Reports
```http
GET /api/admin/reports/all
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 245,
  "reports": [...]
}
```

### Update User Role
```http
PUT /api/admin/users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "cleaner"
}

Response: 200
{
  "success": true,
  "user": {
    "_id": "user_id",
    "role": "cleaner"
  }
}
```

---

## Users

### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen",
    "rewardPoints": 185,
    "profileImage": "/uploads/profile.jpg"
  }
}
```

### Get Reward Points
```http
GET /api/users/rewards
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "rewardPoints": 185
}
```

---

## AI Service APIs

### Health Check
```http
GET http://localhost:8000/health

Response: 200
{
  "status": "healthy",
  "models": {
    "classifier": true,
    "yolo_detector": true,
    "siamese_network": true
  }
}
```

### Classify Waste (MobileNetV2)
```http
POST http://localhost:8000/api/classify
Content-Type: multipart/form-data

FormData:
  image: file.jpg

Response: 200
{
  "success": true,
  "predictions": [
    {"class": "plastic", "confidence": 0.85},
    {"class": "organic", "confidence": 0.10},
    {"class": "other", "confidence": 0.05}
  ],
  "top_class": "plastic",
  "confidence": 0.85
}
```

### Detect Waste Objects (YOLOv8)
```http
POST http://localhost:8000/api/detect
Content-Type: multipart/form-data

FormData:
  image: file.jpg

Response: 200
{
  "success": true,
  "detections": [
    {
      "bbox": [100, 150, 300, 400],
      "confidence": 0.87,
      "class_id": 0,
      "class_name": "plastic"
    }
  ],
  "count": 5,
  "severity": {
    "level": "high",
    "score": 35,
    "priority": 2,
    "waste_count": 5,
    "dominant_type": "plastic",
    "waste_distribution": {
      "plastic": 3,
      "organic": 2
    }
  }
}
```

### Verify Cleanup (Siamese Network)
```http
POST http://localhost:8000/api/verify-cleanup
Content-Type: multipart/form-data

FormData:
  before_image: before.jpg
  after_image: after.jpg

Response: 200
{
  "success": true,
  "verification": {
    "is_cleaned": true,
    "confidence": 0.92,
    "difference_score": 0.85,
    "similarity_score": 0.15,
    "cleanup_quality": 92,
    "status": "excellent",
    "reward_multiplier": 2.0
  },
  "message": "Cleanup excellent - 92% quality"
}
```

### Full Analysis (Combined)
```http
POST http://localhost:8000/api/analyze-full
Content-Type: multipart/form-data

FormData:
  image: file.jpg

Response: 200
{
  "success": true,
  "analysis": {
    "classification": {
      "top_class": "plastic",
      "confidence": 0.85,
      "predictions": [...]
    },
    "detection": {
      "count": 5,
      "detections": [...],
      "severity": {
        "level": "high",
        "score": 35,
        "priority": 2
      }
    }
  }
}
```

---

## Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## Rate Limiting

- **Authentication endpoints:** 5 requests per minute
- **Report creation:** 10 requests per hour per user
- **AI analysis:** 20 requests per minute
- **Other endpoints:** 100 requests per minute

---

## Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Create Report:**
```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Waste on Main St" \
  -F "description=Large pile" \
  -F "category=plastic" \
  -F 'location={"type":"Point","coordinates":[77.5946,12.9716]}' \
  -F "images=@photo.jpg"
```

**AI Classification:**
```bash
curl -X POST http://localhost:8000/api/classify \
  -F "image=@waste_photo.jpg"
```

---

## WebSocket Events (Future Enhancement)

Real-time updates via Socket.IO:

**Events:**
- `report:created` - New report submitted
- `report:assigned` - Task assigned to cleaner
- `report:completed` - Cleanup completed
- `cleaner:location` - Live cleaner position updates
- `notification` - Push notifications

---

For more details, see:
- [Backend README](./backend/README.md)
- [AI Models README](./ai-models/README.md)
- [Workflow Documentation](./WORKFLOW.md)
