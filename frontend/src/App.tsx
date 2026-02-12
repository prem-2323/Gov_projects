import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import RoleSelectionScreen from './components/screens/RoleSelectionScreen';
import CitizenDashboard from './components/screens/citizen/CitizenDashboard';
import ReportWasteScreen from './components/screens/citizen/ReportWasteScreen';
import AIVerificationScreen from './components/screens/citizen/AIVerificationScreen';
import MyReportsScreen from './components/screens/citizen/MyReportsScreen';
import MapViewScreen from './components/screens/citizen/MapViewScreen';
import ReportDetailScreen from './components/screens/ReportDetailScreen';
import CleanerDashboard from './components/screens/cleaner/CleanerDashboard';
import AssignedTaskScreen from './components/screens/cleaner/AssignedTaskScreen';
import UploadAfterCleanScreen from './components/screens/cleaner/UploadAfterCleanScreen';
import AdminDashboard from './components/screens/admin/AdminDashboard';
import ComplaintManagementScreen from './components/screens/admin/ComplaintManagementScreen';
import AssignStaffScreen from './components/screens/admin/AssignStaffScreen';
import AnalyticsScreen from './components/screens/admin/AnalyticsScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import EditProfileScreen from './components/screens/EditProfileScreen';
import RewardsScreen from './components/screens/RewardsScreen';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        {/* Mobile Container - max width 480px centered on desktop */}
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="w-full max-w-[480px] min-h-screen bg-gray-50 shadow-2xl relative">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/role-selection" element={<RoleSelectionScreen />} />
              
              {/* Citizen Routes */}
              <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
              <Route path="/citizen/report-waste" element={<ReportWasteScreen />} />
              <Route path="/citizen/ai-verification" element={<AIVerificationScreen />} />
              <Route path="/citizen/my-reports" element={<MyReportsScreen />} />
              <Route path="/citizen/map-view" element={<MapViewScreen />} />
              <Route path="/citizen/report/:id" element={<ReportDetailScreen />} />
              
              {/* Cleaner Routes */}
              <Route path="/cleaner/dashboard" element={<CleanerDashboard />} />
              <Route path="/cleaner/task/:id" element={<AssignedTaskScreen />} />
              <Route path="/cleaner/upload-after-clean/:id" element={<UploadAfterCleanScreen />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/complaints" element={<ComplaintManagementScreen />} />
              <Route path="/admin/assign-staff/:id" element={<AssignStaffScreen />} />
              <Route path="/admin/analytics" element={<AnalyticsScreen />} />
              
              {/* Common Routes */}
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/edit-profile" element={<EditProfileScreen />} />
              <Route path="/rewards" element={<RewardsScreen />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;