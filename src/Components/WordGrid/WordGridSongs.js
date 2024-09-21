// WordGrid.js
import React from 'react';
import WordButton from '../WordButton/WordButtonSongs';
import './WordGrid.scss'; // Import SASS

function WordGridSongs({ words, onWordClick }) {
  return (
    <div className="word-grid">
      {words.map((word, index) => (
        <WordButton key={index} word={word} onClick={onWordClick} />
      ))}
    </div>
  );
}

export default WordGridSongs;
