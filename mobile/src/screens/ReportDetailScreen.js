import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default function ReportDetailScreen({ route }) {
  const { reportId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <Icon name="image" size={60} color="#d1d5db" />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Plastic Waste</Text>
          <View style={[styles.badge, { backgroundColor: '#fef3c7' }]}>
            <Text style={[styles.badgeText, { color: '#f59e0b' }]}>Pending</Text>
          </View>
        </View>
        <Text style={styles.description}>
          Large pile of plastic bottles and containers found at this location.
        </Text>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color="#6b7280" />
            <Text style={styles.infoText}>123 Main Street, City</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#6b7280" />
            <Text style={styles.infoText}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  imageContainer: { height: 300, backgroundColor: 'white' },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  content: { padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  description: { fontSize: 16, color: '#6b7280', marginBottom: 20 },
  infoSection: { backgroundColor: 'white', padding: 16, borderRadius: 12 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoText: { fontSize: 14, color: '#1f2937' },
});
