"use client";

import { useEffect, useState } from "react";
import { AdventureNode } from "./AdventureNode";
import { CharacterSheet } from "./CharacterSheet";
import { useGame } from "@/contexts/GameContext";
import { Node } from "@/types/gameTypes";
import sampleAdventure from "../../data/sampleAdventure.json";

// Define the adventure data structure
interface AdventureData {
  metadata: {
    title: string;
    setting: string;
    theme: string;
    expectedPlaytime: string;
    description: string;
  };
  nodes: {
    [key: string]: Node;
  };
}

// Type assertion for the imported JSON
const typedAdventure = sampleAdventure as AdventureData;

export function Game() {
  const { state } = useGame();
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Update the current node whenever the currentNodeId changes
  useEffect(() => {
    try {
      console.log("Attempting to load node:", state.currentNodeId);
      console.log("Available nodes:", Object.keys(typedAdventure.nodes));

      const node = typedAdventure.nodes[state.currentNodeId];

      if (!node) {
        setLoadError(`Node with ID ${state.currentNodeId} not found`);
        return;
      }

      console.log("Loaded node:", node);
      setCurrentNode(node);
      setLoadError(null);
    } catch (error) {
      console.error("Error loading node:", error);
      setLoadError(`Error loading node: ${error}`);
    }
  }, [state.currentNodeId]);

  // Display character stats
  const renderCharacterStats = () => (
    <div className="character-sheet bg-gray-100 p-4 rounded-lg shadow text-gray-900">
      <h3 className="text-xl font-bold mb-3 text-black">Character Sheet</h3>
      <div className="stat-item mb-2 text-black">
        <span className="font-medium text-black">Hit Points:</span>{" "}
        {state.character.hitPoints}
      </div>
      <div className="stat-item mb-2 text-black">
        <span className="font-medium text-black">Force Points:</span>{" "}
        {state.character.forcePoints}
      </div>
      <div className="text-xs text-gray-700 mt-4">
        Current Node: {state.currentNodeId}
      </div>
    </div>
  );

  if (loadError) {
    return <div className="error-message">Error: {loadError}</div>;
  }

  if (!currentNode) {
    return <div className="loading-message">Loading adventure...</div>;
  }

  return (
    <div className="game-container grid grid-cols-3 gap-6">
      <div className="adventure-content col-span-2">
        <AdventureNode node={currentNode} />
      </div>
      <div className="character-sheet-container">{renderCharacterStats()}</div>
    </div>
  );
}
