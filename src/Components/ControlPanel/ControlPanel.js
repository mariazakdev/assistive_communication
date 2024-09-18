// ControlPanel.js
import React from 'react';

function ControlPanel({ onSpeak, onClear }) {
  return (
    <div style={styles.controls}>
      <button onClick={onSpeak} style={styles.controlButton}>Speak</button>
      <button onClick={onClear} style={styles.controlButton}>Clear</button>
    </div>
  );
}

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  controlButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ControlPanel;
