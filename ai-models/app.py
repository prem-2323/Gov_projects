from flask import Flask, request, jsonify
import os
from inference.predictor import WasteClassifier
import logging

# Initialize Flask app
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize model
try:
    classifier = WasteClassifier()
    logger.info("Waste classifier model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    classifier = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': classifier is not None
    }), 200

@app.route('/api/classify', methods=['POST'])
def classify_waste():
    """
    Classify waste from uploaded image
    
    Expected: multipart/form-data with 'image' file
    Returns: JSON with predictions
    """
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        if classifier is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Get prediction
        result = classifier.predict(file)
        
        return jsonify({
            'success': True,
            'predictions': result['predictions'],
            'top_class': result['top_class'],
            'confidence': result['confidence']
        }), 200
        
    except Exception as e:
        logger.error(f"Error during classification: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/detect', methods=['POST'])
def detect_waste():
    """
    Detect waste objects in image
    
    Expected: multipart/form-data with 'image' file
    Returns: JSON with detections
    """
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # TODO: Implement object detection
        return jsonify({
            'success': True,
            'detections': [],
            'message': 'Detection not yet implemented'
        }), 200
        
    except Exception as e:
        logger.error(f"Error during detection: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
