import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useApp } from '../context/AppContext';

export default function RewardsScreen() {
  const { user } = useApp();

  const achievements = [
    { id: 1, icon: 'star', title: 'First Report', earned: true },
    { id: 2, icon: 'trophy', title: '10 Reports', earned: true },
    { id: 3, icon: 'medal', title: '50 Reports', earned: false },
    { id: 4, icon: 'crown', title: '100 Reports', earned: false },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pointsCard}>
        <Icon name="star-circle" size={60} color="#f59e0b" />
        <Text style={styles.pointsNumber}>{user?.rewardPoints || 0}</Text>
        <Text style={styles.pointsLabel}>Total Points</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                !achievement.earned && styles.achievementLocked,
              ]}
            >
              <Icon
                name={achievement.icon}
                size={40}
                color={achievement.earned ? '#f59e0b' : '#d1d5db'}
              />
              <Text
                style={[
                  styles.achievementTitle,
                  !achievement.earned && styles.lockedText,
                ]}
              >
                {achievement.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  pointsCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pointsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
  },
  pointsLabel: { fontSize: 16, color: '#6b7280', marginTop: 8 },
  section: { padding: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementLocked: { opacity: 0.5 },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
    textAlign: 'center',
  },
  lockedText: { color: '#9ca3af' },
});
