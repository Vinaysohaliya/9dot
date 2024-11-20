import React from 'react';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';

const Home = () => {
  return (
    <div className="bg-neutral-50 text-neutral-800 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-amber-600 mb-8">
        Task Manager
      </h1>
      <div className="flex flex-col gap-8 items-center justify-center lg:flex-row lg:items-start lg:justify-around">
        <div className="w-full max-w-md lg:sticky lg:top-16">
          <CreateTaskForm />
        </div>

        <div className="w-full max-w-4xl">
          <TaskList />
        </div>

      </div>
    </div>
  );
};

export default Home;
