const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const changeRequestRoutes = require('./routes/changeRequestRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/requests', changeRequestRoutes);

module.exports = app;
