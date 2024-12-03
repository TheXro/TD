import { createSlice } from '@reduxjs/toolkit';

const initialTasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Draft and submit the Q4 project proposal",
    status: "To Do",
    priority: "High",
    dueDate: "2024-11-15",
    dueTime: "14:00",
    isOverdue: true
  },
  {
    id: 2,
    title: "Review Code Changes",
    description: "Review pending pull requests for the main branch",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2024-11-30",
    dueTime: "17:00",
    isOverdue: true
  },
  {
    id: 3,
    title: "Update Documentation",
    description: "Update API documentation with new endpoints",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-12-15",
    dueTime: "12:00",
    isOverdue: false
  },
  {
    id: 4,
    title: "System Maintenance",
    description: "Perform routine system maintenance and updates",
    status: "Done",
    priority: "Medium",
    dueDate: "2024-12-20",
    dueTime: "16:30",
    isOverdue: false
  },
  {
    id: 5,
    title: "Year-end Review",
    description: "Complete annual performance reviews",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-12-28",
    dueTime: "15:00",
    isOverdue: false
  },
  {
    id: 6,
    title: "New Feature Implementation",
    description: "Implement user authentication system",
    status: "To Do",
    priority: "High",
    dueDate: "2025-01-15",
    dueTime: "11:00",
    isOverdue: false
  },
  {
    id: 7,
    title: "Team Training",
    description: "Conduct training session for new team members",
    status: "To Do",
    priority: "Medium",
    dueDate: "2025-02-01",
    dueTime: "10:00",
    isOverdue: false
  },
  {
    id: 8,
    title: "Q1 Planning",
    description: "Prepare Q1 2025 roadmap and objectives",
    status: "To Do",
    priority: "High",
    dueDate: "2025-01-05",
    dueTime: "09:00",
    isOverdue: false
  }
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: JSON.parse(localStorage.getItem('tasks')) ||  initialTasks,
  reducers: {
    addTask: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    },
    toggleStatus: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        switch (task.status) {
          case "To Do":
            task.status = "In Progress";
            break;
          case "In Progress":
            task.status = "Done";
            task.isOverdue = false;
            break;
          case "Done":
            task.status = "To Do";
            const now = new Date();
            const dueDate = new Date(`${task.dueDate}T${task.dueTime}`);
            task.isOverdue = now > dueDate;
            break;
          default:
            task.status = "To Do";
        }
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    changePriority: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        if (task.priority === 'High') task.priority = 'Low';
        else if (task.priority === 'Low') task.priority = 'Medium';
        else task.priority = 'High';
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    checkOverdueTasks: (state) => {
      state.forEach(task => {
        if (task.status !== "Done") {
          const now = new Date();
          const dueDate = new Date(`${task.dueDate}T${task.dueTime}`);
          task.isOverdue = now > dueDate;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    updateTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...action.payload,
          isOverdue: new Date() > new Date(`${action.payload.dueDate}T${action.payload.dueTime}`)
        };
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    }
  }
});

export const { addTask, deleteTask, toggleStatus, changePriority, checkOverdueTasks, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer; 