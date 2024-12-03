import React, { useContext, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { TaskContext } from "../../context/TaskContext";
import Sort from "./Filter";

function SearchBar({ handleSearch, handleFilter }) {
  
  // const { tasks, setTasks } = useContext(TaskContext);
  // console.log(tasks);
  // const [filterTasks, setFilterTasks] = useState(tasks);
  return (
    <div className="py-6 flex justify-between md:flex-row flex-col gap-4">
      <div className="flex items-center border-2 border-white/20 p-2 rounded-2xl bg-white shadow-[3px_3px_#000000] md:w-[60%]">
        <HiOutlineMagnifyingGlass className="text-2xl opacity-50" />
        <input
          type="text"
          className="w-full bg-transparent outline-none px-2"
          placeholder="Start Searching . . . "
          onChange={handleSearch}
        />
      </div>
      <Sort handleFilter={handleFilter} />
    </div>
  );
}

export default SearchBar;
