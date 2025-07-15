import React, { useState } from "react";
export default function CreatePoll() {
  // These are just inline styles I implemented quickly, they can be removed and placed in css file later
  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid black",
      width: "50%",
    },
    div: { position: "relative", display: "flex" },
    button: { position: "absolute", right: 0 },
  };

  // These represent the initial 2 poll options a user poll form needs
  const [options, setOptions] = useState([
    { id: 0, key: generateUniqueKey(0), required: true },
    { id: 1, key: generateUniqueKey(1), required: true },
  ]);

  // Think of Mock Users as the initial DB pull of existing users
  const MOCK_USERS = [
    { userId: 0, firstName: "Bob", lastName: "Sanchez" },
    { userId: 1, firstName: "Maria", lastName: "Hernandez" },
    { userId: 2, firstName: "Joshua", lastName: "Hernandez" },
  ];

  // For React element mapping, the extra numnber is necessary atleast for this implementation, it should also be a unique number
  function generateUniqueKey(num) {
    const date = new Date();
    return date.getTime() + num;
  }

  function selectUser(event) {
    event.target.disabled = true;
    const userValues = event.target.value.split(" ");
    const [userId, firstName, lastName] = [
      Number(userValues[0]),
      userValues[1],
      userValues[2],
    ];
  }

  // Adds poll option
  function addOption() {
    setOptions([
      ...options,
      {
        id: options[options.length - 1].id + 1,
        key: generateUniqueKey(options.length),
        required: false,
      },
    ]);
  }

  // Removes poll option
  function deleteOption(event) {
    event.preventDefault();
    const id = Number(event.target.parentNode.id);
    setOptions(options.filter((option) => option.id !== id));
  }

  return (
    <form style={styles.form}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" required />
      <label htmlFor="description">Description:</label>
      <input type="text" name="description" required />
      <label htmlFor="poll-option">
        Poll Options:
        {options.map((option) => (
          <div id={option.id} key={option.key} style={styles.div}>
            {!option.required && (
              <button style={styles.button} onClick={deleteOption}>
                Delete
              </button>
            )}
            <input type="text" required={option.required} />
          </div>
        ))}
        <button onClick={addOption}>Add Option</button>
      </label>
      <label htmlFor="endDate">End Date(optional)</label>
      <input type="date" />
      <label htmlFor="filter">Who can access your poll</label>
      <select name="filter" id="filter">
        <option defaultValue={null}>-- Select User --</option>
        {MOCK_USERS.map((user, i) => (
          <option
            key={generateUniqueKey(i)}
            value={`${user.userId} ${user.firstName} ${user.lastName}`}
            onClick={selectUser}
          >
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <button>Save as Draft</button>
      <button type="submit">Publish Poll</button>
    </form>
  );
}
