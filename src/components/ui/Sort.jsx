import { useContext, useState } from "react";
import React from "react";
import { HiOutlineFunnel } from "react-icons/hi2";

function Filter({handleFilter}) {
  const priorities = ["All", "High", "Low", "Medium"];
  const [selected, setSelected] = useState(priorities[0]);

  const handleSelect = (item) => {
    handleFilter(item)
    setSelected(item);
  };

  return (
    <div className="flex gap-2 items-center border-2 p-1 rounded-lg bg-white/10 backdrop-blur-sm shadow-[2px_2px_#000000]">
      <HiOutlineFunnel className="text-lg text-white/70" />
      {priorities.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelect(item)}
          className={`px-2 py-0.5 text-sm rounded-md hover:bg-white hover:text-black transition-colors ${
            selected === item ? "bg-white text-black" : "text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Filter;
