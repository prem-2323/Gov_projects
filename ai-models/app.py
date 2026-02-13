from flask import Flask, request, jsonify
import os
from inference.predictor import WasteClassifier
from inference.yolo_detector import YOLOv8WasteDetector
from inference.siamese_network import SiameseNetwork
import logging
import tempfile

# Initialize Flask app
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize models
try:
    classifier = WasteClassifier()
    logger.info("Waste classifier model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load classifier: {str(e)}")
    classifier = None

try:
    yolo_detector = YOLOv8WasteDetector()
    logger.info("YOLOv8 detector loaded successfully")
except Exception as e:
    logger.error(f"Failed to load YOLOv8: {str(e)}")
    yolo_detector = None

try:
    siamese_network = SiameseNetwork()
    logger.info("Siamese Network loaded successfully")
except Exception as e:
    logger.error(f"Failed to load Siamese Network: {str(e)}")
    siamese_network = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'models': {
            'classifier': classifier is not None,
            'yolo_detector': yolo_detector is not None,
            'siamese_network': siamese_network is not None
        }
    }), 200

@app.route('/api/classify', methods=['POST'])
def classify_waste():
    """
    Classify waste from uploaded image
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
    Detect waste objects in image using YOLOv8
    """
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        if yolo_detector is None:
            return jsonify({'error': 'YOLOv8 model not loaded'}), 500
        
        # Save temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            file.save(temp_file.name)
            temp_path = temp_file.name
        
        try:
            # Detect waste objects
            detections = yolo_detector.detect(temp_path)
            # Analyze severity
            severity_analysis = yolo_detector.analyze_severity(detections)
            
            return jsonify({
                'success': True,
                'detections': detections,
                'count': len(detections),
                'severity': severity_analysis
            }), 200
        finally:
            # Clean up temp file
            if os.path.exists(temp_path):
                os.unlink(temp_path)
        
    except Exception as e:
        logger.error(f"Error during detection: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/verify-cleanup', methods=['POST'])
def verify_cleanup():
    """
    Verify cleanup by comparing before and after images using Siamese Network
    """
    try:
        if 'before_image' not in request.files or 'after_image' not in request.files:
            return jsonify({'error': 'Both before and after images required'}), 400
        
        before_file = request.files['before_image']
        after_file = request.files['after_image']
        
        if before_file.filename == '' or after_file.filename == '':
            return jsonify({'error': 'Image files cannot be empty'}), 400
        
        if siamese_network is None:
            return jsonify({'error': 'Siamese Network not loaded'}), 500
        
        # Save temp files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as before_temp:
            before_file.save(before_temp.name)
            before_path = before_temp.name
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as after_temp:
            after_file.save(after_temp.name)
            after_path = after_temp.name
        
        try:
            # Verify cleanup
            verification = siamese_network.verify_cleanup(before_path, after_path)
            
            return jsonify({
                'success': True,
                'verification': verification,
                'message': f"Cleanup {verification['status']} - {verification['cleanup_quality']}% quality"
            }), 200
        finally:
            # Clean up temp files
            if os.path.exists(before_path):
                os.unlink(before_path)
            if os.path.exists(after_path):
                os.unlink(after_path)
        
    except Exception as e:
        logger.error(f"Error during verification: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-full', methods=['POST'])
def analyze_full():
    """
    Full analysis: classification + detection + severity
    """
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Save temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
            file.save(temp_file.name)
            temp_path = temp_file.name
        
        try:
            results = {}
            
            # Classification
            if classifier is not None:
                # Predict needs a file-like object
                classification = classifier.predict(file)
                results['classification'] = classification
            
            # Detection and Severity
            if yolo_detector is not None:
                detections = yolo_detector.detect(temp_path)
                severity = yolo_detector.analyze_severity(detections)
                results['detection'] = {
                    'detections': detections,
                    'count': len(detections),
                    'severity': severity
                }
            
            return jsonify({
                'success': True,
                'analysis': results
            }), 200
        finally:
            # Clean up temp file
            if os.path.exists(temp_path):
                os.unlink(temp_path)
        
    except Exception as e:
        logger.error(f"Error during full analysis: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
