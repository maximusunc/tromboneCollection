import { useReducer } from 'react';

const defaultTrombone = {
  id: '',
  maker: '',
  date: '',
  type: '',
  location: '',
  signature: '',
  pitch: '',
  mouthpiece: '',
  dimensions: '',
  provenance: '',
  literature: '',
  remarks: '',
  external_link: '',
  images: [''],
  footnotes: [''],
};

function tromboneReducer(state, fields) {
  return { ...state, ...fields };
}

export default function useTromboneStore() {
  const [properties, update] = useReducer(tromboneReducer, defaultTrombone);
  return {
    properties,
    update,
  };
}
