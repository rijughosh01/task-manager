import React, { useState } from "react";
import Task from "./components/Task";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("All");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true; // "All"
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {/* Add New Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          className={filter === "Pending" ? "active" : ""}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
