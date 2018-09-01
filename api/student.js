import { Router } from 'express';
import StudentModel from './models/student_model';

const student = Router();

// Get students
student.get('/', (req, res) => {
  StudentModel
    .find()
    .then(students => {
      if (students.length) {
        return res.status(200).json({
          message: 'Students retrieved',
          count: students.length,
          data: students
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        message: 'Could not fetch students. Error: ' + err.toString()
      });
    });
});

// Get student
student.get('/:id', (req, res) => {
  if (req.params.id) {
    StudentModel
      .findById(req.params.id)
      .then(student => {
        return res.status(200).json({
          message: 'Student successfully retrieved',
          data: student
        });
      })
      .catch(err => {
        return res.status(400).json({
          message: 'Could not fetch student. Error: ' + err.toString()
        });
      });
  } else {
    return res.status(400).json({
      message: 'ID must be entered to delete a student'
    });
  }
});

// Create student
student.post('/', (req, res) => {
  // grab student data for our post request
  // anything not in the body will be undefined
  const name = req.body.name;
  const contact = req.body.contact;
  const assignments = req.body.assignments;
  // check for any required attributes and create the student
  if (name) {
    StudentModel
      .create({
        name,
        contact,
        assignments
      })
      .then(student => {
        return res.status(200).json({
          message: 'Student successfully created!',
          data: student
        });
      })
      .catch(err => {
        return res.status(400).json({
          message: 'Student was not created. Error: ' + err.toString()
        });
      });
  } else {
    return res.status(400).json({
      message: 'A name must be provided when creating Students'
    });
  }
});

// Delete a student
student.delete('/:id', (req, res) => {
  if (req.params.id) {
    StudentModel
      .findByIdAndDelete(req.params.id)
      .then(deleted => {
        return res.status(200).json({
          message: 'Student successfully deleted',
          data: deleted
        });
      })
      .catch(err => {
        return res.status(400).json({
          message: 'Could not delete student. Error: ' + err.toString()
        });
      });
  } else {
    return res.status(400).json({
      message: 'ID must be entered to delete a student'
    });
  }
});

export default student;