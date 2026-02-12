import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider } from './src/context/AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';

// Citizen Screens
import CitizenDashboard from './src/screens/citizen/CitizenDashboard';
import ReportWasteScreen from './src/screens/citizen/ReportWasteScreen';
import MyReportsScreen from './src/screens/citizen/MyReportsScreen';
import MapViewScreen from './src/screens/citizen/MapViewScreen';

// Cleaner Screens
import CleanerDashboard from './src/screens/cleaner/CleanerDashboard';
import AssignedTaskScreen from './src/screens/cleaner/AssignedTaskScreen';

// Admin Screens
import AdminDashboard from './src/screens/admin/AdminDashboard';
import ComplaintManagementScreen from './src/screens/admin/ComplaintManagementScreen';

// Shared Screens
import ProfileScreen from './src/screens/ProfileScreen';
import ReportDetailScreen from './src/screens/ReportDetailScreen';
import RewardsScreen from './src/screens/RewardsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CitizenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Report') iconName = 'plus-circle';
          else if (route.name === 'MyReports') iconName = 'file-document';
          else if (route.name === 'Map') iconName = 'map-marker';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={CitizenDashboard} />
      <Tab.Screen name="Report" component={ReportWasteScreen} options={{ title: 'Report' }} />
      <Tab.Screen name="MyReports" component={MyReportsScreen} options={{ title: 'My Reports' }} />
      <Tab.Screen name="Map" component={MapViewScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function CleanerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Tasks') iconName = 'clipboard-check';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={CleanerDashboard} />
      <Tab.Screen name="Tasks" component={AssignedTaskScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Complaints') iconName = 'clipboard-text';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Complaints" component={ComplaintManagementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CitizenHome" component={CitizenTabs} />
            <Stack.Screen name="CleanerHome" component={CleanerTabs} />
            <Stack.Screen name="AdminHome" component={AdminTabs} />
            <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ headerShown: true, title: 'Report Details' }} />
            <Stack.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: true, title: 'Rewards' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}
