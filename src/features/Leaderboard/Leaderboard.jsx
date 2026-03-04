import React from "react";

const WARDS = [
  { name: "Delhi Ward #7 (YOU)", stars: 0 },
  { name: "Mumbai Ward #3", stars: 245 },
  { name: "Bangalore #12", stars: 198 },
  { name: "Chennai Zone A", stars: 167 }
];

export function Leaderboard({ youStars = 0 }) {
  const list = WARDS.map(w => w.name === "Delhi Ward #7 (YOU)" ? { ...w, stars: youStars } : w);
  return (
    <div className="border p-4 bg-gray-50 rounded mt-4">
      <h2 className="font-bold text-lg mb-2">🏅 Leaderboard (Delhi & other cities)</h2>
      <ul>
        {list.map(w => (
          <li key={w.name} className="py-1 flex justify-between">
            <span>{w.name}</span>
            <span className="font-bold text-yellow-700">{w.stars}★</span>
          </li>
        ))}
      </ul>
    </div>
  );
}