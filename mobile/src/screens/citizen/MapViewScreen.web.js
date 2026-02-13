import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

// NO react-native-maps import here!

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
            // For web, use browser geolocation or fallback
            if (typeof window !== 'undefined' && 'geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    () => {
                        // Fallback
                        setLocation({ latitude: 12.9716, longitude: 77.5946 });
                    }
                );
            } else {
                setLocation({ latitude: 12.9716, longitude: 77.5946 });
            }
        } catch (error) {
            setLocation({ latitude: 12.9716, longitude: 77.5946 });
        }

        // Fetch reports
        const result = await fetchReports();
        if (result.success) {
            setReports(result.reports);
        }
        setLoading(false);
    };

    if (loading || !location) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#10b981" />
                <Text style={styles.loadingText}>Loading reports...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Waste Statistics</Text>
                <Text style={styles.subtitle}>{reports.length} reports in your area</Text>
            </View>

            <View style={styles.webFallback}>
                <Icon name="map-search" size={64} color="#d1d5db" />
                <Text style={styles.webFallbackText}>
                    Map View is optimized for Mobile App.
                </Text>
                <Text style={styles.webFallbackSubtext}>
                    Please use the Expo Go app on your phone to view the interactive live map with GPS markers.
                </Text>

                <View style={styles.reportsSummary}>
                    <Text style={styles.summaryTitle}>Live Report Feed:</Text>
                    {reports.length > 0 ? (
                        reports.slice(0, 8).map((r, i) => (
                            <View key={i} style={styles.summaryItemRow}>
                                <Icon
                                    name={r.status === 'completed' ? 'check-circle' : 'clock-outline'}
                                    size={16}
                                    color={r.status === 'completed' ? '#10b981' : '#f59e0b'}
                                />
                                <Text style={styles.summaryItem}>
                                    {r.category.toUpperCase()} - {r.status} ({new Date(r.createdAt).toLocaleDateString()})
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noReports}>No reports found in your area yet.</Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
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
    webFallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        maxWidth: 300,
    },
    reportsSummary: {
        marginTop: 32,
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#f9fafb',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 16,
    },
    summaryItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    summaryItem: {
        fontSize: 14,
        color: '#4b5563',
    },
    noReports: {
        textAlign: 'center',
        color: '#9ca3af',
        fontStyle: 'italic',
    }
});
