// WordGrid.js
import React from 'react';
import WordButton from '../WordButton/WordButton';
import './WordGrid.scss'; // Import SASS

function WordGrid({ words, onWordClick }) {
  return (
    <div className="word-grid">
      {words.map((word, index) => (
        <WordButton key={index} word={word} onClick={onWordClick} />
      ))}
    </div>
  );
}

export default WordGrid;
