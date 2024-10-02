import React, { useState } from 'react';
import { apiurl } from '../../config.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './homePage.module.css';
import Image from '../../assets/SchoolImage.jpg';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(apiurl, { email, password })
      .then(result => {
        console.log(result);
        if (result.data.success === true) {
          navigate('/adminHome');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An error occurred while logging in.');
          console.error('Error occurred:', error);
        }
      });
  }

  return (
    <div className={styles.container}>
      <img 
        src={Image}
        alt="school" 
        className={styles.image} 
      />
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            className={styles.inputField}
            onChange={(event) => { setEmail(event.target.value); }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className={styles.inputField}
            onChange={(event) => { setPassword(event.target.value); }}
          />
          {errorMessage && (
            <div className={`alert alert-danger ${styles.alert}`} role="alert">
              <p>{errorMessage}</p>
            </div>
          )}
          <input 
            type="submit" 
            value="Login" 
            className={styles.submitButton} 
          />
        </form>
      </div>
    </div>
  );
}

export default HomePage;
