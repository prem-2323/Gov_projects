import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default function AssignedTaskScreen() {
  const tasks = [
    { id: '1', category: 'Plastic', location: '123 Main St', status: 'pending' },
    { id: '2', category: 'Organic', location: '456 Oak Ave', status: 'in-progress' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assigned Tasks</Text>
        <Text style={styles.subtitle}>{tasks.length} tasks</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Icon name="trash-can" size={24} color="#10b981" />
            <View style={styles.taskContent}>
              <Text style={styles.taskCategory}>{item.category}</Text>
              <Text style={styles.taskLocation}>{item.location}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { padding: 20, paddingTop: 50, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  list: { padding: 16 },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    gap: 12,
  },
  taskContent: { flex: 1 },
  taskCategory: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  taskLocation: { fontSize: 14, color: '#6b7280', marginTop: 4 },
});
