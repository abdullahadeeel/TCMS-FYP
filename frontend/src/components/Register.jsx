import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', full_name: '', role: 'student' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Sending registration data:', formData);
    try {
      const response = await api.post('/users', formData);
      console.log('Registration successful:', response.data);
      alert('Account created successfully. Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert(`Registration failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleRegister}
      className="card"
    >
      <h2>Create Account</h2>
      <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
      <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button type="submit">Register</button>
      <p style={{marginTop: '1rem', fontSize: '0.9rem'}}>Already have an account? <Link to="/login">Login here</Link></p>
    </motion.form>
  );
};

export default Register;
