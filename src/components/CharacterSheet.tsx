"use client";

import { useGame } from "@/contexts/GameContext";

export function CharacterSheet() {
  const { state } = useGame();

  return (
    <div className="character-sheet bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-3 border-b pb-2 text-black">
        Character Sheet
      </h3>

      <div className="stats-section mb-4">
        <h4 className="text-lg font-semibold mb-2 text-black">Vitals</h4>
        <div className="stat-item mb-2 flex justify-between">
          <span className="font-medium text-black">Hit Points:</span>
          <span className="text-red-600 font-bold">
            {state.character.hitPoints}
          </span>
        </div>
        <div className="stat-item mb-2 flex justify-between">
          <span className="font-medium text-black">Force Points:</span>
          <span className="text-blue-600 font-bold">
            {state.character.forcePoints}
          </span>
        </div>
      </div>

      <div className="stats-section mb-4">
        <h4 className="text-lg font-semibold mb-2 text-black">Flags</h4>
        <div className="grid grid-cols-1 gap-1">
          {Object.entries(state.character.flags || {}).map(([flag, value]) => (
            <div key={flag} className="flag-item flex justify-between">
              <span className="font-medium text-black">{flag}:</span>
              <span className={value ? "text-green-600" : "text-gray-600"}>
                {value ? "Yes" : "No"}
              </span>
            </div>
          ))}
          {Object.keys(state.character.flags || {}).length === 0 && (
            <div className="text-gray-500 italic">No flags set</div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4 pt-2 border-t">
        Current Node: {state.currentNodeId}
      </div>
    </div>
  );
}
