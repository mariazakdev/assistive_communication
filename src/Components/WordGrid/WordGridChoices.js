// WordGrid.js
import React from 'react';
import WordButtonChoice from '../WordButton/WordButtonChoices';
import './WordGrid.scss'; // Import SASS

function WordGridChoices({ words, onWordClick }) {
  return (
    <div className="word-grid-choice">
      {words.map((word, index) => (
        <WordButtonChoice key={index} word={word} onClick={onWordClick} />
      ))}
    </div>
  );
}

export default WordGridChoices;
