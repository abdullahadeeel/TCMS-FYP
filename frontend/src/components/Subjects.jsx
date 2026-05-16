import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ subject_name: '', subject_code: '' });
  const role = localStorage.getItem('role');

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/subjects', newSubject);
      fetchSubjects();
      setNewSubject({ subject_name: '', subject_code: '' });
    } catch (error) {
      alert('Failed to add subject');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="main-content" style={{padding: 0}}>
      <h2>Subject Management</h2>
      
      {role === 'admin' && (
        <form onSubmit={handleAddSubject} className="card" style={{marginBottom: '2rem'}}>
          <h3>Add New Subject</h3>
          <input 
            type="text" 
            placeholder="Subject Name (e.g., Mathematics)" 
            value={newSubject.subject_name}
            onChange={(e) => setNewSubject({...newSubject, subject_name: e.target.value})} 
            required
          />
          <input 
            type="text" 
            placeholder="Subject Code (e.g., MATH101)" 
            value={newSubject.subject_code}
            onChange={(e) => setNewSubject({...newSubject, subject_code: e.target.value})} 
            required
          />
          <button type="submit">Add Subject</button>
        </form>
      )}

      <div className="card">
        <h3>Available Subjects</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid #ddd'}}>
              <th style={{padding: '1rem'}}>Code</th>
              <th style={{padding: '1rem'}}>Name</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '1rem'}}>{s.subject_code}</td>
                <td style={{padding: '1rem'}}>{s.subject_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Subjects;
