import React from "react";

export function IncidentReport({ ward = "Delhi #7", stars = 45, threat = "UPI Phishing (92% risk)", sms = "Urgent PhonePe QR scan required", language = "en", date }) {
  const d = date || new Date().toLocaleString("en-IN", { hour12: false });
  const reports = {
    hi: `घटना रिपोर्ट - नगर रक्षा
दिनांक: ${d}
वार्ड: ${ward} | स्टार्स: ${stars}
खतरा: ${threat}
एसएमएस: "${sms}"
कार्यवाही: स्वतः पहचाना गया और रिपोर्ट किया गया
नागरिक: अज्ञात | स्थान: दिल्ली`,
    en: `INCIDENT REPORT - Nagar Raksha
Date: ${d}
Ward: ${ward} | Stars: ${stars}
Threat: ${threat}
SMS: "${sms}"
Action: Auto-detected + Reported
Citizen: Anonymous | Location: Delhi`
  };

  return (
    <div className="border p-4 rounded bg-yellow-50 mt-2">
      <h3 className="font-bold text-lg mb-2">{language === "hi" ? "हिन्दी रिपोर्ट" : "English Report"}</h3>
      <pre className="whitespace-pre-line text-base">{reports[language]}</pre>
      <button
        className="bg-green-600 text-white px-3 py-1 rounded mt-2"
        onClick={() => navigator.clipboard.writeText(reports[language])}
      >
        {language === "hi" ? "रिपोर्�� कॉपी करें" : "Copy Report"}
      </button>
    </div>
  );
}