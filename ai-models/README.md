# AI Models - Waste Detection

This directory contains the AI/ML models for waste detection and classification.

## Directory Structure

```
ai-models/
├── training/           # Model training scripts
│   ├── model.py       # Model architecture
│   ├── train_model.py # Training pipeline
│   └── data_loader.py # Data loading utilities
├── inference/          # Inference scripts
│   └── predictor.py   # Prediction API
├── datasets/           # Training datasets
│   └── waste_images/  # Image dataset
├── pretrained/         # Pretrained model files
└── app.py             # Flask API server
```

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

## Training

### Prepare Dataset

Organize your dataset in the following structure:

```
datasets/waste_images/
├── plastic/
│   ├── img1.jpg
│   ├── img2.jpg
│   └── ...
├── organic/
│   └── ...
├── electronic/
│   └── ...
├── hazardous/
│   └── ...
└── other/
    └── ...
```

### Train Model

```bash
python training/train_model.py
```

## Inference

### Start API Server

```bash
python app.py
```

The server will start at `http://localhost:8000`

### API Endpoints

#### 1. Health Check
```bash
GET /health
```

#### 2. Classify Waste
```bash
POST /api/classify
Content-Type: multipart/form-data

{
  "image": <image_file>
}
```

Response:
```json
{
  "success": true,
  "predictions": [
    {"class": "plastic", "confidence": 0.85},
    {"class": "organic", "confidence": 0.10},
    ...
  ],
  "top_class": "plastic",
  "confidence": 0.85
}
```

## Model Architecture

- Base: MobileNetV2 (Transfer Learning) or Custom CNN
- Input: 224x224x3 RGB images
- Output: 5 classes (plastic, organic, electronic, hazardous, other)
- Optimizer: Adam
- Loss: Categorical Crossentropy

## Performance

- Accuracy: TBD (train model first)
- Inference Time: ~50ms per image on CPU

## TODO

- [ ] Collect and label dataset
- [ ] Train initial model
- [ ] Implement object detection
- [ ] Add model versioning
- [ ] Deploy to production
