import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function ReportWasteScreen({ navigation }) {
  const { createReport } = useApp();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Getting location...');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'plastic', label: 'Plastic', icon: 'bottle-soda' },
    { id: 'organic', label: 'Organic', icon: 'leaf' },
    { id: 'electronic', label: 'Electronic', icon: 'laptop' },
    { id: 'hazardous', label: 'Hazardous', icon: 'biohazard' },
    { id: 'metal', label: 'Metal', icon: 'iron' },
    { id: 'glass', label: 'Glass', icon: 'glass-wine' },
    { id: 'paper', label: 'Paper', icon: 'file-document' },
    { id: 'other', label: 'Other', icon: 'dots-horizontal' },
  ];

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Get address from coordinates
      const addressData = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (addressData.length > 0) {
        const addr = addressData[0];
        setAddress(
          `${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Could not get location');
      console.error(error);
    }
  };

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open camera');
      console.error(error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not pick image');
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('Error', 'Please capture or select an image');
      return;
    }

    if (!category) {
      Alert.alert('Error', 'Please select a waste category');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please add a description');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'Location not available. Please try again.');
      return;
    }

    setLoading(true);
    
    const result = await createReport({
      image,
      description,
      category,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address,
      },
    });

    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Report submitted successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setImage(null);
            setDescription('');
            setCategory('');
            navigation.navigate('Dashboard');
          },
        },
      ]);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report Waste</Text>
        <Text style={styles.subtitle}>Help keep our city clean</Text>
      </View>

      {/* Location Display */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="map-marker" size={20} color="#10b981" />
          <Text style={styles.sectionTitle}>Location</Text>
        </View>
        <View style={styles.locationCard}>
          <Text style={styles.locationText}>{address}</Text>
          <TouchableOpacity onPress={getLocation} style={styles.refreshButton}>
            <Icon name="refresh" size={20} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Capture */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="camera" size={20} color="#10b981" />
          <Text style={styles.sectionTitle}>Photo</Text>
        </View>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setImage(null)}
            >
              <Icon name="close-circle" size={30} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.imageButton} onPress={takePicture}>
              <Icon name="camera" size={30} color="#10b981" />
              <Text style={styles.imageButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Icon name="image" size={30} color="#3b82f6" />
              <Text style={styles.imageButtonText}>Choose Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Category Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="format-list-bulleted" size={20} color="#10b981" />
          <Text style={styles.sectionTitle}>Category</Text>
        </View>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                category === cat.id && styles.categoryCardSelected,
              ]}
              onPress={() => setCategory(cat.id)}
            >
              <Icon
                name={cat.icon}
                size={24}
                color={category === cat.id ? '#10b981' : '#6b7280'}
              />
              <Text
                style={[
                  styles.categoryText,
                  category === cat.id && styles.categoryTextSelected,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="text" size={20} color="#10b981" />
          <Text style={styles.sectionTitle}>Description</Text>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="Describe the waste issue..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Icon name="send" size={20} color="white" />
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
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
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  locationCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  refreshButton: {
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  imageButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  imageButtonText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  categoryCardSelected: {
    borderColor: '#10b981',
    backgroundColor: '#d1fae5',
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#10b981',
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    fontSize: 14,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
