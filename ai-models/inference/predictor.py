import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2
from PIL import Image
import io
import os

class WasteClassifier:
    """Waste classification inference"""
    
    def __init__(self, model_path='pretrained/waste_classifier.h5'):
        self.model_path = model_path
        self.model = None
        self.class_names = ['plastic', 'organic', 'electronic', 'hazardous', 'other']
        self.image_size = (224, 224)
        
        # Load model
        self.load_model()
    
    def load_model(self):
        """Load trained model"""
        if os.path.exists(self.model_path):
            try:
                self.model = keras.models.load_model(self.model_path)
                print(f"Model loaded from {self.model_path}")
            except Exception as e:
                print(f"Failed to load model: {str(e)}")
                print("Using dummy model for testing")
                self.model = None
        else:
            print(f"Model file not found at {self.model_path}")
            print("Using dummy predictions")
            self.model = None
    
    def preprocess_image(self, image_file):
        """Preprocess image for prediction"""
        # Read image
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize
        image = image.resize(self.image_size)
        
        # Convert to array and normalize
        img_array = np.array(image) / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    
    def predict(self, image_file):
        """
        Predict waste category from image
        
        Args:
            image_file: File object from Flask request.files
        
        Returns:
            dict with predictions, top_class, and confidence
        """
        try:
            # Preprocess image
            img_array = self.preprocess_image(image_file)
            
            if self.model is not None:
                # Make prediction
                predictions = self.model.predict(img_array, verbose=0)
                predictions = predictions[0]  # Remove batch dimension
            else:
                # Dummy predictions for testing
                predictions = np.random.rand(len(self.class_names))
                predictions = predictions / predictions.sum()  # Normalize
            
            # Get top prediction
            top_idx = np.argmax(predictions)
            top_class = self.class_names[top_idx]
            confidence = float(predictions[top_idx])
            
            # Format all predictions
            all_predictions = [
                {
                    'class': self.class_names[i],
                    'confidence': float(predictions[i])
                }
                for i in range(len(self.class_names))
            ]
            
            # Sort by confidence
            all_predictions.sort(key=lambda x: x['confidence'], reverse=True)
            
            return {
                'predictions': all_predictions,
                'top_class': top_class,
                'confidence': confidence
            }
            
        except Exception as e:
            raise Exception(f"Prediction error: {str(e)}")
    
    def predict_from_path(self, image_path):
        """Predict from image file path"""
        img = keras.preprocessing.image.load_img(
            image_path,
            target_size=self.image_size
        )
        img_array = keras.preprocessing.image.img_to_array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        if self.model is not None:
            predictions = self.model.predict(img_array, verbose=0)
            predictions = predictions[0]
        else:
            predictions = np.random.rand(len(self.class_names))
            predictions = predictions / predictions.sum()
        
        top_idx = np.argmax(predictions)
        top_class = self.class_names[top_idx]
        confidence = float(predictions[top_idx])
        
        return {
            'class': top_class,
            'confidence': confidence,
            'all_predictions': {
                self.class_names[i]: float(predictions[i])
                for i in range(len(self.class_names))
            }
        }

# Example usage
if __name__ == "__main__":
    classifier = WasteClassifier()
    
    # Test with dummy image
    test_image_path = "../datasets/test_images/sample.jpg"
    if os.path.exists(test_image_path):
        result = classifier.predict_from_path(test_image_path)
        print(f"Predicted class: {result['class']}")
        print(f"Confidence: {result['confidence']:.2%}")
        print("\nAll predictions:")
        for cls, conf in result['all_predictions'].items():
            print(f"  {cls}: {conf:.2%}")
