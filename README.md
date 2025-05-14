# School Management System


### About

This MERN Full stack web application is a School Management System built with __React.js__ for frontend,
__Express.js__ for creating REST API, __MongoDB__ for database and __Cloudinary__ for files upload. 

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud URI)
- Cloudinary account
- Razorpay account (for payment testing)

### Installation

```bash
# Clone the repo
git clone https://github.com/Piyush-Kr-Sharma/SchoolVerse.git

# Navigate to project folder
cd SchoolVerse

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the Application

```bash
# Both frontend and backend can be started at one go
cd backend
npm run dev

```

## 🔗 Live Demo

[Click here to view the deployed app](https://school-verse-frontend.vercel.app/)


### Admin Dashboard
Admin can create/delete new student, class, teachers and he/she can also see how much fee collection has been made in an acedamic year.

![Screenshot (62)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20001255.png)

### Teacher Dashboard
Teacher can see how many students are there in his class, how much test he has taken, also he can see the notice uploaded by the admin of the School

![Screenshot (51)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20001416.png)

### Class Attendance
Teacher can take the attendance of the whole class each day and it get saved in the database.

![Screenshot (52)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20001453.png)

### Attendance History
Teacher can see the attendance of any previous dates(if the attendance has been taken on that day only)

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20001504.png)

### Class Assignment
Teacher can upload assignment for the whole class.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20001944.png)

### Student Assignment Section
All the students of the class can see the assignment uploaded by the teacher on their portal and they can submit their assignment by choosing the assignment file completed by the student and submitted it.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20004842.png)

### Assigment Submission List
Teacher can see the list of students who have submiited their work on the assignmnet he/she has given.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20002517.png)

### Students List
Teacher can see all the information abut each student, provide marks to the students and can also complain about any student to his parent via Email.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20002557.png)

### Students Information
Teacher can see all information about a particular student which includes Name, Class, Roll Number, Attendance percentage, list of date on which he/she is present

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20002622.png)

### Student's Complain
Teacher can complain about any student to his/her parents via Email

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20002747.png)

### Sample Complaint

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20002943.png)

### Student Dashboard
Student can see total subjects in his/her class, total assignments pending, attendance percentage, and the notice uploaded by the admin on the dashboard page.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20004750.png)

### Fee Section
Student can see the information about his/her fee payment for the whole year at one place.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20005003.png)

### Fee payment using Razorpay
Student can pay their school fee at their portal only via Razorpay which includes various types of payment methods and once the student pays their fee it will automatically show paid for that month and
this amount will get added in the admin's Fee Collection.

![Screenshot (53)](https://github.com/Piyush-Kr-Sharma/SchoolVerse/blob/main/ScreenShots/Screenshot%202025-02-01%20005029.png)


## Features
<b>Admin Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Create/Delete Student | &#10004; | Admin can create or remove student records |
| Create/Delete Teacher | &#10004; | Admin can create or remove teacher accounts |
| Create/Delete Class | &#10004; | Admin can manage class creation and deletion |
| View Fee Collection | &#10004; | Admin can view fee collection statistics by academic year |
| Upload Notices | &#10004; | Admin can post school-wide notices for teachers and students |

<b>Teacher Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| View Assigned Class Details | &#10004; | Teachers can view student list, subjects, and class info |
| Take Class Attendance | &#10004; | Teachers can take daily attendance and store it in the database |
| View Attendance History | &#10004; | Teachers can check attendance records by date |
| Upload Class Assignments | &#10004; | Teachers can upload assignments for the entire class |
| View Assignment Submissions | &#10004; | Teachers can track who has submitted assignments |
| View Student Info | &#10004; | Teachers can see each student's details and performance |
| Grade Students | &#10004; | Teachers can assign marks to students |
| Send Complaints via Email | &#10004; | Teachers can email complaints to a student’s parent |

<b>Student Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| View Dashboard | &#10004; | Students can view subjects, pending assignments, and notices |
| Submit Assignments | &#10004; | Students can upload completed assignments |
| Track Attendance | &#10004; | Students can view attendance percentage and present dates |
| View Fee Details | &#10004; | Students can check yearly fee breakdown |
| Pay Fees Online | &#10004; | Students can pay monthly fees using Razorpay |

| Get List of All Products | &#10004; | Ability to get all the List of Products | 
