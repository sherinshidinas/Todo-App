import React, { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

const storedTasks = localStorage.getItem("tasks");

let parsedTasks;
try {
  parsedTasks = JSON.parse(storedTasks || "[]");
} catch (error) {
  console.error("Error parsing tasks from localStorage:", error);
  parsedTasks = [];
}

const initialState = {
  tasks: parsedTasks,
  filter: "all",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "Add_Task":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uuidv4(),
            title: action.payload.title,
            completed: false,
            dueDate: action.payload.dueDate || null,
          },
        ],
      };

    case "Remove_Task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "Toggle_Completion":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a provider");
  }

  return context;
};

export { TaskProvider, useTaskContext };
