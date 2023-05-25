import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import React, { useState } from "react";
import "./App.css";
import "./puzzle.css";
import img from "./pepe_the_frog_crying.jpeg";

import Leaderboard from "./components/leaderboard/leaderboard"
import { GameComponent } from "./components/GameComponent/puzzlegame";
import axios from "axios";

function App() {
  const [text, setText] = useState("My Face is in Pieces!");

  const onSolved = () => {
    setText("Feels Good Man!!");
    handleGameComplete(100); 
  };

  const handleGameComplete = (score) => {
    saveScore(score);
  };

  const saveScore = (score) => {
    const tempId = localStorage.getItem("tempId");

    axios
      .post("/api/score", {
        tempId: tempId,
        score: score,
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2 className="tag">{text}</h2>
      <GameComponent onGameComplete={handleGameComplete} />
      <div>
        <JigsawPuzzle
          imageSrc={img}
          rows={3}
          columns={3}
          onSolved={onSolved}
          className="jigsaw-puzzle"
        />
      </div>
      <Leaderboard />
    </>
  );
}

export default App;




