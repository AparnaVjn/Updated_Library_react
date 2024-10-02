import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { apiurl } from "../../config";
import styles from './bookIssue.module.css'; 
import Header from "../../components/Header/Header";
import BookHeader from "../../components/BookHeader/BookHeader";

function BookIssue() {
  const [admissionNo, setadmissionNo] = useState('');
  const navigate = useNavigate();

  function bookIssueCheck() {
    Axios.get(`${apiurl}/bookIssue/${admissionNo}`)
      .then(response => {
        if (response.data === null) {
          alert("No Student found");
          navigate(`/addStudent`);
        } else {
          navigate(`/bookIssueclone/${admissionNo}`);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle other errors if needed
      });
  }

  return (
    <div>
      <Header/>
      <div className={styles.title}>Issue/Receive Book</div>
      <div className={styles.row}>
        <div className={styles.col1}>
          <p>Student Name :</p>
        </div>
        <div className={styles.col1}>
          <p>Class :</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col1}>
          <p>Admission No :</p>
        </div>
        <div className={styles.col1}>
          <p>Gender :</p>
        </div>
      </div>
      <div className="d-flex align-items-center mx-3">
        <div className="">
          <input
            type="text"
            inputMode="numeric"
            className={`form-control ${styles.formControlInput}`}
            placeholder="Enter Admission No"
            style={{ width: '300px', height: "40px" }}
            onChange={(e) => { setadmissionNo(e.target.value) }}
          />
        </div>
        <div className="mx-5">
          <button onClick={bookIssueCheck} type="submit" className={`btn btn-secondary ${styles.button}`}>Submit</button>
        </div>
      </div>
      <BookHeader/>
    </div>
  );
}

export default BookIssue;
