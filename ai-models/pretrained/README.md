# Pretrained Models

Place your trained model files in this directory.

## Expected Files

- `waste_classifier.h5` - Main classification model
- `waste_detector.h5` - Object detection model (optional)

## Download Models

If pretrained models are available, download them here:

```bash
# Example: Download from cloud storage
# wget https://your-storage.com/models/waste_classifier.h5
```

## Model Info

- Model Type: CNN / Transfer Learning (MobileNetV2)
- Framework: TensorFlow/Keras
- Input Shape: (224, 224, 3)
- Classes: plastic, organic, electronic, hazardous, other
