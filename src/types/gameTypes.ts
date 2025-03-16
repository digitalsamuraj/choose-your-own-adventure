export interface CharacterState {
  hitPoints: number;
  forcePoints: number;
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
    forcePoints?: number;
  };
  actions?: {
    modifyForcePoints?: number;
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
