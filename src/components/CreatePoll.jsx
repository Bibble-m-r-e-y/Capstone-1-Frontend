import React, { useState } from "react";
export default function CreatePoll() {
  // These are just inline styles I implemented quickly, they can be removed and placed in css file later
  const styles = {
    form: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid black",
      width: "50%",
    },
    div: { position: "relative", display: "flex" },
    button: { position: "absolute", right: 0 },
    img: {
      width: "35px",
      position: "absolute",
      top: 0,
      right: 0,
      cursor: "pointer",
    },
  };

  // These represent the initial 2 poll options a user poll form needs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pollOptions: [
      { id: 0, value: "", key: generateUniqueKey(0), required: true },
      { id: 1, value: "", key: generateUniqueKey(1), required: true },
    ],
    endDate: "",
    filter: [],
  });

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

  // Adds poll option
  function addOption(event) {
    event.preventDefault();
    if (formData.pollOptions.length >= 20) {
      return console.error("No more options can be added!");
    }
    const newOptionData = {
      id: formData.pollOptions[formData.pollOptions.length - 1].id + 1,
      value: "",
      key: generateUniqueKey(formData.pollOptions.length),
      required: false,
    };
    setFormData({
      ...formData,
      pollOptions: [...formData.pollOptions, newOptionData],
    });
  }

  // Removes poll option
  function deleteOption(event) {
    event.preventDefault();
    const id = Number(event.target.id);
    setFormData({
      ...formData,
      pollOptions: formData.pollOptions.filter((option) => option.id !== id),
    });
  }

  function onFormChange(event) {
    const temp = formData[event.target.name];
    if (event.target.name === "pollOptions") {
      temp[event.target.id].value = event.target.value;
      setFormData({
        ...formData,
        [event.target.name]: temp,
      });
    } else if (event.target.name === "filter") {
      const userValues = event.target.value.split(" ");
      temp.push({
        userId: Number(userValues[0]),
        firstName: userValues[1],
        lastName: userValues[2],
      });
      setFormData({
        ...formData,
        [event.target.name]: temp,
      });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  }

  function saveFormAsDraft(event) {
    event.preventDefault();

    // This should send a post request with the formData, and another property of 'status: "draft"'. I think it might be better to separate the `FormData` useState variable as simply representing the frontend form field inputs.
    const reqBody = {
      ...formData,
      options: formData.pollOptions.map((option) => option.value),
      status: "draft",
    };
    delete reqBody.pollOptions;
    console.log(reqBody);
  }

  function clearFormData(event) {
    event.preventDefault();

    setFormData({
      title: "",
      description: "",
      pollOptions: [
        { id: 0, value: "", key: generateUniqueKey(0), required: true },
        { id: 1, value: "", key: generateUniqueKey(1), required: true },
      ],
      endDate: "",
      filter: [],
    });
  }

  function deletePoll(event) {
    event.preventDefault();

    // This should send a delete request to the backend, after successful deletion, the page should either refresh to a fresh create poll page or move to a seperate vieweither refresh to a fresh create poll page or move to a seperate view.
  }

  function handlePublish(event) {
    event.preventDefault();

    // This should send a post request with the formData, and another property of 'status: "published"'.
    const reqBody = {
      ...formData,
      options: formData.pollOptions.map((option) => option.value),
      status: "published",
    };
    delete reqBody.pollOptions;

    console.log(reqBody);
    // After the post it might be helpful to either refresh the page to be fresh, or go to homepage/another page
  }

  return (
    <form style={styles.form} onSubmit={handlePublish}>
      {/* This will be non functional for now, clicking on this img (or whatever it will be by the end) will open 2 new options for "copy" or "delete". The functions are already created */}
      <img
        style={styles.img}
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Ffree-hamburger-menu-icon%2Ffree-hamburger-menu-icon-6.jpg"
      />
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        onChange={onFormChange}
        value={formData.title}
        required
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        onChange={onFormChange}
        value={formData.description}
        required
      />
      <label htmlFor="pollOptions">
        Poll Options:
        {formData.pollOptions.map((option, index) => (
          <div key={option.key} style={styles.div}>
            {!option.required && (
              <button
                id={option.id}
                style={styles.button}
                onClick={deleteOption}
              >
                Delete
              </button>
            )}
            <input
              type="text"
              id={index}
              name="pollOptions"
              onChange={onFormChange}
              value={formData.pollOptions[index].value}
              required={option.required}
            />
          </div>
        ))}
        <button onClick={addOption}>Add Option</button>
      </label>
      <label htmlFor="endDate">End Date(optional)</label>
      <input type="date" name="endDate" onChange={onFormChange} />
      <label htmlFor="filter">
        Who can access your poll
        <select name="filter" id="filter" onChange={onFormChange}>
          <option defaultValue={null}>-- Select User --</option>
          {MOCK_USERS.map((user, i) => (
            <option
              key={generateUniqueKey(i)}
              value={`${user.userId} ${user.firstName} ${user.lastName}`}
              disabled={formData.filter.some(
                (filteredUser) => filteredUser.userId === user.userId,
              )}
            >
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </label>
      <button onClick={saveFormAsDraft}>Save as Draft</button>
      <button type="submit">Publish Poll</button>
      <button onClick={clearFormData}>Clear Form</button>
    </form>
  );
}
