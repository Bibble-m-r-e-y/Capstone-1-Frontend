import React, { useState } from "react";
export default function CreatePoll() {
  const [options, setOptions] = useState([
    { key: 1, required: true, placeholder: "required" },
    { key: 2, required: true, placeholder: "required" },
  ]);

  function createNewOption() {
    setOptions([
      ...options,
      {
        key: options[options.length - 1].key + 1,
        required: false,
        placeholder: "optional",
      },
    ]);
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" required />
      <label htmlFor="description">Description:</label>
      <input type="text" name="description" required />
      <label
        htmlFor="poll-option"
        style={{ display: "flex", flexDirection: "column" }}
      >
        Poll Options:
        {options.map((option, i) => (
          <input
            key={option.key}
            name="poll-option"
            required={option.required}
            placeholder={option.placeholder}
          />
        ))}
      </label>
      <button onClick={createNewOption}>+New Option</button>
      <button type="submit">Submit</button>
    </form>
  );
}
