"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { GameState, CharacterState } from "@/types/gameTypes";
import initialCharacterState from "../../data/initialCharacterState.json";

type GameAction =
  | { type: "CHOOSE_PATH"; nodeId: string }
  | { type: "MODIFY_MUTANT_POINTS"; amount: number }
  | { type: "SET_FLAG"; flag: string; value: boolean }
  | { type: "TAKE_DAMAGE"; amount: number };

// Separate the initial game state configuration
const createNewGameState = (): GameState => ({
  currentNodeId: "1",
  character: initialCharacterState as CharacterState,
  isGameOver: false,
});

const GameContext = createContext<
  | {
      state: GameState;
      dispatch: React.Dispatch<GameAction>;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  // Use the factory function to create the initial state
  const [state, dispatch] = useReducer(gameReducer, createNewGameState());

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
    case "MODIFY_MUTANT_POINTS":
      return {
        ...state,
        character: {
          ...state.character,
          stats: {
            ...state.character.stats,
            mutantPoints: state.character.stats.mutantPoints + action.amount,
          },
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
        state.character.stats.hitPoints - action.amount
      );
      return {
        ...state,
        character: {
          ...state.character,
          stats: {
            ...state.character.stats,
            hitPoints: newHitPoints,
          },
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
