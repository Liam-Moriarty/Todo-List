import React, { useState } from "react";
import Button from "./Button";
import { useAddNewTodoMutation } from "../redux/api";
// import { addTodos } from "../redux/todoSlice";

const TodoForm = () => {
  const [name, setName] = useState("");
  const [startingDate, setStartingDate] = useState(getTodayDate());
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const [addNewTodo] = useAddNewTodoMutation();

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is a single digit
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validation checks
    if (!name || !startingDate || !dueDate) {
      setError("All fields are required.");
      return;
    }

    try {
      await addNewTodo({
        name,
        startingDate,
        dueDate,
      });

      setName("");
      setStartingDate(getTodayDate());
      setDueDate("");
      setError("");
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="bg-dark-primary w-[20rem] max-md:w-full rounded-3xl py-2 px-4 text-dark-font shadow-3xl">
      <form onSubmit={onSubmit}>
        <h1 className="font-bold text-center text-2xl py-4 cursor-pointer">
          CREATE ACTIVITY
        </h1>
        <div className="flex gap-1 flex-col my-3">
          <label className="label">Input Activity:</label>
          <textarea
            className="border-none rounded-md outline-none px-2 text-dark-font font-regular"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-1 flex-col mb-3">
          <label className="label">Starting Date:</label>
          <input
            className="text-dark-font font-regular outline-none rounded-md px-2"
            type="date"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </div>

        <div className="flex gap-1 flex-col mb-3">
          <label className="label">Due Date:</label>
          <input
            className="text-dark-font font-regular outline-none rounded-md px-2"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          children="Submit"
          submit
          className={`my-3`}
          onClick={onSubmit}
        />

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default TodoForm;
