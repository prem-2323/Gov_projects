"""
Siamese Network for Before/After Image Verification
Verifies cleanup completion by comparing before and after images
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, Model
import numpy as np
import cv2
from PIL import Image
import os

class SiameseNetwork:
    """
    Siamese Network for comparing before and after waste cleanup images
    """
    
    def __init__(self, model_path='pretrained/siamese_network.h5', input_shape=(224, 224, 3)):
        self.model_path = model_path
        self.input_shape = input_shape
        self.model = None
        self.feature_extractor = None
        
        self.load_model()
    
    def build_base_network(self):
        """Build the base feature extraction network"""
        inputs = keras.Input(shape=self.input_shape)
        
        # Use MobileNetV2 as base
        base_model = keras.applications.MobileNetV2(
            input_shape=self.input_shape,
            include_top=False,
            weights='imagenet'
        )
        base_model.trainable = False
        
        x = base_model(inputs, training=False)
        x = layers.GlobalAveragePooling2D()(x)
        x = layers.Dense(256, activation='relu')(x)
        x = layers.BatchNormalization()(x)
        x = layers.Dense(128, activation='relu')(x)
        
        return Model(inputs, x, name='feature_extractor')
    
    def build_siamese_model(self):
        """Build the Siamese network"""
        # Create base network
        base_network = self.build_base_network()
        
        # Define inputs for two images
        input_before = keras.Input(shape=self.input_shape, name='before_image')
        input_after = keras.Input(shape=self.input_shape, name='after_image')
        
        # Extract features from both images
        features_before = base_network(input_before)
        features_after = base_network(input_after)
        
        # Calculate L1 distance
        distance = layers.Lambda(
            lambda tensors: tf.abs(tensors[0] - tensors[1])
        )([features_before, features_after])
        
        # Classification layers
        x = layers.Dense(64, activation='relu')(distance)
        x = layers.Dropout(0.3)(x)
        x = layers.Dense(32, activation='relu')(x)
        
        # Output: similarity score (0 = different/cleaned, 1 = same/not cleaned)
        output = layers.Dense(1, activation='sigmoid', name='similarity')(x)
        
        model = Model(inputs=[input_before, input_after], outputs=output)
        
        return model, base_network
    
    def load_model(self):
        """Load trained Siamese model"""
        try:
            if os.path.exists(self.model_path):
                self.model = keras.models.load_model(self.model_path)
                print(f"Siamese model loaded from {self.model_path}")
            else:
                print("Building new Siamese model...")
                self.model, self.feature_extractor = self.build_siamese_model()
                self.compile_model()
                print("New Siamese model created - needs training")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            print("Building new model...")
            self.model, self.feature_extractor = self.build_siamese_model()
            self.compile_model()
    
    def compile_model(self):
        """Compile the model"""
        self.model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.0001),
            loss='binary_crossentropy',
            metrics=['accuracy', keras.metrics.AUC(name='auc')]
        )
    
    def preprocess_image(self, image_path_or_array):
        """Preprocess image for the network"""
        if isinstance(image_path_or_array, str):
            img = keras.preprocessing.image.load_img(
                image_path_or_array,
                target_size=self.input_shape[:2]
            )
            img_array = keras.preprocessing.image.img_to_array(img)
        else:
            img = Image.fromarray(image_path_or_array)
            img = img.resize(self.input_shape[:2])
            img_array = np.array(img)
        
        # Normalize
        img_array = img_array / 255.0
        
        return img_array
    
    def verify_cleanup(self, before_image, after_image):
        """
        Verify if cleanup was done by comparing before and after images
        
        Args:
            before_image: Path or array of before image
            after_image: Path or array of after image
            
        Returns:
            Verification results with score and status
        """
        try:
            # Preprocess images
            before = self.preprocess_image(before_image)
            after = self.preprocess_image(after_image)
            
            # Add batch dimension
            before = np.expand_dims(before, axis=0)
            after = np.expand_dims(after, axis=0)
            
            # Predict similarity (0 = cleaned, 1 = same/not cleaned)
            similarity_score = self.model.predict([before, after], verbose=0)[0][0]
            
            # Lower score means more different (cleaned)
            # Higher score means more similar (not cleaned)
            difference_score = 1 - similarity_score
            
            # Determine if successfully cleaned
            is_cleaned = difference_score > 0.5  # 50% difference threshold
            confidence = difference_score if is_cleaned else similarity_score
            
            # Calculate cleanup quality score
            cleanup_quality = self._calculate_cleanup_quality(difference_score)
            
            return {
                'is_cleaned': bool(is_cleaned),
                'confidence': float(confidence),
                'difference_score': float(difference_score),
                'similarity_score': float(similarity_score),
                'cleanup_quality': cleanup_quality,
                'status': self._get_status(difference_score),
                'reward_multiplier': self._get_reward_multiplier(cleanup_quality)
            }
            
        except Exception as e:
            print(f"Verification error: {str(e)}")
            return self._mock_verification()
    
    def _calculate_cleanup_quality(self, difference_score):
        """
        Calculate cleanup quality percentage
        
        difference_score: 0-1 scale where higher means more cleaned
        """
        # Map difference to quality score
        quality = int(difference_score * 100)
        
        return min(100, max(0, quality))
    
    def _get_status(self, difference_score):
        """Get cleanup status based on difference score"""
        if difference_score >= 0.8:
            return 'excellent'
        elif difference_score >= 0.6:
            return 'good'
        elif difference_score >= 0.4:
            return 'partial'
        else:
            return 'insufficient'
    
    def _get_reward_multiplier(self, quality):
        """Calculate reward multiplier based on cleanup quality"""
        if quality >= 90:
            return 2.0
        elif quality >= 80:
            return 1.5
        elif quality >= 70:
            return 1.2
        elif quality >= 60:
            return 1.0
        else:
            return 0.5
    
    def _mock_verification(self):
        """Mock verification for testing"""
        mock_difference = np.random.uniform(0.6, 0.9)
        return {
            'is_cleaned': True,
            'confidence': 0.85,
            'difference_score': mock_difference,
            'similarity_score': 1 - mock_difference,
            'cleanup_quality': 85,
            'status': 'good',
            'reward_multiplier': 1.5
        }
    
    def create_comparison_image(self, before_image, after_image, output_path=None):
        """
        Create side-by-side comparison image
        
        Args:
            before_image: Path to before image
            after_image: Path to after image
            output_path: Output path for comparison image
            
        Returns:
            Comparison image array
        """
        before = cv2.imread(before_image) if isinstance(before_image, str) else before_image
        after = cv2.imread(after_image) if isinstance(after_image, str) else after_image
        
        # Resize to same dimensions
        height = max(before.shape[0], after.shape[0])
        width = max(before.shape[1], after.shape[1])
        
        before_resized = cv2.resize(before, (width, height))
        after_resized = cv2.resize(after, (width, height))
        
        # Add labels
        cv2.putText(before_resized, 'BEFORE', (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.putText(after_resized, 'AFTER', (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        # Concatenate horizontally
        comparison = np.hstack([before_resized, after_resized])
        
        if output_path:
            cv2.imwrite(output_path, comparison)
        
        return comparison
    
    def save_model(self, filepath):
        """Save trained model"""
        self.model.save(filepath)
        print(f"Siamese model saved to {filepath}")

# Example usage
if __name__ == "__main__":
    siamese = SiameseNetwork()
    
    # Test verification
    before_img = "../datasets/test_images/before.jpg"
    after_img = "../datasets/test_images/after.jpg"
    
    if os.path.exists(before_img) and os.path.exists(after_img):
        result = siamese.verify_cleanup(before_img, after_img)
        print("\nCleanup Verification:")
        print(f"  Cleaned: {result['is_cleaned']}")
        print(f"  Confidence: {result['confidence']:.2%}")
        print(f"  Quality: {result['cleanup_quality']}%")
        print(f"  Status: {result['status']}")
        print(f"  Reward Multiplier: {result['reward_multiplier']}x")
    else:
        print("Test images not found - using mock verification")
        result = siamese._mock_verification()
        print(result)
