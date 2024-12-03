import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/tasksSlice';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { HiOutlineArrowLeft } from "react-icons/hi2";
import NotFound from './NotFound';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const task = useSelector(state => 
    state.tasks.find(t => t.id === parseFloat(id))
  );

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(task);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!task) {
    return <NotFound />
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask(formData));
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigate('/tasks');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-2 mb-4 px-3 py-1.5 border-2 rounded-lg text-white border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-[2px_2px_#000000]"
      >
        <HiOutlineArrowLeft className="text-lg" />
        Back to Dashboard
      </button>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 p-4 shadow-[3px_3px_#000000]">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="text-2xl font-bold w-full bg-white/10 rounded-lg p-2 text-white border-2 border-white/20"
            />
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white/10 rounded-lg p-2 text-white border-2 border-white/20"
              rows={3}
            />
            
            <div className="space-y-2">
              <label className="text-white">Status:</label>
              <select
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full bg-white/10 rounded-lg p-2 text-white border-2 border-white/20"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white">Priority:</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
                className="w-full bg-white/10 rounded-lg p-2 text-white border-2 border-white/20"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white">Due Date:</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={e => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full bg-white/10 rounded-lg p-2 text-white border-2 border-white/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white">Due Time:</label>
                <input
                  type="time"
                  value={formData.dueTime}
                  onChange={e => setFormData({...formData, dueTime: e.target.value})}
                  className="w-full bg-white/10 rounded-lg p-2 text-white border-2 border-white/20"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-4 py-2 border-2 rounded-lg bg-white text-black shadow-[2px_2px_#000000]"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 border-2 rounded-lg text-white border-white/20 bg-white/10 hover:bg-white/20 shadow-[2px_2px_#000000]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-white">{task.title}</h1>
            <p className="text-white/70 mb-6">{task.description}</p>
            <div className="flex gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${
                task.status === 'Done' ? 'bg-[#222] text-white' :
                task.status === 'In Progress' ? 'bg-blue-600 text-white' :
                'bg-[#222] text-white'
              }`}>
                {task.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                task.priority === 'High' ? 'bg-red-500 text-white' :
                task.priority === 'Low' ? 'bg-green-400' :
                'bg-yellow-400'
              }`}>
                {task.priority}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 border-2 rounded-lg bg-white text-black shadow-[2px_2px_#000000]"
              >
                Edit Task
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 border-2 rounded-lg bg-red-500 text-white shadow-[2px_2px_#000000]"
              >
                Delete Task
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${task.title}"?`}
      />
    </div>
  );
}

export default TaskDetails; 