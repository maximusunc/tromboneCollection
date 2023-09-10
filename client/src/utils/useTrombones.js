import { useState, useEffect } from 'react';

import API from './API.js';
import useSearchBar from './useSearchBar';

function chronSort(tbones) {
  tbones.sort((a, b) => {
      if (!a.date || !b.date) {
          return 0;
      }
      let [date1] = a.date.match(/\d{4}|\d{2}/);
      let [date2] = b.date.match(/\d{4}|\d{2}/);
      if (date1.length === 2) {
          date1 *= 100;
      }
      if (date2.length === 2) {
          date2 *= 100;
      }
      return date1 - date2;
  });
  return tbones;
}

export default function useTrombones() {
  const [trombones, setTrombones] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const searchBar = useSearchBar();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.getTrombones()
        .then(res => {
            const sortedTrombones = chronSort(res.data);
            setTrombones(sortedTrombones);
            setFiltered(sortedTrombones);
            setLoaded(true);
        })
        .catch(err => {
          console.log(err);
          setError('Failed to load trombones.');
        });
  }, []);

  useEffect(() => {
    const filteredTrombones = trombones.filter((tbone) => 
        tbone.maker.toLowerCase().indexOf(searchBar.maker.toLowerCase()) !== -1 && 
        tbone.type.indexOf(searchBar.type) !== -1 &&
        tbone.date.indexOf(searchBar.date) !== -1 &&
        tbone.pitch.toLowerCase().startsWith(searchBar.pitch.toLowerCase()));
    setFiltered(filteredTrombones);
  }, [searchBar.maker, searchBar.type, searchBar.date, searchBar.pitch]);

  return {
    trombones,
    filtered,
    searchBar,
    loaded,
    error,
  };
}
