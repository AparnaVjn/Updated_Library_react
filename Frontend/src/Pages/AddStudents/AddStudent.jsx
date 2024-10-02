import React, { useState } from 'react';
import Axios from 'axios';
import { apiurl } from '../../config';
import styles from './addStudent.module.css';
import Header from '../../components/Header/Header';

function AddStudent() {
  const [studentName, setName] = useState('');
  const [className, setClass] = useState('');
  const [division, setDivision] = useState('');
  const [admissionNo, setAdNo] = useState('');
  const [gender, setGender] = useState('');

  const addStudent = async (e) => {
    e.preventDefault();
    await Axios.post(apiurl + '/addStudent', {
      studentName,
      className,
      division,
      admissionNo,
      gender
    });
    window.location.reload(false);
  };

  return (
    <div>
      <Header/>
      <div className={styles.addform}>
        <div className={styles.title}>Add Student</div>
        <form onSubmit={addStudent}>
          <div className={styles.mb3}>
            <label htmlFor="formGroupExampleInput" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              className={styles.formControl}
              id="formGroupExampleInput"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="formGroupExampleInput2" className={styles.formLabel}>
                Class
              </label>
              <select
                className={styles.formSelect}
                required
                id="classSelect"
                onChange={(e) => setClass(e.target.value)}
              >
                <option value="">Select class</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className={styles.col}>
              <label htmlFor="formGroupExampleInput2" className={styles.formLabel}>
                Division
              </label>
              <select
                className={styles.formSelect}
                required
                id="divisionSelect"
                onChange={(e) => setDivision(e.target.value)}
              >
                <option value="">Select division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="formGroupExampleInput" className={styles.formLabel}>
              Admission No
            </label>
            <input
              type="text"
              className={styles.formControl}
              id="formGroupExampleInput"
              placeholder="123.."
              onChange={(e) => setAdNo(e.target.value)}
            />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="genderSelect" className={styles.formLabel}>
              Gender
            </label>
            <select
              className={styles.formSelect}
              required
              id="genderSelect"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className={styles.btn}>
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
