import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="main-content" style={{padding: 0}}>
      <h2>User Management</h2>

      <div className="card">
        <h3>System Users</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid #ddd'}}>
              <th style={{padding: '1rem'}}>Full Name</th>
              <th style={{padding: '1rem'}}>Username</th>
              <th style={{padding: '1rem'}}>Role</th>
              <th style={{padding: '1rem'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '1rem'}}>{u.full_name}</td>
                <td style={{padding: '1rem'}}>{u.username}</td>
                <td style={{padding: '1rem'}}><span className={`badge ${u.role}`} style={{background: u.role === 'admin' ? '#fee2e2' : '#e0e7ff', color: u.role === 'admin' ? '#991b1b' : '#3730a3', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem'}}>{u.role.toUpperCase()}</span></td>
                <td style={{padding: '1rem'}}>
                  <button onClick={() => handleDeleteUser(u.id)} style={{background: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Users;
