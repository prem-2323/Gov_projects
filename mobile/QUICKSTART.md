# 📱 Quick Start Guide - Mobile App with Expo Go

This is a step-by-step guide to run the Waste Reporter mobile app on your phone using Expo Go.

## Prerequisites Checklist

- [ ] **Expo Go App** installed on your phone
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [ ] Node.js installed on your computer
- [ ] Backend server ready to run
- [ ] Phone and computer on the **same WiFi network**

## Step-by-Step Instructions

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm install  # (First time only)
npm run dev
```

✅ You should see: `Server running on port 5000`

**Keep this terminal window open!**

### Step 2: Find Your Computer's Local IP Address

**On Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (e.g., `192.168.1.100`)

**On Mac/Linux:**
```bash
ifconfig
```
Look for "inet" under your active network interface (e.g., `192.168.1.100`)

**Write down this IP address - you'll need it!**

### Step 3: Configure the Mobile App

1. Open a new terminal (keep backend running)
2. Navigate to mobile folder:
   ```bash
   cd mobile
   npm install  # (First time only)
   ```

3. Open `src/context/AppContext.js` in your code editor

4. Find this line:
   ```javascript
   const API_URL = 'http://192.168.1.100:5000/api';
   ```

5. Replace `192.168.1.100` with **your actual IP address** from Step 2:
   ```javascript
   const API_URL = 'http://YOUR_IP_HERE:5000/api';
   ```

6. Save the file

### Step 4: Start the Expo Development Server

In the mobile folder terminal, run:

```bash
npm start
```

✅ You should see:
- A QR code in the terminal
- A message saying the development server is running
- A browser window might open with Expo Dev Tools

**Keep this terminal window open!**

### Step 5: Open the App on Your Phone

**On Android:**
1. Open the **Expo Go** app
2. Tap **"Scan QR Code"**
3. Point your camera at the QR code in the terminal
4. The app will start loading

**On iPhone:**
1. Open the **Camera** app (not Expo Go)
2. Point it at the QR code in the terminal
3. Tap the notification that appears
4. The app will open in Expo Go

**Alternative Method:**
- In Expo Go, tap "Enter URL manually"
- Type the URL shown below the QR code (e.g., `exp://192.168.1.100:8081`)

### Step 6: Test the App

1. Wait for the app to load (first time might take a minute)
2. You should see the **Splash Screen** with a recycling icon
3. After 2 seconds, you'll see the **Role Selection** screen
4. Select "Citizen" to test the app
5. Register a new account or login

**Test these features:**
- ✅ Take a photo with the camera
- ✅ Report waste with GPS location
- ✅ View your reports
- ✅ Check the map view

## 🎉 Success!

If you can see the app and take photos, congratulations! The app is running successfully.

## ❌ Troubleshooting

### Problem: QR Code won't scan

**Solution:**
1. Make sure Expo Go is installed
2. Try manually entering the URL shown below the QR code
3. Restart the Expo server: Press `r` in the terminal

### Problem: "Network request failed" or "Unable to connect"

**Solutions:**
1. **Check WiFi**: Ensure phone and computer are on the same network
2. **Check Backend**: Make sure backend is running (`npm run dev` in backend folder)
3. **Verify IP Address**: Double-check the IP in `AppContext.js` matches your computer's IP
4. **Check Firewall**: Temporarily disable firewall to test
5. **Try Different IP**: Run `ipconfig`/`ifconfig` again to confirm IP hasn't changed

### Problem: Camera or Location not working

**Solutions:**
1. Go to your phone's **Settings**
2. Find **Expo Go** in app settings
3. Grant **Camera** and **Location** permissions
4. Close and reopen the app

### Problem: App crashes or shows errors

**Solutions:**
1. In the terminal running Expo, press `r` to reload
2. Shake your phone to open the developer menu
3. Tap "Reload" in the developer menu
4. If that doesn't work, stop Expo (`Ctrl+C`) and restart with `npm start`

### Problem: "Unable to resolve module"

**Solution:**
```bash
cd mobile
rm -rf node_modules
npm install
npm start
```

## 🔄 Daily Development Workflow

Once everything is set up, your daily workflow is simple:

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Mobile App** (Terminal 2):
   ```bash
   cd mobile
   npm start
   ```

3. **Open Expo Go** on your phone
4. Scan the QR code or tap the recently opened project
5. Start developing! 🎉

## 💡 Tips

- **Hot Reload**: Changes to your code will automatically reload the app
- **Shake to Debug**: Shake your phone to open the developer menu
- **Console Logs**: Check the terminal to see console.log outputs
- **Multiple Devices**: You can scan the same QR code on multiple phones

## 📞 Need More Help?

- Check the full [mobile/README.md](./README.md) for detailed documentation
- Visit [Expo Documentation](https://docs.expo.dev/)
- Open an issue on GitHub

---

**Happy Coding! 🚀**
