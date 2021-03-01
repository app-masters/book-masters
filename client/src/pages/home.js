import React, { useState, useEffect } from 'react';
import Books from '../components/Books';
import Header from '../components/Header';
import api from '../services/api';

export default function Home() {
  const [books, setBooks] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get('/books/');
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const json = response.data;
      let fetchbooks = [];
      if (json && json.length > 0) {
        fetchbooks = json.sort((bookA, bookB) => {
          if (bookA.lending?.status === bookB.lending?.status) {
            if (bookA.title < bookB.title) {
              return -1;
            }
            if (bookA.title > bookB.title) {
              return 1;
            }
            return 0;
          } else {
            return bookA.lending?.status !== 'Disponível' ? 1 : -1;
          }
        });
      }
      setBooks(fetchbooks);
    } catch (error) {
      console.log('Error listing books', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      {books.length > 0 ? (
        <React.Fragment>
          <Header />
          <Books books={books} />
        </React.Fragment>
      ) : (
        <Books loading />
      )}
    </React.Fragment>
  );
}
