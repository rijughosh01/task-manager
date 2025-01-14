import React, { useState } from "react";
import EditTask from "./EditTask";

const Task = ({ task, toggleComplete, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedTask) => {
    editTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <EditTask task={task} handleEdit={handleEdit} />
      ) : (
        <>
          {/* Task Title and Creation Date */}
          <h3>
            {task.title}{" "}
            <span className="task-date">
              ({new Date(task.createdAt).toLocaleDateString()})
              {task.dueDate && ` - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
            </span>
          </h3>

          {/* Task Priority */}
          <p>
            <span
              className={`priority-badge priority-${task.priority.toLowerCase()}`}
            >
              {task.priority} Priority
            </span>
          </p>

          {/* Task Description */}
          <p>{task.description}</p>

          {/* Task Buttons */}
          <div className="task-buttons">
            <button
              className="task-btn complete-btn"
              title={task.completed ? "Mark as Pending" : "Mark as Completed"}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="task-btn edit-btn"
              title="Edit this task"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="task-btn delete-btn"
              title="Delete this task"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
