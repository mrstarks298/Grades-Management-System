
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(80),
    role VARCHAR(20) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(120) NOT NULL,
    semester VARCHAR(80) NOT NULL,
    semester_number INTEGER NOT NULL,
    enrolled_students INTEGER NOT NULL,
    faculty_name VARCHAR(120) NOT NULL,
    faculty_email VARCHAR(120) NOT NULL
);

CREATE TABLE grade_uploads (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    professor_email VARCHAR(120) REFERENCES users(email) NOT NULL
);

CREATE TABLE grades (
    grade_id SERIAL PRIMARY KEY,
    student_email VARCHAR(120) REFERENCES users(email) NOT NULL,
    course_id INTEGER REFERENCES courses(id) NOT NULL,
    upload_id INTEGER REFERENCES grade_uploads(id) NOT NULL,
    assessment_type VARCHAR(100) NOT NULL,
    score INTEGER,
    out_of INTEGER NOT NULL,
    hidden BOOLEAN DEFAULT FALSE,
    notified BOOLEAN DEFAULT FALSE,
    remarks TEXT
);
