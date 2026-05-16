import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [newRequest, setNewRequest] = useState({ timetable_id: '', reason: '', requested_time: '', requested_room_id: '' });
  const role = localStorage.getItem('role');

  const fetchData = async () => {
    try {
      const [resR, resT, resC] = await Promise.all([
        api.get('/requests'),
        api.get('/timetable'),
        api.get('/classrooms')
      ]);
      setRequests(resR.data);
      setTimetable(resT.data);
      setClassrooms(resC.data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests', newRequest);
      fetchData();
      alert('Change request submitted!');
    } catch (error) {
      alert('Failed to submit request');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/requests/${id}`, { status });
      fetchData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="main-content" style={{padding: 0}}>
      <h2>Timetable Change Requests</h2>

      {role === 'teacher' && (
        <form onSubmit={handleSubmitRequest} className="card" style={{marginBottom: '2rem'}}>
          <h3>New Change Request</h3>
          <select onChange={(e) => setNewRequest({...newRequest, timetable_id: e.target.value})} required>
            <option value="">Select Class to Change</option>
            {timetable.map(t => <option key={t.id} value={t.id}>{t.day_of_week} class</option>)}
          </select>
          <textarea 
            placeholder="Reason for change" 
            style={{width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '1rem'}}
            onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
            required
          />
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input type="time" placeholder="Requested Time" onChange={(e) => setNewRequest({...newRequest, requested_time: e.target.value})} />
            <select onChange={(e) => setNewRequest({...newRequest, requested_room_id: e.target.value})}>
              <option value="">Select Requested Room (Optional)</option>
              {classrooms.map(c => <option key={c.id} value={c.id}>{c.room_number}</option>)}
            </select>
          </div>
          <button type="submit" style={{width: '100%', marginTop: '1rem'}}>Submit Request</button>
        </form>
      )}

      <div className="card">
        <h3>Requests History</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid #ddd'}}>
              <th style={{padding: '1rem'}}>Teacher</th>
              <th style={{padding: '1rem'}}>Subject</th>
              <th style={{padding: '1rem'}}>Reason</th>
              <th style={{padding: '1rem'}}>Status</th>
              {role === 'admin' && <th style={{padding: '1rem'}}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                <td style={{padding: '1rem'}}>{r.teacher_name}</td>
                <td style={{padding: '1rem'}}>{r.subject_name}</td>
                <td style={{padding: '1rem'}}>{r.reason}</td>
                <td style={{padding: '1rem'}}>
                  <span style={{
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: r.status === 'pending' ? '#fef3c7' : r.status === 'approved' ? '#d1fae5' : '#fee2e2',
                    color: r.status === 'pending' ? '#92400e' : r.status === 'approved' ? '#065f46' : '#991b1b'
                  }}>{r.status.toUpperCase()}</span>
                </td>
                {role === 'admin' && r.status === 'pending' && (
                  <td style={{padding: '1rem', display: 'flex', gap: '0.5rem'}}>
                    <button onClick={() => handleUpdateStatus(r.id, 'approved')} style={{background: '#10b981', padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}>Approve</button>
                    <button onClick={() => handleUpdateStatus(r.id, 'rejected')} style={{background: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}>Reject</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Requests;
