import React from "react";
import Books from "./Books";
import Header from './components/Header'
import api from "./services/api";

export default function Home() {

  const fetchbooks = async () => {
    try {
      const response = await api.get('/books/');
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const json = await response.data;

      return json.sort((bookA, bookB) => {
        if(bookA.status === bookB.status){
          if(bookA.title < bookB.title ){return -1;}
          if(bookA.title > bookB.title ){return 1;}
          return 0;
        } else {
          return bookA.status === bookB.status ? 0 : bookA.status? 1 : -1;
        }
      });

    } catch (error) {

    }
  }


  return (
    <React.Fragment>
        <Header/>
        {fetchbooks().then( books => {
          return <Books books={books}/>
        })}
    </React.Fragment>
  );
}
