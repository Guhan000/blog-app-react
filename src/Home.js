import React from 'react';
import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {

  const { searchResults } = useContext(DataContext);

  return (
    <main className='Home'>
        {searchResults.length ? (
          <Feed posts={searchResults}></Feed>
        ) : (
          <p style={{marginTop:"2rem"}}>No Posts to display</p>
        )}
    </main>
  )
}

export default Home