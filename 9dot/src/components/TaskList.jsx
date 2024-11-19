import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, setFilterStatus } from '../redux/slice/tasksSlice';
import TaskDetails from '../components/TaskDetails';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filteredTasks, loading, error, filterStatus } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());  
  }, [dispatch]);

  const handleFilterChange = (event) => {
    const status = event.target.value;
    dispatch(setFilterStatus(status)); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <div>
      <h2>Task List</h2>

      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <TaskDetails key={task._id} task={task} />  
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
