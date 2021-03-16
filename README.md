I did this now 16/03/2021 3:30

Lab Assignment #3 – Designing and implementing a complete web app using MERN stack

Due Date:	Week 9.

Purpose:	The purpose of this assignment is to:
•	Build an Express Rest API
•	Build a React front-end that utilizes Express Rest API
•	Perform CRUD operations

References:	Read the reference textbooks, lecture slides, and class examples. This material provides the necessary information that you need to complete the exercises.

Be sure to read the following general instructions carefully:
- This assignment must be completed using the pair programming technique (https://en.wikipedia.org/wiki/Pair_programming).
- You will have to demonstrate your solution in a scheduled lab session, and submit the project using the assignment link on Dropbox. You VS project name should be named “YourFullNameLab3” and should be zipped in a file YourFullNameLab3.zip. “YourFullName” contains both full names of the students.

Exercise 1

Create an Express Rest API which exposes CRUD functionalities for a student/course system. Create a student model which describes student information (student number, password, first name, last name, address, city, phone number, email, program) and also a course model which describes course information (course code, course name, section, semester). The information should be stored in a MongoDB database. Use ref to allow a student document to make a reference to corresponding course document. Provide authentication/authorization capabilities using JWT or Passport. 
Create a React front end that allows students to login, add a course, update a course (for example change the section), drop a course, list all the courses taken by a student, list all students, list all courses, and list all students that are taking a given course.
Apply MVC principles for the Express API. Use functional components, composition, and React Hooks where is possible. Design nice and friendly UI.
 (10 marks)
Evaluation: 
Functionality(including code explanation):	
React front-end (Correct components, forms, event handling, login)	35%
MongoDB database (config files, models)	10%
Express Rest API (Correct models, controllers, routes code,  Correct implementation of MVC architecture, authentication/authorization, Correct server.js, express.js, mongoose.js and config.js files)	35%
Friendliness (using CSS to align the React elements, etc.)	10%
Innovative features (functional components, React hooks, etc.)	10%
Total	100%

