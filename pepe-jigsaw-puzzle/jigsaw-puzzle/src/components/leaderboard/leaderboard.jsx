import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const baseURL = `http://localhost:3000/api`;

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const newPuzzler = { name: "NewPuzzler", score: 100 };
  const updatedPuzzler = { id: "1", data: { score: 200 } };

  const leaderboardCallback = useCallback(
    ({ data: leaderboard }) => {
      const displayLeaderboard = (arr) => {
        const sortedData = arr.sort((a, b) => b.score - a.score).slice(0, 5);
        setLeaderboardData(sortedData);
      };
      displayLeaderboard(leaderboard);
    },
    [setLeaderboardData]
  );

  const errCallback = useCallback((err) => console.log(err.response.data), []);

  const getAllPuzzlers = useCallback(() => {
    axios
      .get(`${baseURL}/leaderboard`)
      .then(leaderboardCallback)
      .catch(errCallback);
  }, [leaderboardCallback, errCallback]);

  useEffect(() => {
    if (!localStorage.getItem("tempId")) {
      var tempId = generateTempId(); 
      localStorage.setItem("tempId", tempId);
    }
    getAllPuzzlers();
  }, [getAllPuzzlers]);

  const createPuzzler = () => {
    axios
      .post(`${baseURL}/puzzlers`, newPuzzler)
      .then(leaderboardCallback)
      .catch(errCallback);
  };

  const updatePuzzler = () => {
    const { id, data } = updatedPuzzler;
    axios
      .put(`${baseURL}/puzzlers/${id}`, data)
      .then(leaderboardCallback)
      .catch(errCallback);
  };

  const deletePuzzler = (id) => {
    axios
      .delete(`${baseURL}/puzzlers/${id}`)
      .then(leaderboardCallback)
      .catch(errCallback);
  };

const generateTempId = () => {
  const timestamp = Date.now().toString(); 
  const randomString = Math.random().toString(36).substring(2, 11); 
  const tempId = timestamp + randomString; 
  return tempId;
};

  useEffect(() => {
    if (search !== "") {
      axios
        .get(`${baseURL}/api/search?player=${search}`)
        .then((res) => setFilteredData(res.data))
        .catch((err) => console.error(err));
    } else {
      setFilteredData([]);
    }
  }, [search]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {leaderboardData.map((entry, index) => (
          <li key={index}>
            {entry.player} - {entry.score}
            <button onClick={() => updatePuzzler()}>Update Puzzler</button>
            <button onClick={() => deletePuzzler(entry.id)}>
              Delete Puzzler
            </button>
          </li>
        ))}
      </ol>
      <button onClick={createPuzzler}>Create Puzzler</button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      {search !== "" && (
        <div>
          <h2>Search Results</h2>
          <ol>
            {filteredData.map((entry, index) => (
              <li key={index}>
                {entry.player} - {entry.score}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;

