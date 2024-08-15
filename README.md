Grades Management System
Overview
The Grades Management System is a web application built with Flask that allows professors to upload and manage student grades, and students to view their academic performance. The system uses Google OAuth for authentication and PostgreSQL for data storage.
Features
For Professors:

Secure login using Google OAuth
Upload grades via CSV files
View uploaded grade records
Display detailed grade information for each upload

For Students:

Secure login using Google OAuth
View grades for different semesters
See detailed grade breakdowns including:

Individual course grades
Overall semester performance
Class averages and rankings


Hide specific grades if desired
Receive notifications for newly uploaded grades

Technical Stack

Backend: Flask (Python)
Database: PostgreSQL
Authentication: Google OAuth
ORM: SQLAlchemy
Frontend: HTML, CSS, JavaScript (assumed, not visible in the provided code)

Setup and Installation

Clone the repository
Install required Python packages:
Copypip install flask flask-dance flask-sqlalchemy pandas

Set up a PostgreSQL database
Update the database URI in the configuration:
pythonCopyapp.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'

Set up Google OAuth:

Create a project in the Google Developers Console
Enable the Google+ API
Create credentials (OAuth client ID)
Update the client_id and client_secret in the code


Set the SECRET_KEY for Flask
Run the application:
Copypython app.py


Database Models

User: Stores user information (students and professors)
Course: Contains course details
Grade: Stores individual grade entries
GradeUpload: Tracks grade upload sessions

Key Routes

/: Home page
/google_login: Handles Google OAuth login
/professor_dashboard: Dashboard for professors
/student_dashboard: Dashboard for students
/semester_grades: Displays semester grades for students
/display_grades: Shows uploaded grades for professors

CSV Upload Format
Professors must upload grades in a CSV file with the following columns:

email
course_name
semester
semester_number
assessment_type
score
out_of
enrolled_students
remarks

Security Features

Google OAuth for secure authentication
Role-based access control (student vs professor)
Server-side validation of uploaded CSV files
Protection against unauthorized grade access

Error Handling

Comprehensive error checking for CSV uploads
Flashy messages for user feedback
Logging of errors for debugging

Future Improvements

Implement email notifications for new grades
Add data visualization for grade trends
Enhance mobile responsiveness
Implement a grade appeal system

Contributing
Contributions to improve the Grades Management System are welcome. Please follow these steps:

Fork the repository
Create a new branch
Make your changes and commit them
Push to your fork and submit a pull request

License
[Specify your license here]
