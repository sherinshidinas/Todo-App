import React, { useState } from "react";
import { useTaskContext } from "../taskContext/TaskContext";
import "./AddTask.css";
function AddTask() {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState();
  const [dueDate, setDueDate] = useState();

  const handleAddTask = () => {
    if (title.trim() !== "") {
      dispatch({ type: "Add_Task", payload: { title, dueDate } });
      setTitle("");
      setDueDate("");
    }
  };
  return (
    <section className="addTask">
      <div className="container ">
        <input
          type="text"
          placeholder="add new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="due date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </section>
  );
}

export default AddTask;
