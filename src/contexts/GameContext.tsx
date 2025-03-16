"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { GameState } from "@/types/gameTypes";

type GameAction =
  | { type: "CHOOSE_PATH"; nodeId: string }
  | { type: "MODIFY_FORCE_POINTS"; amount: number }
  | { type: "SET_FLAG"; flag: string; value: boolean }
  | { type: "TAKE_DAMAGE"; amount: number };

const initialGameState: GameState = {
  currentNodeId: "1",
  character: {
    hitPoints: 20,
    forcePoints: 3,
    flags: {
      hasLightsaber: true, // Setting this to true by default for testing
    },
  },
  isGameOver: false,
};

const GameContext = createContext<
  | {
      state: GameState;
      dispatch: React.Dispatch<GameAction>;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // Debug log to check state
  useEffect(() => {
    console.log("Current game state:", state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "CHOOSE_PATH":
      return {
        ...state,
        currentNodeId: action.nodeId,
      };
    case "MODIFY_FORCE_POINTS":
      return {
        ...state,
        character: {
          ...state.character,
          forcePoints: state.character.forcePoints + action.amount,
        },
      };
    case "SET_FLAG":
      return {
        ...state,
        character: {
          ...state.character,
          flags: {
            ...state.character.flags,
            [action.flag]: action.value,
          },
        },
      };
    case "TAKE_DAMAGE":
      const newHitPoints = Math.max(
        0,
        state.character.hitPoints - action.amount
      );
      return {
        ...state,
        character: {
          ...state.character,
          hitPoints: newHitPoints,
        },
        isGameOver: newHitPoints <= 0,
      };
    default:
      return state;
  }
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
