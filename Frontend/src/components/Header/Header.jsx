import React, { useState, useEffect, useRef } from 'react';
import styles from './header.module.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiurl } from '../../config';

function Header() {
  const [adminName, setAdminName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  useEffect(() => {
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
    } else {
      fetchAdminName();
    }

    // Add click event listener to handle clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup on unmount
    };
  }, []);

  const fetchAdminName = async () => {
    try {
      const response = await axios.get(`${apiurl}/adminName`, { withCredentials: true });
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
      await axios.post(`${apiurl}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('adminName');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggles the dropdown open/close
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
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
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={`btn btn-secondary ${styles.dropdownButton}`}
              type="button"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              {adminName ? adminName : 'Admin'}
            </button>

            {isDropdownOpen && (
              <ul className={`dropdown-menu show ${styles.dropdownMenu}`}>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
