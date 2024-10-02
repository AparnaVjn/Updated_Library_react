import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiurl } from '../../config';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Subheader/SubHeader';
import BookList from '../../components/BookList/BookList';
import Pagination from '../../components/Pagination/Pagination';
import styles from './adminHome.module.css'; // Import the module CSS

function AdminHome() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchResults, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
  };

  // Redirect to BookDetails page when a book is selected
  useEffect(() => {
    if (selectedBookId) {
      navigate(`/bookDetails/${selectedBookId}`);
      setSelectedBookId(null); // Reset selectedBookId to prevent redirecting on subsequent renders
    }
  }, [selectedBookId, navigate]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(apiurl + '/adminHome');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchResults = (results) => {
    setSearchResult(results);
    setSearchPerformed(true);
  };

  // Calculate the index of the first book to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  // Slice the books array to display only the books for the current page
  const displayedBooks = books.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <Header />
      <div className={styles.adminHomeContainer}>
        <div className={styles.subHeaderContainer}>
          <SubHeader onBookSelect={handleBookSelect} setSearchResult={handleSearchResults} />
        </div>

        {!searchPerformed && (
  <div className={styles.bookBoxContainer}>
    {books.length > 0 ? (
      <BookList books={displayedBooks} currentPage={currentPage} />
    ) : (
      <p>No books available.</p>
    )}
    <div className={styles.paginationContainer}>
      <Pagination
        totalBooks={books.length || 1} // Show pagination even when there are no books
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  </div>
)}


        {searchPerformed && (
          <div className={styles.searchResultsContainer}>
            <h3>Search Results</h3>
            <BookList books={searchResults} currentPage={currentPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
