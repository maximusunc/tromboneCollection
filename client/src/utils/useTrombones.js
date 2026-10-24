import { useState, useEffect } from 'react';

import API from './API.js';
import { enrich, chronSort } from './records';

export default function useTrombones() {
  const [trombones, setTrombones] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.getTrombones()
        .then(res => {
            setTrombones(chronSort(res.data.map(enrich)));
            setLoaded(true);
        })
        .catch(err => {
          console.log(err);
          setError('Failed to load trombones.');
        });
  }, []);

  return {
    trombones,
    loaded,
    error,
  };
}
