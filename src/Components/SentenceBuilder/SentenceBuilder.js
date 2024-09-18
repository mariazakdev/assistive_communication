// SentenceBuilder.js
import React from 'react';

function SentenceBuilder({ sentence }) {
  return (
    <div style={styles.sentenceArea}>
      <h2>{sentence.join(' ') || "Your sentence will appear here."}</h2>
    </div>
  );
}

const styles = {
  sentenceArea: {
    minHeight: '50px',
    border: '1px solid black',
    padding: '10px',
    margin: '20px 0',
  },
};

export default SentenceBuilder;
