import React, { useState } from "react";

const QUESTS = [
  { name: "Phishing Scanner", stars: 10 },
  { name: "WiFi Guardian", stars: 15 },
  { name: "Malware Quarantine", stars: 20 },
  { name: "Incident Report", stars: 25 }
];

export function Quests({ onQuestComplete, completed = [] }) {
  const [active, setActive] = useState(0);
  const handleComplete = () => {
    onQuestComplete?.(QUESTS[active]);
    setActive(a => Math.min(a + 1, QUESTS.length - 1));
  };

  return (
    <div className="border p-4 rounded bg-pink-50 mb-4 mt-4">
      <h2 className="font-bold text-lg mb-2">Quests</h2>
      <ol>
        {QUESTS.map((q, idx) => (
          <li key={q.name} className={completed.includes(q.name) ? "line-through text-green-600" : ""}>
            {q.name} <span className="font-bold">{q.stars}★</span>
          </li>
        ))}
      </ol>
      {active < QUESTS.length && (
        <button className="bg-pink-600 text-white px-4 py-2 rounded mt-2" onClick={handleComplete}>
          Complete Quest: {QUESTS[active].name}
        </button>
      )}
    </div>
  );
}