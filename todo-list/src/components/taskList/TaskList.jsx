import React from "react";
import { useTaskContext } from "../taskContext/TaskContext";
import "./TaskList.css";

function TaskList() {
  const { state, dispatch } = useTaskContext();

  const tasks = state.tasks || [];

  const handleRemoveTask = (id) => {
    dispatch({ type: "Remove_Task", payload: { id } });
  };
  const handleToggleCompletion = (id) => {
    dispatch({ type: "Toggle_Completion", payload: { id } });
  };

  return (
    <div className="tasklist">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="left">
              <h4>{task.title}</h4>
              <p>{task.dueDate && `(Due: ${task.dueDate})`}</p>
            </div>

            <div className="right">
              <button onClick={() => handleToggleCompletion(task.id)}>
                {task.completed ? "completed" : "Upcoming"}
              </button>
              <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
