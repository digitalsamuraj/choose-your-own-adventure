export interface CharacterStats {
  hitPoints: number;
  maxHitPoints: number;
  mutantPoints: number;
  maxMutantPoints: number;
  survival: number;
  combat: number;
  knowledge: number;
}

export interface CharacterState {
  name: string;
  stats: CharacterStats;
  flags: {
    [key: string]: boolean;
  };
}

export interface GameState {
  currentNodeId: string;
  character: CharacterState;
  isGameOver: boolean;
}

export interface Choice {
  text: string;
  nextNode: string;
  requirements?: {
    flags?: {
      [key: string]: boolean;
    };
    mutantPoints?: number;
  };
  actions?: {
    modifyMutantPoints?: number;
    setFlag?: {
      [key: string]: boolean;
    };
  };
}

export interface Node {
  id: string;
  type: "narrative" | "combat";
  text: string;
  choices?: Choice[];
  enemy?: {
    name: string;
    hitPoints: number;
    attack: number;
    defense: number;
  };
  outcomes?: {
    victory: {
      nextNode: string;
      text: string;
    };
    defeat: {
      nextNode: string;
      text: string;
    };
  };
}

// Character interface removed since CharacterState is already defined above
