import tensorflow as tf
from tensorflow import keras
import numpy as np
import os
from model import WasteDetectionModel
from data_loader import WasteDataLoader
import matplotlib.pyplot as plt

class ModelTrainer:
    """Train waste detection model"""
    
    def __init__(self, data_dir, batch_size=32, epochs=50):
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.epochs = epochs
        self.model_wrapper = WasteDetectionModel()
        self.history = None
    
    def prepare_data(self):
        """Load and prepare training data"""
        print("Loading dataset...")
        
        loader = WasteDataLoader(self.data_dir)
        self.train_ds, self.val_ds, self.test_ds = loader.load_data(
            batch_size=self.batch_size,
            validation_split=0.2,
            test_split=0.1
        )
        
        print(f"Training samples: {len(self.train_ds) * self.batch_size}")
        print(f"Validation samples: {len(self.val_ds) * self.batch_size}")
        print(f"Test samples: {len(self.test_ds) * self.batch_size}")
    
    def train(self, use_transfer_learning=True):
        """Train the model"""
        
        # Build model
        if use_transfer_learning:
            print("Building model with transfer learning (MobileNetV2)...")
            model = self.model_wrapper.get_transfer_learning_model('MobileNetV2')
        else:
            print("Building model from scratch...")
            model = self.model_wrapper.build_model()
        
        self.model_wrapper.compile_model()
        
        # Callbacks
        callbacks = [
            keras.callbacks.EarlyStopping(
                monitor='val_loss',
                patience=10,
                restore_best_weights=True
            ),
            keras.callbacks.ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.5,
                patience=5,
                min_lr=1e-7
            ),
            keras.callbacks.ModelCheckpoint(
                filepath='checkpoints/model_epoch_{epoch:02d}.h5',
                save_best_only=True,
                monitor='val_accuracy'
            )
        ]
        
        # Train model
        print("Starting training...")
        self.history = model.fit(
            self.train_ds,
            validation_data=self.val_ds,
            epochs=self.epochs,
            callbacks=callbacks
        )
        
        print("Training completed!")
        return self.history
    
    def evaluate(self):
        """Evaluate model on test set"""
        print("Evaluating model...")
        
        test_loss, test_accuracy, test_top_k = self.model_wrapper.model.evaluate(self.test_ds)
        
        print(f"Test Loss: {test_loss:.4f}")
        print(f"Test Accuracy: {test_accuracy:.4f}")
        print(f"Test Top-K Accuracy: {test_top_k:.4f}")
        
        return test_loss, test_accuracy
    
    def plot_training_history(self):
        """Plot training history"""
        if self.history is None:
            print("No training history available")
            return
        
        fig, axes = plt.subplots(1, 2, figsize=(12, 4))
        
        # Plot accuracy
        axes[0].plot(self.history.history['accuracy'], label='Train Accuracy')
        axes[0].plot(self.history.history['val_accuracy'], label='Val Accuracy')
        axes[0].set_xlabel('Epoch')
        axes[0].set_ylabel('Accuracy')
        axes[0].set_title('Model Accuracy')
        axes[0].legend()
        axes[0].grid(True)
        
        # Plot loss
        axes[1].plot(self.history.history['loss'], label='Train Loss')
        axes[1].plot(self.history.history['val_loss'], label='Val Loss')
        axes[1].set_xlabel('Epoch')
        axes[1].set_ylabel('Loss')
        axes[1].set_title('Model Loss')
        axes[1].legend()
        axes[1].grid(True)
        
        plt.tight_layout()
        plt.savefig('training_history.png')
        print("Training history plot saved as 'training_history.png'")
    
    def save_model(self, filepath='../pretrained/waste_classifier.h5'):
        """Save trained model"""
        self.model_wrapper.save_model(filepath)

# Main training script
if __name__ == "__main__":
    # Configuration
    DATA_DIR = "../datasets/waste_images"
    BATCH_SIZE = 32
    EPOCHS = 50
    
    # Create trainer
    trainer = ModelTrainer(
        data_dir=DATA_DIR,
        batch_size=BATCH_SIZE,
        epochs=EPOCHS
    )
    
    # Prepare data
    trainer.prepare_data()
    
    # Train model
    trainer.train(use_transfer_learning=True)
    
    # Evaluate
    trainer.evaluate()
    
    # Plot results
    trainer.plot_training_history()
    
    # Save model
    trainer.save_model()
    
    print("Training pipeline completed successfully!")
