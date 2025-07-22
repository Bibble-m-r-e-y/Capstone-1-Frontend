import React, { useState } from "react";

function Test() {
  const [poll, setPoll] = useState({
    title: "Top 3 Video Games",
    options: ["Black Ops 2", "Persona 5", "Elden Ring", "mario"],
  });

  // Rankings will look like: { Black Ops 2: 1, Persona 5: 2, Elden Ring: 3 }
  const [rankings, setRankings] = useState({});

  const handleRankingChange = (option, rank) => {
    // Remove any option that currently has this rank
    const updatedRankings = { ...rankings };

    // Find the option that had this rank and remove its assignment
    for (const key in updatedRankings) {
      if (updatedRankings[key] === rank) {
        updatedRankings[key] = null;
      }
    }

    // Assign the new rank to the selected option
    updatedRankings[option] = rank;

    setRankings(updatedRankings);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{poll.title}</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Game</th>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>4st</th>
          </tr>
        </thead>
        <tbody>
          {poll.options.map((option) => (
            <tr key={option}>
              <td>{option}</td>
              {[1, 2, 3, 4].map((rank) => (
                <td key={rank}>
                  <input
                    type="radio"
                    name={option}
                    value={rank}
                    checked={rankings[option] === rank}
                    onChange={() => handleRankingChange(option, rank)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Your Rankings:</h3>
      <ol>
        {Object.entries(rankings)
          .filter(([_, rank]) => rank !== null)
          .sort((a, b) => a[1] - b[1])
          .map(([option, rank]) => (
            <li key={option}>
              {rank}. {option}
            </li>
          ))}
      </ol>
    </div>
  );
}

export default Test;
