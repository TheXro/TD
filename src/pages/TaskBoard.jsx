import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskList from "../components/Task/TaskList";
import Header from "../components/ui/Header";
import Sort from "../components/ui/Filter";
import { HiOutlinePlus } from "react-icons/hi2";

function TaskBoard() {
  const tasks = useSelector(state => state.tasks);
  const [filterPriority, setFilterPriority] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const handleFilter = (priority) => {
    setFilterPriority(priority);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    return matchesPriority;
  });

  return (
    <div>
      <Header name="User" />
      <div className="py-2 flex justify-between items-center">
        <Sort handleFilter={handleFilter} />
        <button
          className="bg-white text-black md:px-4 md:py-2 py-1 px-2 md:text-lg text-sm rounded-lg flex items-center gap-2 cursor-pointer border-2 duration-150 shadow-[2px_2px_#000000] hover:bg-gray-100"
          onClick={() => setShowForm(true)}
        >
          <HiOutlinePlus className="text-xl" /> <span className="hidden md:block">Add task</span>
        </button>
      </div>
      <TaskList 
        filteredTasks={filteredTasks} 
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </div>
  );
}

export default TaskBoard; 