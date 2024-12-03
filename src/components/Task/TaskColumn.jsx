import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleStatus, changePriority } from '../../store/tasksSlice';

function TaskColumn({ title, tasks, bgColor, onDeleteTask }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleMarkDone = (id) => {
    dispatch(toggleStatus(id));
  };

  const handleChangePriority = (id) => {
    dispatch(changePriority(id));
  };

  return (
    <div className="flex-1 min-w-[250px] mx-1">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <span className="text-xs text-white/70">{filteredTasks.length} tasks</span>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center border-2 border-white/20 p-1 rounded-lg bg-white/10 backdrop-blur-sm shadow-[2px_2px_#000000]">
          <HiOutlineMagnifyingGlass className="text-lg text-white/70" />
          <input
            type="text"
            className="w-full bg-transparent outline-none px-2 text-sm text-white placeholder-white/50"
            placeholder={`Search in ${title}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={`bg-white/10 backdrop-blur-sm p-2 rounded-lg min-h-[150px]`}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={onDeleteTask}
            markDone={handleMarkDone}
            changePriority={handleChangePriority}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn; 