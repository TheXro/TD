import React, { createContext, useContext, useEffect, useState } from "react";

export const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: "Done",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    status: "Todo",
    priority: "Low",
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || initialTasks
  );

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
    
    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    )
};
