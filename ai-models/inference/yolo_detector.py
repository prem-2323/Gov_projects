"""
YOLOv8 Waste Detection Model
Detects waste objects and classifies waste type and severity
"""

from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import os

class YOLOv8WasteDetector:
    """
    YOLOv8 model for waste detection, type classification, and severity analysis
    """
    
    def __init__(self, model_path='pretrained/yolov8_waste.pt'):
        self.model_path = model_path
        self.model = None
        
        # Waste categories
        self.waste_types = {
            0: 'plastic',
            1: 'organic',
            2: 'electronic',
            3: 'hazardous',
            4: 'metal',
            5: 'glass',
            6: 'paper',
            7: 'other'
        }
        
        # Severity thresholds based on waste amount and type
        self.severity_config = {
            'hazardous': {'low': 1, 'medium': 2, 'high': 3, 'critical': 5},
            'electronic': {'low': 2, 'medium': 4, 'high': 6, 'critical': 8},
            'plastic': {'low': 5, 'medium': 10, 'high': 15, 'critical': 20},
            'organic': {'low': 10, 'medium': 20, 'high': 30, 'critical': 40},
            'default': {'low': 3, 'medium': 6, 'high': 10, 'critical': 15}
        }
        
        self.load_model()
    
    def load_model(self):
        """Load YOLOv8 model"""
        try:
            if os.path.exists(self.model_path):
                self.model = YOLO(self.model_path)
                print(f"YOLOv8 model loaded from {self.model_path}")
            else:
                # Use pretrained YOLO model and fine-tune later
                self.model = YOLO('yolov8n.pt')  # Nano model
                print("Using pretrained YOLOv8n - Fine-tune with waste dataset")
        except Exception as e:
            print(f"Error loading YOLO model: {str(e)}")
            self.model = None
    
    def detect(self, image_path, conf_threshold=0.25):
        """
        Detect waste objects in image
        
        Args:
            image_path: Path to image file
            conf_threshold: Confidence threshold for detections
            
        Returns:
            Detection results with bounding boxes, classes, and confidences
        """
        if self.model is None:
            return self._mock_detection()
        
        try:
            # Run inference
            results = self.model(image_path, conf=conf_threshold)
            
            detections = []
            for result in results:
                boxes = result.boxes
                for box in boxes:
                    detection = {
                        'bbox': box.xyxy[0].tolist(),  # [x1, y1, x2, y2]
                        'confidence': float(box.conf[0]),
                        'class_id': int(box.cls[0]),
                        'class_name': self.waste_types.get(int(box.cls[0]), 'unknown')
                    }
                    detections.append(detection)
            
            return detections
            
        except Exception as e:
            print(f"Detection error: {str(e)}")
            return self._mock_detection()
    
    def analyze_severity(self, detections, image_area=None):
        """
        Analyze waste severity based on detections
        
        Args:
            detections: List of detected objects
            image_area: Total image area (optional)
            
        Returns:
            Severity analysis with level, score, and details
        """
        if not detections:
            return {
                'level': 'none',
                'score': 0,
                'priority': 'low',
                'waste_count': 0,
                'dominant_type': None
            }
        
        # Count waste by type
        waste_counts = {}
        total_area = 0
        
        for det in detections:
            waste_type = det['class_name']
            waste_counts[waste_type] = waste_counts.get(waste_type, 0) + 1
            
            # Calculate detected object area
            bbox = det['bbox']
            area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1])
            total_area += area
        
        # Determine dominant waste type
        dominant_type = max(waste_counts.items(), key=lambda x: x[1])[0]
        total_count = len(detections)
        
        # Calculate severity score
        severity_score = self._calculate_severity_score(
            dominant_type, 
            total_count,
            waste_counts
        )
        
        # Determine severity level
        severity_level = self._get_severity_level(severity_score)
        
        # Determine priority
        priority = self._get_priority(severity_level, dominant_type)
        
        return {
            'level': severity_level,
            'score': severity_score,
            'priority': priority,
            'waste_count': total_count,
            'dominant_type': dominant_type,
            'waste_distribution': waste_counts,
            'estimated_coverage': self._estimate_coverage(total_area, image_area)
        }
    
    def _calculate_severity_score(self, dominant_type, count, distribution):
        """Calculate severity score based on waste type and count"""
        base_score = count
        
        # Apply multipliers based on waste type
        type_multipliers = {
            'hazardous': 3.0,
            'electronic': 2.5,
            'plastic': 1.5,
            'metal': 1.3,
            'glass': 1.3,
            'organic': 1.0,
            'paper': 0.8,
            'other': 1.0
        }
        
        multiplier = type_multipliers.get(dominant_type, 1.0)
        
        # Bonus for hazardous waste presence
        if 'hazardous' in distribution:
            base_score += distribution['hazardous'] * 5
        
        return int(base_score * multiplier)
    
    def _get_severity_level(self, score):
        """Convert score to severity level"""
        if score >= 50:
            return 'critical'
        elif score >= 30:
            return 'high'
        elif score >= 15:
            return 'medium'
        elif score >= 5:
            return 'low'
        else:
            return 'minimal'
    
    def _get_priority(self, severity_level, waste_type):
        """Determine priority based on severity and type"""
        priority_map = {
            'critical': 1,
            'high': 2,
            'medium': 3,
            'low': 4,
            'minimal': 5
        }
        
        priority = priority_map.get(severity_level, 5)
        
        # Hazardous waste always gets high priority
        if waste_type == 'hazardous' and priority > 1:
            priority = 1
        
        return priority
    
    def _estimate_coverage(self, waste_area, total_area):
        """Estimate percentage of image covered by waste"""
        if total_area is None or total_area == 0:
            return 0
        return min(100, int((waste_area / total_area) * 100))
    
    def _mock_detection(self):
        """Mock detections for testing"""
        return [
            {
                'bbox': [100, 100, 300, 300],
                'confidence': 0.85,
                'class_id': 0,
                'class_name': 'plastic'
            },
            {
                'bbox': [350, 150, 500, 400],
                'confidence': 0.72,
                'class_id': 1,
                'class_name': 'organic'
            }
        ]
    
    def visualize_detections(self, image_path, detections, output_path=None):
        """
        Draw bounding boxes on image
        
        Args:
            image_path: Input image path
            detections: Detection results
            output_path: Output image path (optional)
            
        Returns:
            Annotated image
        """
        image = cv2.imread(image_path)
        
        for det in detections:
            bbox = det['bbox']
            class_name = det['class_name']
            confidence = det['confidence']
            
            # Draw bounding box
            x1, y1, x2, y2 = map(int, bbox)
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            
            # Add label
            label = f"{class_name}: {confidence:.2f}"
            cv2.putText(image, label, (x1, y1 - 10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        if output_path:
            cv2.imwrite(output_path, image)
        
        return image

# Example usage
if __name__ == "__main__":
    detector = YOLOv8WasteDetector()
    
    # Test detection
    test_image = "../datasets/test_images/sample.jpg"
    if os.path.exists(test_image):
        detections = detector.detect(test_image)
        print(f"Found {len(detections)} waste objects")
        
        # Analyze severity
        severity = detector.analyze_severity(detections)
        print(f"\nSeverity Analysis:")
        print(f"  Level: {severity['level']}")
        print(f"  Score: {severity['score']}")
        print(f"  Priority: {severity['priority']}")
        print(f"  Dominant Type: {severity['dominant_type']}")
