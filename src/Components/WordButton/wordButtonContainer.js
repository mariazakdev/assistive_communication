import React, { useState } from 'react';
import WordButton from './WordButton'; // Import the WordButton component

function WordButtonContainer({ words }) {
  const [activeWord, setActiveWord] = useState(null); // Track the active word

  const handleButtonClick = (word) => {
    if (activeWord !== word) {
      setActiveWord(word); // Set the new active word
    } else {
      setActiveWord(null); // If the same button is clicked, deactivate
    }
  };

  return (
    <div>
      {words.map((word) => (
        <WordButton
          key={word}
          word={word}
          isActive={activeWord === word} // Pass active state to the button
          onClick={handleButtonClick} // Handle button click
        />
      ))}
    </div>
  );
}

export default WordButtonContainer;
