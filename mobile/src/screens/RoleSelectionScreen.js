import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RoleSelectionScreen({ navigation }) {
  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      icon: 'account',
      description: 'Report waste and track cleanup',
      color: '#3b82f6',
    },
    {
      id: 'cleaner',
      title: 'Cleaner',
      icon: 'broom',
      description: 'Manage assigned cleanup tasks',
      color: '#f59e0b',
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: 'shield-account',
      description: 'Oversee all operations',
      color: '#ef4444',
    },
  ];

  const handleRoleSelect = (role) => {
    navigation.navigate('Login', { role });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>♻️</Text>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>Choose how you'd like to contribute</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[styles.roleCard, { borderColor: role.color }]}
            onPress={() => handleRoleSelect(role.id)}
          >
            <View style={[styles.iconCircle, { backgroundColor: role.color }]}>
              <Icon name={role.icon} size={40} color="white" />
            </View>
            <Text style={styles.roleTitle}>{role.title}</Text>
            <Text style={styles.roleDescription}>{role.description}</Text>
            <View style={[styles.selectButton, { backgroundColor: role.color }]}>
              <Text style={styles.selectButtonText}>Select</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  icon: {
    fontSize: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  rolesContainer: {
    padding: 16,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
