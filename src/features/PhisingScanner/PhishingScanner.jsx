import React, { useState } from "react";

const SAMPLE_MESSAGES = [
  { message: "UPI payment urgent - PhonePe QR scan now", risk: 92 },
  { message: "SBI KYC update required - click link", risk: 88 },
  { message: "Aadhaar-PAN verification suspended", risk: 95 }
];

function checkRisk(text) {
  // Rule-based matching for Indian scams (demo)
  for (const sample of SAMPLE_MESSAGES) {
    if (text.toLowerCase().includes(sample.message.toLowerCase().split(" ")[0])) {
      return sample.risk;
    }
  }
  // Default basic check
  if (/upi|paytm|phonepe|kyc|aadhaar|pan|verification|qr|scan/i.test(text)) return 85;
  return 10; // Not risky by default
}

export function PhishingScanner({ onStars }) {
  const [input, setInput] = useState("");
  const [risk, setRisk] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleScan = () => {
    const riskScore = checkRisk(input);
    setRisk(riskScore);
    if (riskScore > 80) {
      setAlert({ type: "danger", hindi: "खतरनाक फिशिंग!", en: "Dangerous phishing!" });
      onStars?.(10 + (100 - riskScore));
    } else if (riskScore > 50) {
      setAlert({ type: "warn", hindi: "संदिग्ध मैसेज", en: "Suspicious message" });
      onStars?.(5);
    } else {
      setAlert({ type: "ok", hindi: "सुरक्षित", en: "Safe" });
      onStars?.(1);
    }
  };

  return (
    <div className="border p-4 rounded bg-blue-50 mb-4">
      <h2 className="font-bold text-lg mb-2">Phishing SMS/Email Scanner</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Paste or type SMS/Email"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleScan}>
        Scan Message
      </button>
      {alert && (
        <div className={`mt-3 text-lg font-bold ${alert.type === "danger" ? "text-red-600" : alert.type === "warn" ? "text-yellow-600" : "text-green-600"}`}>
          <span role="img" aria-label="alert">
            {alert.type === "danger" ? "🚨" : alert.type === "warn" ? "⚠️" : "✅"}
          </span>{" "}
          <span className="hindi">{alert.hindi}</span> / <span className="en">{alert.en}</span>
          <div className="text-xs">Risk score: {risk}</div>
        </div>
      )}
    </div>
  );
}