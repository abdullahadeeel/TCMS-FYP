import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Classrooms from './components/Classrooms';
import Timetable from './components/Timetable';
import Subjects from './components/Subjects';
import Users from './components/Users';
import Requests from './components/Requests';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/classrooms" element={<Classrooms />} />
          <Route path="/dashboard/timetable" element={<Timetable />} />
          <Route path="/dashboard/subjects" element={<Subjects />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/requests" element={<Requests />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
