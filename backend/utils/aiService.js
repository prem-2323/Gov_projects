const axios = require('axios');

/**
 * AI Service Integration
 * Communicates with Python AI service for waste analysis
 */
class AIService {
  constructor() {
    this.baseURL = process.env.AI_MODEL_URL || 'http://localhost:8000';
  }
  
  /**
   * Classify waste image
   */
  async classifyWaste(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(
        `${this.baseURL}/api/classify`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('AI classification error:', error.message);
      throw new Error('AI classification failed');
    }
  }
  
  /**
   * Detect waste objects and analyze severity
   */
  async detectWaste(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(
        `${this.baseURL}/api/detect`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('AI detection error:', error.message);
      throw new Error('AI detection failed');
    }
  }
  
  /**
   * Verify cleanup with before/after images
   */
  async verifyCleanup(beforeImage, afterImage) {
    try {
      const formData = new FormData();
      formData.append('before_image', beforeImage);
      formData.append('after_image', afterImage);
      
      const response = await axios.post(
        `${this.baseURL}/api/verify-cleanup`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('AI verification error:', error.message);
      throw new Error('Cleanup verification failed');
    }
  }
  
  /**
   * Full analysis (classification + detection)
   */
  async analyzeImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(
        `${this.baseURL}/api/analyze-full`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('AI analysis error:', error.message);
      // Return mock data if AI service unavailable
      return this.mockAnalysis();
    }
  }
  
  /**
   * Mock analysis for testing without AI service
   */
  mockAnalysis() {
    return {
      success: true,
      analysis: {
        classification: {
          top_class: 'plastic',
          confidence: 0.85,
          predictions: [
            { class: 'plastic', confidence: 0.85 },
            { class: 'other', confidence: 0.10 }
          ]
        },
        detection: {
          count: 3,
          detections: [],
          severity: {
            level: 'medium',
            score: 25,
            priority: 3,
            waste_count: 3,
            dominant_type: 'plastic'
          }
        }
      }
    };
  }
}

module.exports = new AIService();
