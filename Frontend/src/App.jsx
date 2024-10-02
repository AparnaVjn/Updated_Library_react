import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import AdminHome from './Pages/AdminHome/AdminHome';
import AddBook from './Pages/AddBook/AddBook';
import BookDetails from './Pages/BookDetails/BookDetails';
import BookIssue from './Pages/BookIssue/BookIssue';
import AddStudent from './Pages/AddStudents/addStudent';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path='/'  element={<HomePage/>}  />
            <Route path='/adminhome'  element={<AdminHome/>}  />
            <Route path='/addbook'  element={<AddBook/>}  />
            <Route path='/bookdetails'  element={<BookDetails/>}  />
            <Route path='/bookissue'  element={<BookIssue/>}  />
            <Route path='/addstudent'  element={<AddStudent/>}  />
        </Routes>
    </Router>
  )
}

export default App