import { useState } from 'react';

export default function useSearchBar() {
  const [type, setType] = useState('');
  const [maker, setMaker] = useState('');
  const [date, setDate] = useState('');
  const [pitch, setPitch] = useState('');

  return {
    type,
    setType,
    maker,
    setMaker,
    date,
    setDate,
    pitch,
    setPitch,
  };
}
