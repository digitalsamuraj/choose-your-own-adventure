"use client";

import { useGame } from "@/contexts/GameContext";
import { Node, Choice } from "@/types/gameTypes";

export function AdventureNode({ node }: { node: Node }) {
  const { state, dispatch } = useGame();

  const handleChoice = (choice: Choice) => {
    // Check requirements
    if (choice.requirements) {
      if (
        choice.requirements.mutantPoints &&
        state.character.stats.mutantPoints < choice.requirements.mutantPoints
      ) {
        return; // Not enough mutant points
      }

      if (choice.requirements.flags) {
        for (const [flag, required] of Object.entries(
          choice.requirements.flags
        )) {
          if (state.character.flags[flag] !== required) {
            return; // Requirements not met
          }
        }
      }
    }

    // Apply actions
    if (choice.actions) {
      if (choice.actions.modifyMutantPoints) {
        dispatch({
          type: "MODIFY_MUTANT_POINTS",
          amount: choice.actions.modifyMutantPoints,
        });
      }
      if (choice.actions.setFlag) {
        Object.entries(choice.actions.setFlag).forEach(([flag, value]) => {
          dispatch({ type: "SET_FLAG", flag, value });
        });
      }
    }

    // Navigate to next node
    dispatch({ type: "CHOOSE_PATH", nodeId: choice.nextNode });
  };

  return (
    <div className="adventure-node">
      <div className="narrative-text">
        {node.text ? (
          <p className="text-lg mb-6">{node.text}</p>
        ) : (
          <p className="text-red-500">No narrative text found for this node!</p>
        )}
      </div>
      <div className="choices">
        {node.choices?.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(choice)}
            className="choice-button"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
