"use client";
import { GameProvider } from "@/contexts/GameContext";
import { Game } from "@/components/Game";

export default function Home() {
  return (
    <div className="container">
      <h1>Choose Your Own Adventure</h1>
      <p className="subtitle">
        Embark on an interactive story where your choices matter
      </p>

      <GameProvider>
        <Game />
      </GameProvider>

      <footer className="footer">
        <p>© 2023 Choose Your Own Adventure Game</p>
      </footer>
    </div>
  );
}
