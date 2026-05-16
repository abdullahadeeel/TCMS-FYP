import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hero"
      >
        <span className="badge" style={{background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: '600'}}>NEW v2.0 RELEASE</span>
        <h1>Schedule Your <br/> Success with <span style={{color: 'var(--secondary)'}}>TCMS</span></h1>
        <p>The ultimate enterprise-grade Timetable Management System. Seamlessly coordinate classrooms, teachers, and students with one powerful platform.</p>
        
        <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center'}}>
          <button onClick={() => navigate('/login')} style={{padding: '1.2rem 3rem', fontSize: '1.1rem'}}>Enter Dashboard</button>
          <button onClick={() => navigate('/register')} style={{background: 'white', color: 'var(--primary)', border: '2px solid var(--primary)', padding: '1.2rem 3rem', fontSize: '1.1rem'}}>Create Account</button>
        </div>
      </motion.div>

      <div className="stats-grid" style={{marginTop: '6rem', width: '100%', maxWidth: '1000px'}}>
        <div className="card">
          <h3 style={{color: 'var(--primary)'}}>Smart Scheduling</h3>
          <p>Automated classroom allocation and conflict detection.</p>
        </div>
        <div className="card">
          <h3 style={{color: 'var(--secondary)'}}>Real-time Updates</h3>
          <p>Instantly notify teachers and students of any changes.</p>
        </div>
        <div className="card">
          <h3 style={{color: 'var(--accent)'}}>Analytics</h3>
          <p>Gain insights into classroom utilization and peak hours.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
