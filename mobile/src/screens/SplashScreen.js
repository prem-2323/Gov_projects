import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SplashScreen({ navigation }) {
  const { user, loading } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          // Navigate based on user role
          if (user.role === 'citizen') {
            navigation.replace('CitizenHome');
          } else if (user.role === 'cleaner') {
            navigation.replace('CleanerHome');
          } else if (user.role === 'admin') {
            navigation.replace('AdminHome');
          }
        } else {
          navigation.replace('RoleSelection');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, loading, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>♻️</Text>
        </View>
        <Text style={styles.title}>Waste Reporter</Text>
        <Text style={styles.subtitle}>Smart City, Clean Future</Text>
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
});
