-- SQL file for TCMS (Enterprise Schema)

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Classrooms table
CREATE TABLE IF NOT EXISTS classrooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(20) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    location VARCHAR(100)
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) UNIQUE NOT NULL
);

-- Timetable table
CREATE TABLE IF NOT EXISTS timetable (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subjects(id),
    teacher_id INT REFERENCES users(id),
    classroom_id INT REFERENCES classrooms(id),
    day_of_week VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Timetable Change Requests
CREATE TABLE IF NOT EXISTS change_requests (
    id SERIAL PRIMARY KEY,
    timetable_id INT REFERENCES timetable(id),
    teacher_id INT REFERENCES users(id),
    reason TEXT NOT NULL,
    requested_time TIME,
    requested_room_id INT REFERENCES classrooms(id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
