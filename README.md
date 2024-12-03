# **Task Manager**

A modern task management application built with React that helps users organize their tasks with due dates, priorities, and different status columns.

## **Features**

### **Task Management**
- Create tasks with titles, descriptions, due dates, and times
- Edit existing tasks (title, description, due date, priority)
- Organize tasks in different status columns (To Do, In Progress, Done)
- Mark tasks as complete/incomplete
- Set and update task priorities (High, Medium, Low)
- Delete tasks

### **Smart Organization**
- Automatic overdue detection
- Tasks are automatically sorted by due dates
- Search functionality within each status column
- Local storage persistence

### **User Interface**
- Clean and intuitive interface
- Real-time status updates
- Priority color coding
- Responsive design for all screen sizes
- Edit mode with form validation

## **Tech Stack**

### **Core Technologies**
- React
- Redux Toolkit (State Management)
- React Router (Navigation)
- TailwindCSS (Styling)

### **Additional Libraries**
- React Icons

## **Getting Started**

1. **Clone the repository**
```bash
git clone https://github.com/thexro/TaskManager.git
cd TaskManager
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open the application**
```
Navigate to http://localhost:5173
```

## **Usage**

### **Creating Tasks**
- Click the "Add Task" button
- Fill in the task details (title, description, due date, priority)
- Submit to create the task

### **Editing Tasks**
- Click the edit icon on any task
- Modify task details in the edit form
- Save changes or cancel to revert
- All fields are validated before saving

### **Managing Tasks**
- Click on task status to move between To Do → In Progress → Done
- Click priority indicator to cycle through priority levels
- Use search bars to filter tasks within each column
- Click delete icon to remove tasks

### **Task States**
- **To Do**: Tasks that need to be started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks
- **Overdue**: Automatically marked when past due date

## **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## **Acknowledgments**

- Icons provided by React Icons
- Design inspired by modern task management applications



