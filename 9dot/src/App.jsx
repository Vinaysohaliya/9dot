import React from 'react';
import CreateTaskForm from './components/CreateTaskForm.jsx';
import TaskList from './components/TaskList.jsx';

const App = () => {
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskList/>
      <CreateTaskForm/>
    </div>
  );
};

export default App;
