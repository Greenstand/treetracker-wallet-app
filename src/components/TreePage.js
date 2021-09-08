import React from 'react';
import { useHistory } from 'react-router-dom';

function TreePage() {
  const history = useHistory();

  function handleBackClick() {
    history.push('/wallets/stephanie');
  }

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 9999,
        background: 'white',
        opacity: 0.8,
        width: '100vw',
        height: '100vh',
      }}
    >
      <button onClick={handleBackClick}>back</button>
      <div
        style={{
          background: '#4caf50',
          width: '100vw',
          height: '100%',
        }}
      >
        tree.page
      </div>
    </div>
  );
}

export default TreePage;
