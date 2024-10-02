import React, { useState, useEffect } from 'react';
import styles from './header.module.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiurl } from '../../config';

function Header() {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    } else {
      fetchAdminName();
    }
  }, []);

  const fetchAdminName = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(apiurl + '/adminName', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { adminName } = response.data;
      localStorage.setItem('adminName', adminName);
      setAdminName(adminName);
    } catch (error) {
      console.error('Failed to fetch admin name:', error);
      setAdminName('Admin');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(apiurl + '/logout');
      localStorage.removeItem('adminName');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <Link to="/adminhome">
            <button className={styles.homeButton}>Home</button>
          </Link>
        </div>
        <div className={styles.navRight}>
          <div className={`dropdown ${styles.dropdown}`}>
            <button
              className={`btn btn-secondary dropdown-toggle ${styles.dropdownButton}`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {adminName ? adminName : 'Admin'}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
