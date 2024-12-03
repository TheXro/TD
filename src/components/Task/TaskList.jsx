import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/tasksSlice";

function TaskList({ filteredTasks, showForm, setShowForm }) {
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    taskId: null,
    taskTitle: ""
  });

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({
      show: true,
      taskId: id,
      taskTitle: title
    });
  };

  const handleDelete = () => {
    dispatch(deleteTask(deleteConfirm.taskId));
    setDeleteConfirm({ show: false, taskId: null, taskTitle: "" });
  };

  // Filter tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === "To Do" && !task.isOverdue);
  const inProgressTasks = filteredTasks.filter(task => task.status === "In Progress" && !task.isOverdue);
  const doneTasks = filteredTasks.filter(task => task.status === "Done");
  const overdueTasks = filteredTasks.filter(task => task.isOverdue && task.status !== "Done");

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 border-1 border-white pt-4 ">
        <TaskColumn 
          title="To Do" 
          tasks={todoTasks} 
          onDeleteTask={handleDeleteClick}
        />
        <TaskColumn 
          title="In Progress" 
          tasks={inProgressTasks} 
          onDeleteTask={handleDeleteClick}
        />
        <TaskColumn 
          title="Done" 
          tasks={doneTasks} 
          onDeleteTask={handleDeleteClick}
        />
        <TaskColumn 
          title="Overdue" 
          tasks={overdueTasks} 
          onDeleteTask={handleDeleteClick}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="relative z-10">
            <TaskForm setForm={setShowForm} />
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, taskId: null, taskTitle: "" })}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${deleteConfirm.taskTitle}"?`}
      />
    </div>
  );
}

export default TaskList;
