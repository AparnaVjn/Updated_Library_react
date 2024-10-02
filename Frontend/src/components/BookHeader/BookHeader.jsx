import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiurl } from '../../config';
import styles from './bookHeader.module.css';  

function BookHeader() {
  const [serialNo, setSerialNo] = useState('');
  const { admissionNo } = useParams();

  function handleAddbook() {
    Axios.get(`${apiurl}/bookHeader/${serialNo}/${admissionNo}`)
      .then(response => {
        if (response.data === null) {
          alert("Enter valid Serial No");
          setSerialNo(''); // Clear input field
        } else {
          window.location.reload(false);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle other errors if needed
      });
  }

  return (
    <div className={styles.bookHeaderContainer}>
      <form className={styles.formBookContainer}>
        <div className="col-auto">
          <input
            type="search"
            className={styles.inputField}
            placeholder="Enter Serial No"
            aria-label="Search"
            onChange={(e) => setSerialNo(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddbook}
        >
          ADD BOOK
        </button>
      </form>
    </div>
  );
}

export default BookHeader;
