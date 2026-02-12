import tensorflow as tf
from tensorflow import keras
import os

class WasteDataLoader:
    """Load and preprocess waste dataset"""
    
    def __init__(self, data_dir, image_size=(224, 224)):
        self.data_dir = data_dir
        self.image_size = image_size
        self.class_names = ['plastic', 'organic', 'electronic', 'hazardous', 'other']
    
    def load_data(self, batch_size=32, validation_split=0.2, test_split=0.1):
        """
        Load dataset from directory structure:
        data_dir/
            plastic/
                img1.jpg
                img2.jpg
            organic/
                img1.jpg
                img2.jpg
            ...
        """
        
        # Training dataset
        train_ds = keras.preprocessing.image_dataset_from_directory(
            self.data_dir,
            validation_split=validation_split + test_split,
            subset="training",
            seed=123,
            image_size=self.image_size,
            batch_size=batch_size,
            label_mode='categorical'
        )
        
        # Validation + Test dataset
        val_test_ds = keras.preprocessing.image_dataset_from_directory(
            self.data_dir,
            validation_split=validation_split + test_split,
            subset="validation",
            seed=123,
            image_size=self.image_size,
            batch_size=batch_size,
            label_mode='categorical'
        )
        
        # Split validation and test
        val_batches = int(len(val_test_ds) * (validation_split / (validation_split + test_split)))
        val_ds = val_test_ds.take(val_batches)
        test_ds = val_test_ds.skip(val_batches)
        
        # Normalize pixel values
        normalization_layer = keras.layers.Rescaling(1./255)
        train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
        val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))
        test_ds = test_ds.map(lambda x, y: (normalization_layer(x), y))
        
        # Performance optimization
        AUTOTUNE = tf.data.AUTOTUNE
        train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
        val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)
        test_ds = test_ds.cache().prefetch(buffer_size=AUTOTUNE)
        
        return train_ds, val_ds, test_ds
    
    def load_single_image(self, image_path):
        """Load and preprocess a single image"""
        img = keras.preprocessing.image.load_img(
            image_path,
            target_size=self.image_size
        )
        img_array = keras.preprocessing.image.img_to_array(img)
        img_array = img_array / 255.0  # Normalize
        img_array = tf.expand_dims(img_array, 0)  # Add batch dimension
        
        return img_array

# Example usage
if __name__ == "__main__":
    loader = WasteDataLoader("../datasets/waste_images")
    train_ds, val_ds, test_ds = loader.load_data()
    
    print("Dataset loaded successfully!")
    print(f"Number of classes: {len(loader.class_names)}")
    print(f"Class names: {loader.class_names}")
