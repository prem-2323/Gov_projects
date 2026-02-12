# Geo-Tagged Waste Reporting App

A comprehensive waste management system with AI-powered waste detection, geolocation tracking, and role-based management for citizens, cleaners, and administrators.

## 🚀 Features

- **Smart Waste Reporting** - Citizens can report waste with photos and GPS location
- **AI Classification** - Automatic waste categorization using MobileNetV2 (8 waste types)
- **Object Detection** - YOLOv8-powered waste detection with severity analysis
- **Cleanup Verification** - Siamese Network for before/after image comparison
- **Priority Assignment** - Automatic priority scoring (1-5) based on severity
- **Real-time Tracking** - Track waste cleanup status with Google Maps integration
- **Task Assignment** - Admin can assign cleanup tasks to nearest cleaners
- **Rewards System** - Dynamic points with multipliers based on severity and quality
- **Analytics Dashboard** - Comprehensive insights for administrators
- **Mobile-First Design** - Responsive UI for all devices

## 📁 Project Structure

```
Gov_projects/
├── frontend/           # React + TypeScript web app
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.ts
│
├── mobile/             # React Native + Expo mobile app
│   ├── src/
│   │   ├── screens/    # App screens (Citizen/Cleaner/Admin)
│   │   └── context/    # State management
│   ├── App.js          # Main app entry
│   ├── app.json        # Expo configuration
│   └── package.json    # Expo dependencies
│
├── backend/            # Node.js + Express API
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration
│   ├── utils/          # Utilities
│   └── server.js       # Entry point
│
└── ai-models/          # Python AI/ML models
    ├── training/       # Model training scripts
    ├── inference/      # Prediction API
    ├── datasets/       # Training data
    ├── pretrained/     # Saved models
    └── app.py          # Flask API server
```

## 🛠️ Tech Stack

### Frontend (Web)
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS + shadcn/ui
- Context API for state management

### Mobile App
- React Native with Expo SDK 50
- Expo Camera & Location APIs
- React Navigation for routing
- React Native Maps for location tracking
- React Native Paper for UI components
- AsyncStorage for local data

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads

### AI Models
- Python + Flask
- TensorFlow/Keras  
- PyTorch + YOLOv8 for object detection
- Siamese Network for image comparison
- OpenCV for image processing
- Transfer learning with MobileNetV2

### Integrations
- Google Maps API for geocoding and location services
- Real-time location tracking
- JWT-based authentication

## 📋 Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/prem-2323/Gov_projects.git
cd Gov_projects
```

### 2. Setup Frontend (Web)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 3. Setup Mobile App (React Native + Expo)

```bash
cd mobile
npm install

# Update API_URL in src/context/AppContext.js to your local IP
# Example: const API_URL = 'http://192.168.1.100:5000/api'

npm start
```

**To run on your phone:**
1. Install **Expo Go** app from App Store/Play Store
2. Scan the QR code shown in terminal
3. App will open in Expo Go

**Important:** Your phone and computer must be on the same WiFi network!

See [mobile/README.md](./mobile/README.md) for detailed mobile setup instructions.

### 4. Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

Backend API runs at: `http://localhost:5000`

### 5. Setup AI Models

```bash
cd ai-models
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python app.py
```

AI API runs at: `http://localhost:8000`

## 📱 User Roles

### 🙋 Citizen
- Report waste with photos and location
- Track report status
- Earn reward points
- View cleanup statistics

### 🧹 Cleaner
- View assigned tasks
- Update cleanup progress
- Upload before/after photos
- Complete cleanup reports

### 👨‍💼 Admin
- Manage all reports
- Assign tasks to cleaners
- View analytics dashboard
- Manage users and roles

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_AI_MODEL_URL=http://localhost:8000/api
```

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/waste-reporting
JWT_SECRET=your_secret_key_here
AI_MODEL_URL=http://localhost:8000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Reports
- `POST /api/reports` - Create report
- `GET /api/reports/my-reports` - Get user reports
- `PUT /api/reports/:id/assign` - Assign to cleaner (Admin)

### AI Classification
- `POST /api/classify` - Classify waste image

## 📖 Complete Documentation

For detailed technical documentation, see:
- **[WORKFLOW.md](./WORKFLOW.md)** - Complete system workflow, ML model architectures, process flows, and database schemas
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Comprehensive API reference with request/response examples for all endpoints

See individual README files for setup instructions:
- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [AI Models Documentation](./ai-models/README.md)

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run lint
```

### Backend
```bash
cd backend
npm test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/AWS)
```bash
cd backend
# Configure production environment
npm start
```

### AI Models (Docker)
```bash
cd ai-models
docker build -t waste-ai-api .
docker run -p 8000:8000 waste-ai-api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Prem Kumar**
- GitHub: [@prem-2323](https://github.com/prem-2323)

## 🙏 Acknowledgments

- OpenStreetMap for mapping
- TensorFlow for ML framework
- shadcn for UI components
- MongoDB for database

---

**Built with ❤️ for Smart City Waste Management**
