import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, setFilterStatus } from '../redux/slice/tasksSlice';
import TaskDetails from '../components/TaskDetails';
import TaskSkeleton from '../components/TaskSkeleton';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, filterStatus } = useSelector((state) => state.tasks);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleFilterChange = (event) => {
    const status = event.target.value;
    dispatch(setFilterStatus(status));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleTasksPerPageChange = (event) => {
    const value = event.target.value;
    if (value > 0) {
      setTasksPerPage(Number(value));
      setCurrentPage(1);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === 'All' || task.status === filterStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (loading) {
    return (
      <div className="p-6 bg-yellow-50 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-yellow-700 mb-6">Task List</h2>
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-yellow-50 rounded-lg shadow-lg w-full max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center text-yellow-700">Task List</h2>

      <div>
        <label className="block mb-2">Search Tasks:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title or description"
          className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label className="block mb-2">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Tasks Per Page:</label>
        <input
          type="number"
          value={tasksPerPage}
          onChange={handleTasksPerPageChange}
          min="1"
          className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {currentTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul className="space-y-4">
          {currentTasks.map((task) => (
            <TaskDetails key={task._id} task={task} />
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-center items-center flex-wrap gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300"
        >
          Previous
        </button>
        <span className="text-yellow-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
