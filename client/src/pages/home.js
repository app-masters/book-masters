import React, { useState, useEffect } from 'react';
import Books from '../components/Books';
import Header from '../components/Header';
import api from '../services/api';
import { IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { search } from '../assets/css/makeStyles';

const SearchBar = ({ doSearch }) => {
  const [query, setQuery] = useState('');
  const classes = search();
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        placeholder="Buscar livros"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <IconButton
        className={classes.btn}
        onClick={() => doSearch(query)}
        aria-label="search"
      >
        <SearchOutlined />
      </IconButton>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
      setData(fetchbooks);
      setBooks(fetchbooks);
      setLoading(false);
    } catch (error) {
      console.log('Error listing books', error);
      setLoading(false);
    }
  };

  const doSearch = (query) => {
    if (query === '') {
      setBooks(data);
    } else {
      const result = data.filter((f) => f.title.includes(query));
      setBooks(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <React.Fragment>
      <Header extra={<SearchBar doSearch={doSearch} />} />
      <Books books={books} loading={loading} />
    </React.Fragment>
  );
}
