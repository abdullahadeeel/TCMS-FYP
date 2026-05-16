import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newEntry, setNewEntry] = useState({ 
    subject_id: '', 
    teacher_id: '', 
    classroom_id: '', 
    day_of_week: 'Monday', 
    start_time: '', 
    end_time: '' 
  });
  const role = localStorage.getItem('role');

  const fetchData = async () => {
    try {
      const [resT, resS, resC, resU] = await Promise.all([
        api.get('/timetable'),
        api.get('/subjects'),
        api.get('/classrooms'),
        api.get('/users') // Note: Admin only
      ]);

      setTimetable(resT.data);
      setSubjects(resS.data);
      setClassrooms(resC.data);
      setTeachers(resU.data.filter(u => u.role === 'teacher'));
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      await api.post('/timetable', newEntry);
      fetchData();
      alert('Timetable entry added!');
    } catch (error) {
      alert('Failed to add timetable entry');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="main-content" style={{padding: 0}}>
      <h2>Timetable</h2>

      {role === 'admin' && (
        <form onSubmit={handleAddEntry} className="card" style={{marginBottom: '2rem'}}>
          <h3>Schedule New Class</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <select onChange={(e) => setNewEntry({...newEntry, subject_id: e.target.value})} required>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
            </select>
            <select onChange={(e) => setNewEntry({...newEntry, teacher_id: e.target.value})} required>
              <option value="">Select Teacher</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
            </select>
            <select onChange={(e) => setNewEntry({...newEntry, classroom_id: e.target.value})} required>
              <option value="">Select Classroom</option>
              {classrooms.map(c => <option key={c.id} value={c.id}>{c.room_number}</option>)}
            </select>
            <select onChange={(e) => setNewEntry({...newEntry, day_of_week: e.target.value})} required>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
            <input type="time" placeholder="Start Time" onChange={(e) => setNewEntry({...newEntry, start_time: e.target.value})} required />
            <input type="time" placeholder="End Time" onChange={(e) => setNewEntry({...newEntry, end_time: e.target.value})} required />
          </div>
          <button type="submit" style={{width: '100%', marginTop: '1rem'}}>Add to Timetable</button>
        </form>
      )}

      <div className="card">
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid #ddd'}}>
              <th style={{padding: '1rem'}}>Day</th>
              <th style={{padding: '1rem'}}>Subject</th>
              <th style={{padding: '1rem'}}>Time</th>
              <th style={{padding: '1rem'}}>Room</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((t) => (
              <tr key={t.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '1rem', fontWeight: 'bold'}}>{t.day_of_week}</td>
                <td style={{padding: '1rem'}}>{subjects.find(s => s.id === t.subject_id)?.subject_name || t.subject_id}</td>
                <td style={{padding: '1rem'}}>{t.start_time} - {t.end_time}</td>
                <td style={{padding: '1rem'}}>{classrooms.find(c => c.id === t.classroom_id)?.room_number || t.classroom_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Timetable;
