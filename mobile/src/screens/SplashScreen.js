import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SplashScreen({ navigation }) {
  const [navigated, setNavigated] = useState(false);
  
  // Try to get context, but don't fail if it's not available
  let user = null;
  let loading = true;
  
  try {
    const context = useApp();
    user = context.user;
    loading = context.loading;
  } catch (error) {
    console.error('Error accessing AppContext:', error);
    loading = false;
  }

  useEffect(() => {
    console.log('SplashScreen mounted, loading:', loading, 'user:', user);
    
    if (navigated) return;

    const navigate = () => {
      if (navigated) return;
      
      console.log('Attempting navigation, user:', user);
      setNavigated(true);
      
      try {
        if (user) {
          // Navigate based on user role
          if (user.role === 'citizen') {
            navigation.replace('CitizenHome');
          } else if (user.role === 'cleaner') {
            navigation.replace('CleanerHome');
          } else if (user.role === 'admin') {
            navigation.replace('AdminHome');
          } else {
            navigation.replace('RoleSelection');
          }
        } else {
          navigation.replace('RoleSelection');
        }
      } catch (navError) {
        console.error('Navigation error:', navError);
      }
    };

    // If loading is complete, wait 1 second then navigate
    if (!loading) {
      console.log('Loading complete, will navigate in 1 second');
      const timer = setTimeout(navigate, 1000);
      return () => clearTimeout(timer);
    }
    
    // Failsafe: Always navigate after 3 seconds maximum
    const maxTimer = setTimeout(() => {
      console.log('Max timeout reached, forcing navigation');
      navigate();
    }, 3000);
    
    return () => clearTimeout(maxTimer);
  }, [loading, user, navigation, navigated]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>♻️</Text>
        </View>
        <Text style={styles.title}>Waste Reporter</Text>
        <Text style={styles.subtitle}>Smart City, Clean Future</Text>
        <ActivityIndicator 
          size="large" 
          color="white" 
          style={styles.loader} 
        />
        <Text style={styles.statusText}>
          {loading ? 'Loading...' : 'Starting...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  loader: {
    marginTop: 32,
  },
  statusText: {
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
});
