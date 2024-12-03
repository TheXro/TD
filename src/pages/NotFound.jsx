import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from "react-icons/hi2";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-white/70">Page not found</p>
      <button
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
      >
        <HiOutlineArrowLeft className="text-xl" />
        Back to Dashboard
      </button>
    </div>
  );
}

export default NotFound; 