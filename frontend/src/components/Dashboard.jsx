import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Link to="/dashboard" className="brand" style={{marginBottom: '2rem', display: 'block'}}>TCMS</Link>
        <h2>{role?.toUpperCase()} MENU</h2>
        
        <Link to="/dashboard" className="nav-item">Dashboard Home</Link>
        <Link to="/dashboard/timetable" className="nav-item">Timetable</Link>
        
        {role === 'admin' && (
          <>
            <Link to="/dashboard/users" className="nav-item">Manage Users</Link>
            <Link to="/dashboard/classrooms" className="nav-item">Manage Classrooms</Link>
            <Link to="/dashboard/subjects" className="nav-item">Manage Subjects</Link>
            <Link to="/dashboard/requests" className="nav-item">Change Requests</Link>
          </>
        )}
        
        {role === 'teacher' && (
          <>
            <Link to="/dashboard/requests" className="nav-item">Change Requests</Link>
            <Link to="/dashboard/classrooms" className="nav-item">Classrooms</Link>
          </>
        )}

        <button onClick={handleLogout} style={{marginTop: 'auto', background: 'var(--accent)'}}>Logout</button>
      </aside>

      <main className="main-content">
        <header style={{display: 'flex', justifyContent: 'space-between', marginBottom: '3rem'}}>
          <div>
            <h1 style={{margin: 0}}>Welcome back, {role}!</h1>
            <p style={{color: '#64748b'}}>Here is what's happening today.</p>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="label">Total Classes</span>
            <span className="value">12</span>
          </div>
          <div className="stat-card">
            <span className="label">Active Classrooms</span>
            <span className="value">8</span>
          </div>
          <div className="stat-card">
            <span className="label">Pending Requests</span>
            <span className="value">3</span>
          </div>
        </div>

        <div className="card" style={{marginTop: '3rem'}}>
          <h3>Quick Overview</h3>
          <p>The Timetable Management System is running smoothly. Use the sidebar to manage your schedules and resources.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
