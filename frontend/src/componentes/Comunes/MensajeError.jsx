import React from 'react';

const MensajeError = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>
      <p>Error: {message}</p>
    </div>
  );
};

export default MensajeError;
