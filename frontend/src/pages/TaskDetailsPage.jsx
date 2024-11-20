import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../redux/slice/tasksSlice';
import { toast } from 'react-hot-toast';
import { Pencil, Trash, ArrowLeft } from 'lucide-react';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(null);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchTasks());
    } else {
      const foundTask = tasks.find((t) => t._id === id);
      setTask(foundTask);
      setUpdatedTask(foundTask);
    }
  }, [tasks, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const validateForm = () => {
    if (!updatedTask.title || !updatedTask.description || !updatedTask.dueDate) {
      toast.error('Please fill out all fields.');
      return false;
    }

    if (new Date(updatedTask.dueDate) < new Date()) {
      toast.error('Due date must be in the future.');
      return false;
    }

    return true;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(updateTask({ id, updatedData: updatedTask }))
      .then(() => {
        toast.success('Task updated successfully.');
        setTask(updatedTask);
        setIsEditing(false);
      })
      .catch(() => {
        toast.error('Failed to update the task.');
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id))
        .then(() => {
          toast.success('Task deleted successfully.');
          navigate('/');
        })
        .catch(() => {
          toast.error('Failed to delete the task.');
        });
    }
  };

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-4 sm:max-w-md md:max-w-xl lg:max-w-3xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-yellow-700 font-semibold mb-4 hover:text-yellow-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <h1 className="text-2xl font-bold mb-4 text-yellow-700">Edit Task</h1>

            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={updatedTask.description}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={updatedTask.dueDate}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                value={updatedTask.status}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full sm:w-auto"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="overflow-x-auto border border-yellow-300 rounded-lg p-4 mb-4">
              <h1 className="text-2xl font-bold text-yellow-700 whitespace-nowrap">
                {task.title}
              </h1>
            </div>

            <div className="flex justify-between items-center my-2 text-sm text-gray-500">
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p
                className={`font-semibold py-1 px-3 rounded-full ${task.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : task.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                  }`}
              >
                {task.status}
              </p>
            </div>

            <div className="overflow-x-auto  border border-yellow-300 rounded-lg p-4 mb-4 max-h-24">
              <p className="text-gray-600 whitespace-nowrap">{task.description}</p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center sm:w-auto"
              >
                <Pencil className="h-5 w-5" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center sm:w-auto"
              >
                <Trash className="h-5 w-5" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsPage;
