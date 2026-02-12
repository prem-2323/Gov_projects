import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ComplaintManagementScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complaint Management</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Manage reports here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { padding: 20, paddingTop: 50, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 16, color: '#6b7280' },
});
