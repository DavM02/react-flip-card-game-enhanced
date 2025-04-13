import React, { ReactNode } from "react";
import "./layout.css";
import Player from "../PlayersConfig/Player";
import { statisticStore } from "../../store/statisticStore";
import Board from "../Board/Board";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const { players } = statisticStore()

  return (
    <main>
      <section id="game">
        <div className="container">
          <div className="game-layout">
            <Player playerKey="player-1" player={players['player-1']} />
            <div className="center">
              {children}
            </div>
            <Player playerKey="player-2" player={players['player-2']} />
            <Board/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Layout;
