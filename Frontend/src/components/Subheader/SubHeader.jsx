import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import styles from './subheader.module.css'; 
import { apiurl } from '../../config';

function SubHeader({ onBookSelect, setSearchResult }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const handleInputChange = async (e) => {
    setSearchInput(e.target.value);
    try {
      const response = await Axios.get(`${apiurl}/searchBooks?query=${e.target.value}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleBookSelect = (bookId) => {
    onBookSelect(bookId);
    setSearchInput('');
    setSearchResult([]);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div>
      <div className={`d-flex mx-auto my-4 justify-content-between align-items-center px-4 rounded-2 ${styles.subheaderContainer}`}>
        <div className="d-flex align-items-center">
          <div className='p-2'>
            <input 
              type="search" 
              className={`form-control ${styles.searchInput}`} 
              placeholder="Search..." 
              aria-label="Search" 
              value={searchInput} 
              onChange={handleInputChange} 
            />
          </div>
        </div>

        <div className={`dropdown ${styles.dropdown}`}>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={toggleDropdown} // Handle dropdown toggle manually
            aria-expanded={isDropdownOpen}
          >
            Actions
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-menu show"> {/* Manually adding 'show' class */}
              <li><a className="dropdown-item" href="/addBook">Add Book</a></li>
              <li><a className="dropdown-item" href="/bookIssue">Issue/Receive Book</a></li>
            </ul>
          )}
        </div>
      </div>

      {searchResults.length > 0 && searchInput !== '' && (
        <div className={styles.searchResults}>
          <h5>Search Results:</h5>
          <ul>
            {searchResults.map((book) => (
              <div key={book._id} className={styles.bookBox} onClick={() => handleBookSelect(book._id)}>
                <Link to={`/bookDetails/${book._id}`} style={{ textDecoration: "none", color: "gray" }}>
                  <h4>{book.bookName}</h4>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SubHeader;
