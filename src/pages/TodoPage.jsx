import React, { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const TodoPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      assignedTo: "Ganesh Kumbhar",
      status: "Pending",
      dueDate: "2024-03-01",
      priority: "High",
      description: "Implement new feature",
    },
    {
      id: 2,  
      assignedTo: "Suraj Lamkane",
      status: "Pending",
      dueDate: "2024-06-01",
      priority: "High",
      description: "Implement new feature",
    },
    {
      id: 3, 
      assignedTo: "Onkar Dingane",
      status: "Pending",
      dueDate: "2024-01-06",
      priority: "High",
      description: "Implement new feature",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3); // Pagination limit

  const handleAddNewTask = () => {
    setSelectedTask(null);  // Clear selected task when creating new
    setShowForm(true);  // Show the form for adding a task
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowForm(true); // Show the form with the selected task
  };

  const handleSubmitTask = (task) => {
    if (selectedTask) {
      // If editing, update the task in the task list
      const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updatedTasks);
    } else {
      // If adding new, generate a new ID
      const newTask = { ...task, id: Date.now() };
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);  
  };

  const handleDeleteTask = (id) => {
    // Correctly filter out the task with the matching id
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleFormClose = () => {
    setSelectedTask(null);
    setShowForm(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    setSearchQuery(""); // Clear the search query
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="todo-page">
      <h1><span>To-Do List</span> Application</h1>
      <div className="todo-controls">
        <div className="leftNav">
          <div className="flex">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/to-do-list-3d-icon-download-in-png-blend-fbx-gltf-file-formats--task-reminder-check-schedule-clipboard-pack-user-interface-icons-6324684.png"
              alt=""
            />
            <div>
              <h3>Tasks</h3>
              <p>All Tasks</p>
            </div>
          </div>
          <p>{tasks.length} records</p>
        </div>
        <div className="rightNav">
          <div>
            <button onClick={handleAddNewTask}>New Task</button>
            <button onClick={handleRefresh}>Refresh</button> 
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <TaskList
        tasks={currentTasks}
        searchQuery={searchQuery}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}  // Correct delete function
      />

      {showForm && (
        <TaskForm
          selectedTask={selectedTask}
          onSubmit={handleSubmitTask}
          onClose={handleFormClose}
        />
      )}

      <Pagination
        currentPage={currentPage}
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={paginate}
      />
    </div>
  );
};

export default TodoPage;
