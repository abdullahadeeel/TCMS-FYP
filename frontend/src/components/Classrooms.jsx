import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ room_number: '', capacity: '', location: '' });
  const role = localStorage.getItem('role');

  const fetchClassrooms = async () => {
    try {
      const response = await api.get('/classrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Failed to fetch classrooms', error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/classrooms', newRoom);
      fetchClassrooms();
      setNewRoom({ room_number: '', capacity: '', location: '' });
    } catch (error) {
      alert('Failed to add classroom');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="main-content" style={{padding: 0}}>
      <h2>Classroom Management</h2>

      {role === 'admin' && (
        <form onSubmit={handleAddRoom} className="card" style={{marginBottom: '2rem'}}>
          <h3>Add New Classroom</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input type="text" placeholder="Room Number (e.g., A-101)" value={newRoom.room_number} onChange={(e) => setNewRoom({...newRoom, room_number: e.target.value})} required />
            <input type="number" placeholder="Capacity" value={newRoom.capacity} onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})} required />
            <input type="text" placeholder="Location" value={newRoom.location} onChange={(e) => setNewRoom({...newRoom, location: e.target.value})} required />
          </div>
          <button type="submit" style={{width: '100%', marginTop: '1rem'}}>Add Classroom</button>
        </form>
      )}

      <div className="card">
        <h3>Classrooms List</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid #ddd'}}>
              <th style={{padding: '1rem'}}>Room</th>
              <th style={{padding: '1rem'}}>Capacity</th>
              <th style={{padding: '1rem'}}>Location</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((c) => (
              <tr key={c.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '1rem', fontWeight: 'bold'}}>{c.room_number}</td>
                <td style={{padding: '1rem'}}>{c.capacity} Students</td>
                <td style={{padding: '1rem'}}>{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Classrooms;
