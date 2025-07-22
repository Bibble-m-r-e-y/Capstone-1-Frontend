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
const statusText = {
  draft: "Continue your ballot...",
  published: "Vote!",
  ended: "Voting has Ended!",
  disabled: "This Poll has been disabled.",
};

export default function Poll({ pollData }) {
  const navigate = useNavigate();

  // This function will run when a poll is clicked on
  function handleClick(event) {
    event.preventDefault();
    // This navigate wont navigate to anything until the vote page component is done

    if (pollData.status === "published") {
      // If the poll is still in effect, clicking the poll will take you to the Voting Page
      navigate(`/voting-page/${pollData.pollId}`);
    } else if (pollData.status === "ended") {
      // If the poll is not in effect, clicking the poll will take you to the Ranking Results Page
      // This route of "ranking-results" doesnt have to be final, just an idea.
      navigate(`/ranking-results/${pollData.pollId}`);
    }
  }

  return (
    <div className="poll-card" onClick={handleClick}>
      <p className="status-text">{statusText[pollData.status]}</p>
      <h1 className="poll-heading">{pollData.title}</h1>
      <p>{pollData.description}</p>
      <p>EndDate: {pollData.endDate.toLocaleString()}</p>
      <p>Votes thus far: {pollData.sumOfVotes}</p>
    </div>
  );
}
