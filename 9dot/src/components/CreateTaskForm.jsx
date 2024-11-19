import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slice/tasksSlice';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert('Please fill out all fields');
      return;
    }

    const taskData = { title, description, dueDate, status };

    dispatch(addTask(taskData));

    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Create a New Task</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
          disabled={loading}
        >
          {loading ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default CreateTaskForm;
