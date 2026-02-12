import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Camera, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../BottomNav';

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  const handleSave = () => {
    setUser({
      ...user,
      name,
      email,
      phone
    });
    navigate(-1);
  };

  const handleProfilePhotoUpload = () => {
    // Simulate photo upload
    setProfilePhoto('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200');
  };

  const handleCoverPhotoUpload = () => {
    // Simulate cover photo upload
    setCoverPhoto('https://images.unsplash.com/photo-1557683316-973673baf926?w=800');
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-5 px-6 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Edit Profile</h1>
            <p className="text-blue-100 text-xs">Update your information</p>
          </div>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="relative">
        <div 
          className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden cursor-pointer"
          onClick={handleCoverPhotoUpload}
        >
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-white/60 mx-auto mb-2" />
                <p className="text-white/80 text-xs font-semibold">Tap to add cover photo</p>
              </div>
            </div>
          )}
          <button
            onClick={handleCoverPhotoUpload}
            className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 rounded-lg flex items-center justify-center shadow-md"
          >
            <Camera className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        {/* Profile Photo - Overlapping Cover */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-blue-600" strokeWidth={2} />
              )}
            </div>
            <button
              onClick={handleProfilePhotoUpload}
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-md"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="px-6 pt-16 pb-6">
        <p className="text-blue-600 text-xs font-semibold mb-6">Profile Information</p>

        <div className="space-y-5">
          {/* Name */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
            <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-blue-900 font-medium"
            />
          </div>

          {/* Email */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
            <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-blue-900 font-medium"
            />
          </div>

          {/* Phone */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
            <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-blue-900 font-medium"
            />
          </div>

          {/* Role (Read-only) */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
            <label className="block text-blue-900 font-bold mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Role
            </label>
            <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-900 font-semibold capitalize">{user.role || 'User'}</p>
              <p className="text-blue-600 text-xs mt-1">Role can be changed from settings</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full bg-white border-2 border-blue-200 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-blue-900 font-semibold mb-2 text-sm">📝 Note</p>
          <p className="text-blue-700 text-xs">
            Your profile information is private and secure. Only you can see and edit these details.
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}