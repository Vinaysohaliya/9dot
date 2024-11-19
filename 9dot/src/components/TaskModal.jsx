import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slice/tasksSlice';

const TaskModal = ({ setShowModal, selectedTask }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(selectedTask.dueDate);
      setStatus(selectedTask.status);
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert('Please fill out all fields');
      return;
    }

    const taskData = { title, description, dueDate, status };
    if (selectedTask) {
      console.log('Edit task');
    } else {
      dispatch(addTask(taskData));  
    }

    setShowModal(false);  
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedTask ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
        </form>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
