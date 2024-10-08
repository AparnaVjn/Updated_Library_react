import React, { useEffect, useState } from 'react';
import styles from './editBook.module.css'; 
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { apiurl } from '../../config';
import Header from '../../components/Header/Header';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  
  useEffect(() => {
    if (id) {
      Axios.get(`${apiurl}/editBook/${id}`)
        .then((response) => {
          setBook(response.data);
          setName(response.data.bookName);
          setAuthor(response.data.author);
          setLang(response.data.language);
          setNo(response.data.serialNo);
        })
        .catch((error) => {
          console.error('Error fetching book details:', error);
        });
    }
  }, [id]);

  const navigate = useNavigate();
  const [bookName, setName] = useState(book.bookName);
  const [author, setAuthor] = useState(book.author);
  const [language, setLang] = useState(book.language);
  const [serialNo, setNo] = useState(book.serialNo);

  const addBook = async (e) => {
    e.preventDefault();
    await Axios.post(`${apiurl}/editBook/${id}`, {
      bookName,
      author,
      language,
      serialNo,
    });
    navigate(`/bookDetails/${id}`);
  };

  return (
    <div>
      <Header/>
      <div className={styles.addform}>
        <div className={styles.title}>Edit Book</div>
        <form onSubmit={addBook}>
          <div className={styles.mb3}>
            <label htmlFor="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              defaultValue={book.bookName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              defaultValue={book.author}
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className={styles.mb3}>
            <label htmlFor="selectLanguage" className="form-label">
              Language
            </label>
            <select
              className="form-select"
              id="selectLanguage"
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="">{book.language}</option>
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Arabic">Arabic</option>
              <option value="Sanskrit">Sanskrit</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="formGroupExampleInput" className="form-label">
              Serial No
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              defaultValue={book.serialNo}
              required
              onChange={(e) => setNo(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitbtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
