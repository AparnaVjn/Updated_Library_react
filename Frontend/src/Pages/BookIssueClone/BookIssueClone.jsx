import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './bookIssueClone.module.css'; 
import { apiurl } from "../../config";
import Header from "../../components/Header/Header";
import BookHeader from "../../components/BookHeader/BookHeader";
import IssuedBooksTable from "../../components/IssuedBooksTable/IssuedBooksTable";

function BookIssueClone() {
  const [student, setStudent] = useState({})
  const { admissionNo } = useParams();

  useEffect(() => {
    if (admissionNo) {
      axios.get(`${apiurl}/bookIssue/${admissionNo}`)
        .then(response => {
          setStudent(response.data)
        })
        .catch(error => {
          console.error('error fetching admission no', error)
        })
    }
  }, [admissionNo])

  return (
    <div>
      <Header/>
      <div className={styles.title}>Issue/Receive Book</div>
      <div className={styles.row}>
        <div className={styles.col1}>
          <p>Student Name: {student.studentName}</p>
        </div>
        <div className={styles.col1}>
          <p>Class: {student.className} {student.division}</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col1}>
          <p>Admission No: {student.admissionNo}</p>
        </div>
        <div className={styles.col1}>
          <p>Gender: {student.gender}</p>
        </div>
      </div>
      <BookHeader/>
      <IssuedBooksTable student={student} />
    </div>
  );
}

export default BookIssueClone;
