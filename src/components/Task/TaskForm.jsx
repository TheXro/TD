import React, { useContext, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/tasksSlice";

function TaskForm({setForm}) {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const isOverdue = (date, time) => {
    const now = new Date();
    const dueDate = new Date(`${date}T${time}`);
    return now > dueDate;
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      alert("Please fill all the fields");
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      status: status || "To Do",
      priority: priority || "Medium",
      dueDate,
      dueTime,
      isOverdue: isOverdue(dueDate, dueTime)
    };

    dispatch(addTask(newTask));
    setForm(false);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[99]"

    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setForm(false)} />
      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 w-[90%] max-w-[500px] flex flex-col gap-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 shadow-[3px_3px_#000000]"
      >
        {/* Title Input */}
        <div>
          <input
            autoFocus={true}
            type="text"
            placeholder="Enter Task Title"
            className="w-full text-2xl font-bold bg-white/10 rounded-lg p-2 text-white placeholder-white/50 border-2 border-white/20 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <textarea
            placeholder="Enter Task Description"
            className="w-full text-base bg-white/10 rounded-lg p-2 text-white placeholder-white/50 border-2 border-white/20 outline-none resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Status and Priority Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white mb-2">Status</p>
            <div className="space-y-2 text-white">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="To Do"
                  checked={status === "To Do"}
                  onChange={handleStatusChange}
                />
                To Do
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="In Progress"
                  checked={status === "In Progress"}
                  onChange={handleStatusChange}
                />
                In Progress
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Done"
                  checked={status === "Done"}
                  onChange={handleStatusChange}
                />
                Done
              </label>
            </div>
          </div>

          <div>
            <p className="text-white mb-2">Priority</p>
            <div className="space-y-2 text-white">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={handlePriorityChange}
                />
                Low
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={handlePriorityChange}
                />
                Medium
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={handlePriorityChange}
                />
                High
              </label>
            </div>
          </div>
        </div>

        {/* Date and Time Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className="block mb-2 text-white">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border-2 border-white/20 bg-white/10 rounded-lg p-2 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="dueTime" className="block mb-2 text-white">Due Time:</label>
            <input
              type="time"
              id="dueTime"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full border-2 border-white/20 bg-white/10 rounded-lg p-2 text-white"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 mt-2">
          <button
            type="button"
            onClick={() => setForm(false)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white border-2 border-white hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
          >
            <HiOutlinePlus className="text-xl" /> Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
