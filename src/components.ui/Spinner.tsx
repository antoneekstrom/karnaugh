import React from 'react';
import '../resources/css/spinner.css';

export default function Spinner() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}