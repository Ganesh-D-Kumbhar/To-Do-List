import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialogue'; // Adjust the import path as needed

const TaskList = ({ tasks, searchQuery, onEditTask, onDeleteTask }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = tasks.filter(task => {
    const query = searchQuery.toLowerCase(); // Normalize search query for case-insensitivity
    return (
      task.assignedTo?.toLowerCase().includes(query) || // Check 'assignedTo'
      task.status?.toLowerCase().includes(query) || // Check 'status'
      task.dueDate?.toLowerCase().includes(query) || // Check 'dueDate'
      task.priority?.toLowerCase().includes(query) || // Check 'priority'
      task.description?.toLowerCase().includes(query) // Check 'description'
    );
  });

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.id);
      setIsDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="task-list">
      {filteredTasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.assignedTo || 'N/A'}</td>
                <td>{task.status || 'N/A'}</td>
                <td>{task.dueDate || 'N/A'}</td>
                <td>{task.priority || 'N/A'}</td>
                <td>{task.description || 'No description'}</td>
                <td>
                  <select onChange={(e) => {
                    const action = e.target.value;
                    if (action === 'edit') {
                      onEditTask(task);
                    } else if (action === 'delete') {
                      handleDeleteClick(task);
                    }
                    e.target.value = ''; // Reset the dropdown after selection
                  }}>
                    <option value="">Select action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>No tasks found</p>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
      />
    </div>
  );
};

export default TaskList;
