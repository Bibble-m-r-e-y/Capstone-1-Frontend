import React from "react";
import { useNavigate } from "react-router-dom";
import "./Poll.css";

/*
Data Needed(for now):
- Poll ID (not used within the element)
- Title
- Description
- status: (DRAFT, PUBLISHED, ENDED, DISABLED)
- endDate
- sumOfVotes
*/

export default function Poll({ pollData }) {
  const navigate = useNavigate();

  // This function will run when a poll is clicked on
  function handleClick(event) {
    event.preventDefault();
    // This navigate wont navigate to anything until the vote page component is done
    navigate(`/voting-page/${pollData.pollId}`);
  }

  return (
    <div className="poll-card" onClick={handleClick}>
      <p className="status-text">
        {pollData.status === "published" ? "Vote!" : "Poll has Ended!"}
      </p>
      <h1 className="poll-heading">{pollData.title}</h1>
      <p>{pollData.description}</p>
      <p>EndDate: {pollData.endDate.toLocaleString()}</p>
      <p>Votes thus far: {pollData.sumOfVotes}</p>
    </div>
  );
}
