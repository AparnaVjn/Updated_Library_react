import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { apiurl } from '../../config';
import styles from './bookDetails.module.css'; 
import Header from '../../components/Header/Header';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    if (id) {
      Axios.get(`${apiurl}/bookDetails/${id}`)
        .then(response => {
          console.log(response);
          setBook(response.data);
        })
        .catch(error => {
          console.error('Error fetching book details:', error);
        });
    }
  }, [id]);

  const navigate = useNavigate();
  function deleteBook() {
    if (window.confirm("Delete the selected book?")) {
      Axios.post(`${apiurl}/deleteBook/${id}`);
      alert("Successfully deleted!");
      navigate('/adminHome');
    }
  }

  return (
    <div>
      <Header/>
      <div className={styles.main}>
        <p className={styles.title}>Book Details</p>
        <div className={styles.bookDetails}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: '20%' }}>Item</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Book Name</td>
                <td>{book.bookName}</td>
              </tr>
              <tr>
                <td>Author Name</td>
                <td>{book.author}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>{book.language}</td>
              </tr>
              <tr>
                <td>Serial No</td>
                <td>{book.serialNo}</td>
              </tr>
              <tr>
                <td>Issue Status</td>
                <td>{book.issueStatus}</td>
              </tr>
              <tr>
                <td>Admission No.</td>
                <td>{book.admissionNo !== null ? book.admissionNo : 'NA'}</td>
              </tr>
            </tbody>
          </table>

          <Link to={`/editBook/${book._id}`} style={{ textDecoration: "none" }}>
            <button type="submit" className={styles.editBtn}>EDIT</button>
          </Link>
          <button type="submit" className={styles.deleteBtn} onClick={deleteBook}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
