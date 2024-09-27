import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, task }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <div className="confirm-dialog-header">
          <h3>Delete</h3>
        </div>
        <div className="confirm-dialog-body">
          <p>Do you want to delete the task assigned to <strong>{task.assignedTo}</strong>?</p>
        </div>
        <div className="confirm-dialog-footer">
          <button onClick={onClose}>No</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
