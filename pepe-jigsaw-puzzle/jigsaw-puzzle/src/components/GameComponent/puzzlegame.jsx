import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const baseURL = `http://localhost:3000/api`;

function GameComponent({ onGameComplete }) {
  const [score, setScore] = useState(null);
  const [gameState, setGameState] = useState("not-started");
  const [timeLeft, setTimeLeft] = useState(30);

  const saveScore = (score) => {
    const tempId = localStorage.getItem("tempId");

    axios
      .post(`${baseURL}/api/score`, {
        tempId: tempId,
        score: score,
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

const handleGameComplete = useCallback((finalScore) => {
  setScore(finalScore);
  onGameComplete(finalScore);
  saveScore(finalScore);
  setGameState("completed");
}, [onGameComplete]);

  useEffect(() => {
    let timerId;
    if (gameState === "in-progress") {
      timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 0) {
            handleGameComplete(0);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [gameState, handleGameComplete]);

  const startGame = () => {
    setGameState("in-progress");
    setTimeLeft(30);
    setScore(null);
  };

  return (
    <div>
      {gameState === "not-started" && (
        <button onClick={startGame}>Start Game</button>
      )}
      {gameState === "in-progress" && (
        <div>
          <p>Time Left: {timeLeft}</p>
        </div>
      )}
      {gameState === "completed" && <p>Your Score: {score}</p>}
    </div>
  );
}

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createAccount(username, password);
  };

  const createAccount = (username, password) => {
    const tempId = localStorage.getItem("tempId");

    axios
      .post(`${baseURL}/api/createAccount`, {
        username: username,
        password: password,
        tempId: tempId,
      })
      .then((response) => {
        localStorage.setItem("userId", response.data.userId);
        localStorage.removeItem("tempId");
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Create Account</button>
    </form>
  );
}

export { GameComponent, RegistrationForm };
