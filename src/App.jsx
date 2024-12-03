import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskBoard from './pages/TaskBoard';
import TaskDetails from './pages/TaskDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="px-2 py-2 md:px-8 md:py-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Task Manager</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
