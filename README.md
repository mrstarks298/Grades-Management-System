<h1 align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Operator+Mono&size=37&duration=2800&pause=2000&color=FAFAFA&center=true&vCenter=true&width=940&height=50&lines=Grades+Management+System;Manage+and+View+Student+Grades+Effortlessly" alt="Typing SVG" />
</h1>

## Overview

The Grades Management System is a web application built with Flask that enables professors to upload and manage student grades while allowing students to view their academic performance. The system provides secure Google OAuth authentication and stores data using PostgreSQL.

## Features

### For Professors:
- **Secure login using Google OAuth**
- **Upload grades via CSV files**
- **View uploaded grade records**
- **Display detailed grade information for each upload**

### For Students:
- **Secure login using Google OAuth**
- **View grades for different semesters**
- **See detailed grade breakdowns including:**
    - Individual course grades
    - Overall semester performance
    - Class averages and rankings*
- **Receive notifications for newly uploaded grades**

## Technical Stack

- **Backend:** Flask (Python)
- **Database:** PostgreSQL
- **Authentication:** Google OAuth 2.0
- **ORM:** SQLAlchemy
- **Frontend:** HTML, CSS, JavaScript

## Setup and Installation

1. **Clone the repository**
2. **Install required Python packages:**
    ```bash
    pip install flask flask-dance flask-sqlalchemy pandas
    ```
3. **Set up a PostgreSQL database**
4. **Update the database URI in the configuration:**
    ```python
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
    ```
5. **Set up Google OAuth:**
    - Create a project in the Google Developers Console
    - Enable the Google OAuth 2.0 API
    - Create credentials (OAuth client ID)
    - Update the `client_id` and `client_secret` in the code
6. **Set the SECRET_KEY for Flask**
7. **Run the application:**
    ```bash
    python app.py
    ```

## Database Models

- **User:** Stores user information (students and professors)
- **Course:** Contains course details
- **Grade:** Stores individual grade entries
- **GradeUpload:** Tracks grade upload sessions

## Key Routes

- **/**: Home page
- **/google_login**: Handles Google OAuth login
- **/professor_dashboard**: Dashboard for professors
- **/student_dashboard**: Dashboard for students
- **/semester_grades**: Displays semester grades for students
- **/display_grades**: Shows uploaded grades for professors

## CSV Upload Format

Professors must upload grades in a CSV file with the following columns:

- **email**
- **course_name**
- **semester**
- **semester_number**
- **assessment_type**
- **score**
- **out_of**
- **enrolled_students**
- **remarks**

## Security Features

- **Google OAuth for secure authentication**
- **Role-based access control (student vs professor)**
- **Server-side validation of uploaded CSV files**
- **Protection against unauthorized grade access**

## Error Handling

- **Comprehensive error checking for CSV uploads**
- **User feedback through flash messages**
- **Logging of errors for debugging**

## Contributing

Contributions, issues, and feature requests are welcome! Please feel free to submit feedback, open issues, or create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
