import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/slice/tasksSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash } from 'lucide-react';

const TaskDetails = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    window.location.reload()
    
  };

  const handleViewMore = () => {
    navigate(`/task/${task._id}`);
  };

  return (
    <div className="task-details max-w-md mx-auto p-4 bg-white rounded-lg shadow-md my-4">
      <h2 className="text-lg font-bold text-gray-800">{task.title.slice(0, 35)}</h2>
      <div className="border-b my-2"></div> {/* Slim line below the title */}

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

      <p className="text-gray-600 mt-2">{task.description.slice(0, 35)}...</p>

      <div className="mt-4 flex justify-between items-center">
        {/* Removed the edit button */}
        <button
          onClick={handleViewMore}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View More
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
