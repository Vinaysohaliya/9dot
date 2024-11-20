 const TaskSkeleton = () => {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mt-4 mb-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="flex gap-4 mt-4">
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  };
  export default TaskSkeleton