import { useState } from 'react'

function App() {
  const [activeQuest, setActiveQuest] = useState('phishing')
  const [rakshaStars, setRakshaStars] = useState(0)

  const handlePhishingScan = () => {
    setRakshaStars(rakshaStars + 10)
    alert('🎉 PHISHING DETECTED!\n\n"आपका UPI लिंक फर्जी है"\n\n+10 Raksha Stars ⭐')
  }

  const handleWifiScan = () => {
    setRakshaStars(rakshaStars + 15)
    alert('⚠️ UNSAFE WIFI!\n\n"यह Public Hotspot सुरक्षित नहीं है"\n\n+15 Raksha Stars ⭐')
  }

  return (
    <>
      <header>
        <div className="container header-content">
          <h1>🛡️ NAGAR RAKSHA</h1>
          <p className="subtitle">India Innovates Hackathon 2026 | Team Nagrik</p>
          <div className="stats">
            <div className="stat-item">
              ⭐ <span id="raksha-count">{rakshaStars}</span> Raksha Stars
            </div>
            <div className="stat-item">📍 Delhi Ward #7</div>
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
                📱 Phishing Scanner
              </button>
              <button 
                className={`quest-btn quest-wifi ${activeQuest === 'wifi' ? 'active' : ''}`}
                onClick={() => setActiveQuest('wifi')}
              >
                📶 WiFi Guardian
              </button>
            </div>
          </div>

          <div className="grid">
            <div className="card">
              <h3 className="card-title">
                {activeQuest === 'phishing' ? '📱 Phishing SMS Scanner' : '📶 Public WiFi Detector'}
              </h3>
              
              {activeQuest === 'phishing' ? (
                <>
                  <div className="file-input-wrapper">
                    <label>Upload Phishing SMS/Email</label>
                    <input type="file" accept=".txt" />
                  </div>
                  <button className="scan-btn scan-phishing" onClick={handlePhishingScan}>
                    🔍 SCAN NOW
                  </button>
                </>
              ) : (
                <>
                  <div className="file-input-wrapper" style={{textAlign: 'center'}}>
                    <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📶</div>
                    <p style={{color: '#ffaa80', fontSize: '1.3rem'}}>Scanning nearby WiFi networks...</p>
                  </div>
                  <button className="scan-btn scan-wifi" onClick={handleWifiScan}>
                    📡 DETECT RISKS
                  </button>
                </>
              )}
            </div>

            <div className="leaderboard">
              <h3>🏆 Leaderboard</h3>
              <div className="leaderboard-item rank-1">
                <div className="rank-circle">1</div>
                <div>
                  <div style={{fontWeight: 'bold', fontSize: '1.3rem'}}>Delhi Ward #7</div>
                  <div className="stars">{rakshaStars} ⭐</div>
                </div>
              </div>
              <div className="leaderboard-item rank-2">
                <div className="rank-circle">2</div>
                <div>
                  <div style={{fontWeight: 'bold'}}>Mumbai Ward #3</div>
                  <div>245 ⭐</div>
                </div>
              </div>
              <div className="leaderboard-item rank-3">
                <div className="rank-circle">3</div>
                <div>
                  <div style={{fontWeight: 'bold'}}>Bangalore #12</div>
                  <div>198 ⭐</div>
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
