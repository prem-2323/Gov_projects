import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'citizen' | 'cleaner' | 'admin' | null;
  credits: number;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  reports: any[];
  setReports: (reports: any[]) => void;
  updateReport: (id: string, updates: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Demo User',
    email: 'demo@cleanmap.gov',
    phone: '+91 98765 43210',
    role: null,
    credits: 150
  });

  const [reports, setReports] = useState<any[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400',
      location: 'Anna Nagar, Chennai',
      coordinates: { lat: 13.0878, lng: 80.2785 },
      status: 'pending',
      priority: 'high',
      wasteType: 'plastic',
      date: '2026-02-08',
      aiVerified: true
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400',
      location: 'T. Nagar, Chennai',
      coordinates: { lat: 13.0418, lng: 80.2341 },
      status: 'assigned',
      priority: 'medium',
      wasteType: 'mixed',
      date: '2026-02-09',
      aiVerified: true
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400',
      location: 'Adyar, Chennai',
      coordinates: { lat: 13.0067, lng: 80.2206 },
      status: 'cleaned',
      priority: 'low',
      wasteType: 'organic',
      date: '2026-02-07',
      aiVerified: true
    }
  ]);

  const updateReport = (id: string, updates: any) => {
    setReports(reports.map(report => (report.id === id ? { ...report, ...updates } : report)));
  };

  return (
    <AppContext.Provider value={{ user, setUser, reports, setReports, updateReport }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};