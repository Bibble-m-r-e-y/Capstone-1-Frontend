import React, { useEffect, useState } from "react";
import Poll from "./Poll";
import "./Home.css";

const Home = () => {
  const MOCK_POLL_DATA = [
    {
      pollId: 0,
      title: "Poll 1",
      description: "Description for Poll 1",
      status: "draft",
      endDate: new Date("07/20/2025"),
      sumOfVotes: 5,
    },
    {
      pollId: 1,
      title: "Poll 2",
      description: "Description for Poll 2",
      status: "published",
      endDate: new Date("07/25/2025"),
      sumOfVotes: 5,
    },
    {
      pollId: 2,
      title: "Poll 3",
      description: "Description for Poll 3",
      status: "published",
      endDate: new Date("08/05/2025"),
      sumOfVotes: 5,
    },
    {
      pollId: 3,
      title: "Poll 4",
      description: "Description for Poll 4",
      status: "ended",
      endDate: new Date("08/09/2025"),
      sumOfVotes: 5,
    },
    {
      pollId: 4,
      title: "Poll 5",
      description: "Description for Poll 5",
      status: "ended",
      endDate: new Date("08/19/2025"),
      sumOfVotes: 3,
    },
    {
      pollId: 5,
      title: "Poll 6",
      description: "Description for Poll 6",
      status: "ended",
      endDate: new Date("09/12/2025"),
      sumOfVotes: 10,
    },
  ];

  const [nonDraftPolls, setNonDraftPolls] = useState([]);

  function filterNonDraftPolls() {
    setNonDraftPolls(
      MOCK_POLL_DATA.filter(
        (poll) => poll.status !== "draft" && poll.status !== "disabled",
      ),
    );
  }

  function generateKey(num) {
    const date = new Date();
    return date.getTime() + num;
  }

  useEffect(() => {
    // The fetch call will run through here for the initial DB poll data.

    // This function could maybe work instead inside of the async function that calls the api req.
    filterNonDraftPolls();
  }, []);

  return (
    <div className="polls-container">
      {nonDraftPolls.map((poll, index) => (
        <Poll pollData={poll} key={generateKey(index)} />
      ))}
    </div>
  );
};

export default Home;
