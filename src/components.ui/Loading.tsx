import React, { useState } from 'react';
import { useInterval } from '../util';

export let setLoadingMessage : (message : string) => void;

export function Loading() {

  const [message, setMessage] = useState('loading');
  setLoadingMessage = setMessage;

  const [dots, setDots] = useInterval(() => {
    setDots(dots => dots.length > 2 ? '' : dots + '.');
    return true;
  }, 200, '');

  return (
    <h2>{`${message}${dots}`}</h2>
  )
}