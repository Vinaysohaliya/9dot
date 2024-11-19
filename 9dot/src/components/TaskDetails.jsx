import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, fetchTasks } from '../redux/slice/tasksSlice'; 

const TaskDetails = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(updateTask({ id: task._id, updatedData: updatedTask })); 
    setIsEditing(false); 
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task._id)); 
      window.location.reload();
    }
  };

  return (
    <div className="task-details max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Task</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={updatedTask.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={updatedTask.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Task
          </button>
        </form>
      ) : (
        <>
          <h2>{task.title}</h2>
          <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
          <p>Status: {task.status}</p>
          <p>{task.description}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit Task
          </button>

          <button
            onClick={handleDelete}
            className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Task
          </button>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
