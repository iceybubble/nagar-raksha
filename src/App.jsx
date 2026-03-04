import { useState, useRef, useEffect } from 'react'

function App() {
  const [activeQuest, setActiveQuest] = useState('phishing')
  const [rakshaStars, setRakshaStars] = useState(0)
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const fileInputRef = useRef(null)

  const phishingPatterns = {
    upi: ['upi', 'paytm', 'phonepe', 'gpay'],
    urgent: ['urgent', 'account suspend'],
    banks: ['sbi', 'hdfc', 'icici'],
    govt: ['aadhaar', 'pan card']
  }

  // Sample phishing texts for testing
  const samples = [
    "Urgent UPI payment required. Scan QR code now or account suspended. PhonePe",
    "SBI Account verification needed. Click link to update KYC immediately",
    "Aadhaar update required. Verify PAN and Aadhaar now or services suspended"
  ]

  const analyzeSMS = (text) => {
    let score = 0
    let reasons = []
    const lowerText = text.toLowerCase()
    
    for (const [category, patterns] of Object.entries(phishingPatterns)) {
      for (const pattern of patterns) {
        if (lowerText.includes(pattern)) {
          score += 0.25
          reasons.push(pattern)
        }
      }
    }

    return {
      isPhishing: score > 0.5,
      riskScore: Math.round(score * 100),
      reasons: reasons.slice(0, 3),
      hindiAlert: score > 0.7 ? "खतरनाक फिशिंग!" : "संदिग्ध मैसेज",
      englishAlert: score > 0.7 ? "DANGEROUS PHISHING!" : "Suspicious message"
    }
  }

  const loadSample = (index) => {
    const result = analyzeSMS(samples[index])
    setScanResult({ ...result, sampleText: samples[index] })
    setRakshaStars(prev => prev + 10)
  }

  const handlePhishingScan = () => {
    setIsScanning(true)
    const demoSMS = "Urgent UPI payment required. Scan QR code now or account suspended. PhonePe"
    setTimeout(() => {
      const result = analyzeSMS(demoSMS)
      setScanResult(result)
      setRakshaStars(prev => prev + 10)
      setIsScanning(false)
    }, 1200)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = analyzeSMS(e.target.result)
        setScanResult(result)
        setRakshaStars(prev => prev + 15)
      }
      reader.readAsText(file)
    }
  }

  const handleWifiScan = () => {
    setRakshaStars(prev => prev + 15)
    alert('Unsafe WiFi detected\n"This Public Hotspot is not secure"')
  }

  // Toggle theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <>
      <header>
        <div className="container header-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1>NAGAR RAKSHA</h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-toggle"
              title="Toggle Theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <p className="subtitle">India Innovates Hackathon 2026 | Team Nagrik</p>
          <div className="stats">
            <div className="stat-item">
              <span id="raksha-count">{rakshaStars}</span> Raksha Stars
            </div>
            <div className="stat-item">Delhi Ward #7</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="quest-selector">
            <h2>Active Quest</h2>
            <div className="quest-buttons">
              <button 
                className={`quest-btn quest-phishing ${activeQuest === 'phishing' ? 'active' : ''}`}
                onClick={() => setActiveQuest('phishing')}
              >
                Phishing Scanner
              </button>
              <button 
                className={`quest-btn quest-wifi ${activeQuest === 'wifi' ? 'active' : ''}`}
                onClick={() => setActiveQuest('wifi')}
              >
                WiFi Guardian
              </button>
            </div>
          </div>

          <div className="grid">
            <div className="card">
              <h3 className="card-title">
                {activeQuest === 'phishing' ? 'Phishing SMS Scanner' : 'Public WiFi Detector'}
              </h3>
              
              {activeQuest === 'phishing' ? (
                <div>
                  <div className="file-input-wrapper">
                    <label>Upload SMS/Email File (.txt)</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept=".txt" 
                      onChange={handleFileUpload}
                    />
                  </div>

                  {/* Sample Buttons - INSERTED HERE */}
                  <div className="sample-buttons">
                    <button className="sample-btn" onClick={() => loadSample(0)}>UPI Scam</button>
                    <button className="sample-btn" onClick={() => loadSample(1)}>Bank KYC</button>
                    <button className="sample-btn" onClick={() => loadSample(2)}>Aadhaar</button>
                  </div>
                  
                  {scanResult && (
                    <div className={`scan-result ${scanResult.isPhishing ? 'scan-result-high' : 'scan-result-safe'}`}>
                      <h4 style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>
                        Risk Score: {scanResult.riskScore}%
                      </h4>
                      <p>{scanResult.isPhishing ? scanResult.hindiAlert : scanResult.englishAlert}</p>
                      {scanResult.reasons.length > 0 && (
                        <details>
                          <summary>Detection Reasons</summary>
                          <ul style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>
                            {scanResult.reasons.map((reason, i) => (
                              <li key={i} style={{marginBottom: '0.25rem'}}>{reason}</li>
                            ))}
                          </ul>
                        </details>
                      )}
                      {scanResult.sampleText && (
                        <details style={{marginTop: '0.5rem'}}>
                          <summary>Sample Text</summary>
                          <p style={{fontSize: '0.85rem', fontFamily: 'monospace', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px'}}>
                            {scanResult.sampleText}
                          </p>
                        </details>
                      )}
                    </div>
                  )}
                  
                  <button 
                    className="scan-btn scan-phishing" 
                    onClick={handlePhishingScan}
                    disabled={isScanning}
                  >
                    {isScanning ? 'Scanning...' : 'SCAN NOW'}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="file-input-wrapper" style={{textAlign: 'center'}}>
                    <div style={{fontSize: '4rem', marginBottom: '1rem'}}>WiFi</div>
                    <p style={{color: '#ffaa80', fontSize: '1.3rem'}}>Scanning nearby networks...</p>
                  </div>
                  <button className="scan-btn scan-wifi" onClick={handleWifiScan}>
                    DETECT RISKS
                  </button>
                </div>
              )}
            </div>

            <div className="leaderboard">
              <h3>Leaderboard</h3>
              <div className="leaderboard-item rank-1">
                <div className="rank-circle">1</div>
                <div>
                  <div style={{fontWeight: 'bold', fontSize: '1.3rem'}}>Delhi Ward #7</div>
                  <div className="stars">{rakshaStars} Stars</div>
                </div>
              </div>
              <div className="leaderboard-item rank-2">
                <div className="rank-circle">2</div>
                <div>
                  <div style={{fontWeight: 'bold'}}>Mumbai Ward #3</div>
                  <div>245 Stars</div>
                </div>
              </div>
              <div className="leaderboard-item rank-3">
                <div className="rank-circle">3</div>
                <div>
                  <div style={{fontWeight: 'bold'}}>Bangalore #12</div>
                  <div>198 Stars</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
