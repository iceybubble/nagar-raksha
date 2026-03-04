class RansomwareDetector {
  suspiciousExtensions = ['.locky', '.crypto', '.encrypted', '.ransom'];
  suspiciousWords = ['payment', 'bitcoin', 'decrypt', 'wallet', 'tor'];
  
  analyzeFile(filename, content = '') {
    let score = 0;
    const reasons = [];
    
    // Extension check
    if (this.suspiciousExtensions.some(ext => filename.toLowerCase().endsWith(ext))) {
      score += 0.4;
      reasons.push('Suspicious file extension');
    }
    
    // Keyword check
    const lowerContent = content.toLowerCase();
    this.suspiciousWords.forEach(word => {
      if (lowerContent.includes(word)) {
        score += 0.3;
        reasons.push(`Ransom keyword: "${word}"`);
      }
    });
    
    return {
      isRansomware: score > 0.5,
      riskScore: Math.round(score * 100),
      reasons,
      hindi: score > 0.7 ? "रैनसमवेयर खतरा!" : "संदिग्ध फाइल",
      english: score > 0.7 ? "RANSOMWARE DETECTED!" : "Suspicious file"
    };
  }
}

export default new RansomwareDetector();
