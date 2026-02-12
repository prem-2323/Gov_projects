# Datasets

Place your training datasets in this directory.

## Dataset Structure

```
datasets/
└── waste_images/
    ├── plastic/
    │   ├── img001.jpg
    │   ├── img002.jpg
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

## Dataset Sources

You can collect images from:
- Public datasets (Kaggle, ImageNet, etc.)
- Manual collection and labeling
- Web scraping (with proper permissions)

## Recommended Datasets

1. **TrashNet Dataset** - https://github.com/garythung/trashnet
2. **Waste Classification Dataset** - Kaggle
3. **TACO Dataset** - http://tacodataset.org/

## Data Requirements

- Minimum images per class: 500
- Recommended: 2000+ images per class
- Format: JPG, PNG
- Resolution: At least 224x224 pixels
- Labels: Accurate and consistent

## Data Augmentation

The training pipeline automatically applies:
- Random flips
- Random rotation
- Random zoom
- Normalization
