import React from "react";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function TaskItem({ task, deleteTask, markDone, changePriority }) {
  const navigate = useNavigate();

  const isOverdue = () => {
    if (task.status === "Done") return false;
    const now = new Date();
    const dueDate = new Date(`${task.dueDate}T${task.dueTime}`);
    return now > dueDate;
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "Done":
        return "bg-[#222] text-white";
      case "In Progress":
        return "bg-blue-600 text-white";
      default:
        return "bg-[#222] text-white";
    }
  };

  const getNextStatus = () => {
    switch (task.status) {
      case "To Do":
        return "In Progress";
      case "In Progress":
        return "Done";
      case "Done":
        return "To Do";
      default:
        return "To Do";
    }
  };

  const handleDeleteClick = (e, id, title) => {
    e.stopPropagation();
    deleteTask(id, title);
  };

  const handleStatusClick = (e, id) => {
    e.stopPropagation();
    markDone(id);
  };

  const handlePriorityClick = (e, id) => {
    e.stopPropagation();
    changePriority(id);
  };

  const getDueDateColor = () => {
    if (task.status === "Done") {
      return "text-white/50"; // Dimmed for completed tasks
    }
    if (isOverdue()) {
      return "text-red-400"; // Red for overdue tasks
    }
    // Check if due date is today
    const today = new Date().toISOString().split('T')[0];
    if (task.dueDate === today) {
      return "text-yellow-400"; // Yellow for tasks due today
    }
    return "text-blue-300"; // Default color for upcoming tasks
  };

  return (
    <div
      className={`flex flex-col rounded-lg p-2 my-2 border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-[2px_2px_#000000] z-0 ${
        task.status === "Done"
          ? "bg-white/5 border-white/10"
          : isOverdue()
          ? "border-red-500"
          : task.status === "In Progress"
          ? "border-blue-500"
          : ""
      }`}
    >
      <div className="flex justify-between mb-1">
        <div className="flex flex-col">
          <h3 
            className={`text-base font-semibold cursor-pointer hover:underline text-white ${
              task.status === "Done" ? "text-white/50" : ""
            }`}
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            {task.title}
          </h3>
          <p className={`text-xs ${
            task.status === "Done" ? "text-white/50" : "text-white/70"
          }`}>
            {task.description}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <HiOutlinePencil
            className="text-lg cursor-pointer text-white/70 hover:text-white"
            onClick={() => navigate(`/tasks/${task.id}`)}
          />
          <HiOutlineTrash
            className="text-lg cursor-pointer text-white/70 hover:text-white"
            onClick={() => deleteTask(task.id, task.title)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-1">
        <span className={`text-xs font-medium ${getDueDateColor()}`}>
          Due: {new Date(`${task.dueDate}T${task.dueTime}`).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </span>
        <div
          onClick={() => markDone(task.id)}
          className={`rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${getStatusColor()}`}
          title={`Click to change status to ${getNextStatus()}`}
        >
          {task.status}
        </div>
        <div
          onClick={() => changePriority(task.id)}
          className={`rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer ${
            task.priority === "High"
              ? "bg-red-500 text-white"
              : task.priority === "Low"
              ? "bg-green-400"
              : "bg-yellow-400"
          }`}
        >
          {task.priority}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
