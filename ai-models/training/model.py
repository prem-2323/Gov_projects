import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import os

class WasteDetectionModel:
    """
    CNN model for waste classification
    Categories: plastic, organic, electronic, hazardous, other
    """
    
    def __init__(self, num_classes=5, input_shape=(224, 224, 3)):
        self.num_classes = num_classes
        self.input_shape = input_shape
        self.model = None
        self.class_names = ['plastic', 'organic', 'electronic', 'hazardous', 'other']
    
    def build_model(self):
        """Build CNN model architecture"""
        
        # Input layer
        inputs = keras.Input(shape=self.input_shape)
        
        # Data augmentation
        x = layers.RandomFlip("horizontal")(inputs)
        x = layers.RandomRotation(0.1)(x)
        x = layers.RandomZoom(0.1)(x)
        
        # Convolutional blocks
        x = layers.Conv2D(32, 3, activation='relu', padding='same')(x)
        x = layers.BatchNormalization()(x)
        x = layers.MaxPooling2D()(x)
        
        x = layers.Conv2D(64, 3, activation='relu', padding='same')(x)
        x = layers.BatchNormalization()(x)
        x = layers.MaxPooling2D()(x)
        
        x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
        x = layers.BatchNormalization()(x)
        x = layers.MaxPooling2D()(x)
        
        x = layers.Conv2D(256, 3, activation='relu', padding='same')(x)
        x = layers.BatchNormalization()(x)
        x = layers.MaxPooling2D()(x)
        
        # Dense layers
        x = layers.Flatten()(x)
        x = layers.Dense(512, activation='relu')(x)
        x = layers.Dropout(0.5)(x)
        x = layers.Dense(256, activation='relu')(x)
        x = layers.Dropout(0.3)(x)
        
        # Output layer
        outputs = layers.Dense(self.num_classes, activation='softmax')(x)
        
        # Create model
        self.model = keras.Model(inputs, outputs)
        
        return self.model
    
    def compile_model(self, learning_rate=0.001):
        """Compile the model"""
        self.model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=learning_rate),
            loss='categorical_crossentropy',
            metrics=['accuracy', 'top_k_categorical_accuracy']
        )
    
    def get_transfer_learning_model(self, base_model_name='MobileNetV2'):
        """Build model using transfer learning"""
        
        # Load pre-trained base model
        if base_model_name == 'MobileNetV2':
            base_model = keras.applications.MobileNetV2(
                input_shape=self.input_shape,
                include_top=False,
                weights='imagenet'
            )
        elif base_model_name == 'ResNet50':
            base_model = keras.applications.ResNet50(
                input_shape=self.input_shape,
                include_top=False,
                weights='imagenet'
            )
        else:
            raise ValueError(f"Unknown base model: {base_model_name}")
        
        # Freeze base model layers
        base_model.trainable = False
        
        # Build classification head
        inputs = keras.Input(shape=self.input_shape)
        x = base_model(inputs, training=False)
        x = layers.GlobalAveragePooling2D()(x)
        x = layers.Dense(256, activation='relu')(x)
        x = layers.Dropout(0.5)(x)
        outputs = layers.Dense(self.num_classes, activation='softmax')(x)
        
        self.model = keras.Model(inputs, outputs)
        
        return self.model
    
    def save_model(self, filepath):
        """Save trained model"""
        self.model.save(filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath):
        """Load trained model"""
        self.model = keras.models.load_model(filepath)
        print(f"Model loaded from {filepath}")
        return self.model

# Example usage
if __name__ == "__main__":
    # Create model
    waste_model = WasteDetectionModel()
    
    # Option 1: Build from scratch
    model = waste_model.build_model()
    waste_model.compile_model()
    
    # Option 2: Use transfer learning
    # model = waste_model.get_transfer_learning_model('MobileNetV2')
    # waste_model.compile_model()
    
    model.summary()
