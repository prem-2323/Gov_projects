import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function MapViewScreen() {
  const { fetchReports } = useApp();
  const [location, setLocation] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initMap();
  }, []);

  const initMap = async () => {
    try {
      // Get location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        // Fallback location (City center or default)
        setLocation({
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocation({
        latitude: 12.9716,
        longitude: 77.5946,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    // Fetch reports
    const result = await fetchReports();
    if (result.success) {
      setReports(result.reports);
    }
    setLoading(false);
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'assigned':
      case 'in-progress':
        return '#3b82f6';
      case 'completed':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  if (loading || !location) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  const renderContent = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webFallback}>
          <Icon name="map-search" size={64} color="#d1d5db" />
          <Text style={styles.webFallbackText}>
            Map View is optimized for Mobile App.
          </Text>
          <Text style={styles.webFallbackSubtext}>
            Please use the Expo Go app to view the interactive map with GPS markers.
          </Text>
          <View style={styles.reportsSummary}>
            <Text style={styles.summaryTitle}>Active Reports in your area:</Text>
            {reports.slice(0, 5).map((r, i) => (
              <Text key={i} style={styles.summaryItem}>
                • {r.category} ({r.status})
              </Text>
            ))}
          </View>
        </View>
      );
    }

    return (
      <MapView style={styles.map} initialRegion={location}>
        {/* User location */}
        <Marker coordinate={location} title="Your Location">
          <View style={styles.userMarker}>
            <Icon name="account" size={20} color="white" />
          </View>
        </Marker>

        {/* Report markers */}
        {reports.map((report) => {
          if (report.location?.latitude && report.location?.longitude) {
            return (
              <Marker
                key={report._id}
                coordinate={{
                  latitude: report.location.latitude,
                  longitude: report.location.longitude,
                }}
                title={report.category}
                description={report.status}
              >
                <View
                  style={[
                    styles.wasteMarker,
                    { backgroundColor: getMarkerColor(report.status) },
                  ]}
                >
                  <Icon name="trash-can" size={16} color="white" />
                </View>
              </Marker>
            );
          }
          return null;
        })}
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Waste Map</Text>
        <Text style={styles.subtitle}>{reports.length} reports nearby</Text>
      </View>

      {renderContent()}

      {Platform.OS !== 'web' && (
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Pending</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
            <Text style={styles.legendText}>In Progress</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  map: {
    flex: 1,
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  webFallbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  webFallbackSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  reportsSummary: {
    marginTop: 32,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryItem: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 6,
  },
  userMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  wasteMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
