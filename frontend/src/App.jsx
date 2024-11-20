import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import TaskDetailsPage from './pages/TaskDetailsPage.jsx';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetailsPage />} />
    </Routes>
  </Router>
);

export default App;
