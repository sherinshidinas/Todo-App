import "./App.css";
import AddTask from "./components/addTask/AddTask";
import { TaskProvider } from "./components/taskContext/TaskContext";
import TaskList from "./components/taskList/TaskList";

function App() {
  return (
    <div className="container">
      <h3>ToDo List</h3>
      <TaskProvider>
        <AddTask />
        <TaskList />
      </TaskProvider>
    </div>
  );
}

export default App;
