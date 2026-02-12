# Waste Reporter Mobile App 📱

A React Native mobile application built with Expo for reporting and managing waste in your city. This app allows citizens to report waste with GPS location and photos, cleaners to manage cleanup tasks, and admins to oversee operations.

## 🚀 Features

- **📷 Camera Integration** - Capture waste photos directly from the app
- **📍 GPS Location Tracking** - Automatic location tagging for reports
- **🗺️ Interactive Map** - View all waste reports on a map
- **🎯 Role-Based Access** - Separate interfaces for Citizens, Cleaners, and Admins
- **⭐ Rewards System** - Earn points for reporting and cleaning waste
- **🔔 Real-time Updates** - Track report status in real-time
- **📊 Analytics Dashboard** - View statistics and progress

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- **Expo Go app** installed on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🛠️ Installation

### 1. Navigate to mobile folder

```bash
cd mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Backend URL

Open `src/context/AppContext.js` and update the API_URL to your computer's local IP address:

```javascript
const API_URL = 'http://YOUR_LOCAL_IP:5000/api'; // e.g., 'http://192.168.1.100:5000/api'
```

**To find your local IP:**
- **Windows**: Open CMD and run `ipconfig`, look for "IPv4 Address"
- **Mac/Linux**: Open Terminal and run `ifconfig`, look for "inet" under your active network interface

**Important:** 
- Don't use `localhost` or `127.0.0.1` as the mobile app won't be able to connect to your backend
- Make sure your phone and computer are on the same WiFi network

## 🚀 Running the App with Expo Go

### Step 1: Start the Backend Server

First, make sure your backend server is running:

```bash
cd ../backend
npm run dev
```

The backend should be running on `http://localhost:5000`

### Step 2: Start the Expo Development Server

```bash
cd ../mobile
npm start
```

This will start the Expo development server and show a QR code in your terminal.

### Step 3: Open in Expo Go

**On Android:**
1. Open the **Expo Go** app on your Android device
2. Tap **"Scan QR Code"**
3. Point your camera at the QR code shown in the terminal
4. The app will load and open automatically

**On iOS:**
1. Open the **Camera** app on your iPhone
2. Point it at the QR code shown in the terminal
3. Tap the notification that appears
4. The app will open in **Expo Go**

### Alternative Methods

You can also run specific commands:

```bash
# Start with Android emulator
npm run android

# Start with iOS simulator (Mac only)
npm run ios

# Start for web (browser)
npm run web
```

## 📱 App Structure

```
mobile/
├── App.js                      # Main app entry point with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
└── src/
    ├── context/
    │   └── AppContext.js       # Global state management
    ├── screens/
    │   ├── SplashScreen.js     # Initial loading screen
    │   ├── RoleSelectionScreen.js  # Role selection (Citizen/Cleaner/Admin)
    │   ├── LoginScreen.js      # Login/Register screen
    │   ├── ProfileScreen.js    # User profile
    │   ├── ReportDetailScreen.js   # Report details
    │   ├── RewardsScreen.js    # Rewards and achievements
    │   ├── citizen/            # Citizen-specific screens
    │   │   ├── CitizenDashboard.js
    │   │   ├── ReportWasteScreen.js  # Report with camera & GPS
    │   │   ├── MyReportsScreen.js
    │   │   └── MapViewScreen.js
    │   ├── cleaner/            # Cleaner-specific screens
    │   │   ├── CleanerDashboard.js
    │   │   └── AssignedTaskScreen.js
    │   └── admin/              # Admin-specific screens
    │       ├── AdminDashboard.js
    │       └── ComplaintManagementScreen.js
```

## 🎯 User Roles

### 👤 Citizen
- Report waste with photos and GPS location
- Track status of submitted reports
- View waste map
- Earn reward points

### 🧹 Cleaner
- View assigned cleanup tasks
- Update task progress
- Upload completion photos
- Earn points for completed tasks

### 👨‍💼 Admin
- View analytics dashboard
- Manage all reports
- Assign tasks to cleaners
- Monitor system activity

## 📸 Testing the Camera Feature

When you first try to use the camera or location features, the app will request permissions:

1. **Camera Permission**: Required for capturing waste photos
2. **Location Permission**: Required for GPS tagging reports

Make sure to **allow** these permissions when prompted.

## 🐛 Troubleshooting

### App won't connect to backend

1. **Check if backend is running**: 
   ```bash
   cd backend
   npm run dev
   ```

2. **Verify your local IP address**:
   - Update `API_URL` in `src/context/AppContext.js`
   - Use your computer's local IP (e.g., `192.168.1.100:5000`)
   - Never use `localhost` or `127.0.0.1`

3. **Ensure same WiFi network**:
   - Your phone and computer must be on the same network

### QR code won't scan

1. Make sure you have **Expo Go** installed on your device
2. Try typing the URL manually in Expo Go (shown below the QR code)
3. Restart the Expo development server: `npm start` → Press `r`

### Camera/Location not working

1. Check app permissions in your phone's Settings
2. Grant Camera and Location permissions to Expo Go
3. Restart the app after granting permissions

### "Network request failed" errors

1. Check firewall settings on your computer
2. Ensure port 5000 (backend) is not blocked
3. Try disabling VPN if you're using one

## 📦 Building for Production

### Android APK

```bash
expo build:android
```

### iOS IPA (requires Apple Developer account)

```bash
expo build:ios
```

### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🔑 Environment Variables

Create a `.env` file in the mobile directory (optional):

```env
API_URL=http://YOUR_LOCAL_IP:5000/api
```

## 📚 Key Dependencies

- **expo**: ~50.0.0 - Expo SDK
- **react-navigation**: Navigation library
- **expo-camera**: Camera access
- **expo-location**: GPS location
- **expo-image-picker**: Photo selection
- **react-native-maps**: Interactive maps
- **react-native-paper**: UI components
- **axios**: HTTP requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Prem Kumar**
- GitHub: [@prem-2323](https://github.com/prem-2323)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community
- shadcn/ui for design inspiration

---

**Need help?** Open an issue on GitHub or contact the development team.

**Built with ❤️ using Expo and React Native**
