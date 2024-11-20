import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slice/tasksSlice';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      toast.error('Please fill out all fields');
      return;
    }
    const currentDate = new Date();
    const selectedDueDate = new Date(dueDate);
    if (selectedDueDate <= currentDate) {
      toast.error('Due date must be a future date');
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
    <div className="max-w-lg mx-auto p-6 bg-yellow-50 rounded-lg shadow-lg w-full mt-8 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-yellow-700">Create a New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-yellow-600 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-yellow-600 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter task description"
          />
        </div>

        <div>
          <label className="block text-yellow-600 mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-yellow-600 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="flex justify-center items-center w-12 h-12 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 disabled:bg-yellow-300"
            disabled={loading}
          >
            {loading ? 'Adding...' : <Plus />}
          </button>
        </div>

      </form>

     
    </div>
  );
};

export default CreateTaskForm;
