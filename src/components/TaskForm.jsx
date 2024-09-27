import React, { useState, useEffect } from "react";

const TaskForm = ({ selectedTask, onSubmit, onClose }) => {
  const [task, setTask] = useState({
    assignedTo: "",
    status: "Pending",
    dueDate: "",
    priority: "Medium",
    description: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);  
    } else {
      setTask({
        assignedTo: "",
        status: "Pending",
        dueDate: "",
        priority: "Medium",
        description: "",
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.assignedTo || !task.description) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(task); 
  };

  return (
    <div className="modal-overlay">
      <div className="task-form-modal">
        <button type="button" className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{selectedTask ? "Edit Task" : "New Task"}</h2>
        <div className="form-row">
          <div>
            <label>
              <span>*</span>Assigned To
            </label>
            <input
              type="text"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              placeholder="Assigned To"
              required
            />
          </div>
          <div>
            <label>
              <span>*</span>Status
            </label>
            <select name="status" value={task.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              <span>*</span>Priority
            </label>
            <select name="priority" value={task.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <label htmlFor=""><span>*</span>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit">
            {selectedTask ? "Update Task" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
