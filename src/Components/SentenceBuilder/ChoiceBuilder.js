import React, { useEffect } from 'react';
import i_choose from '../../Assets/Sounds/I_choose.m4a'; // Import the "I choose" sound
import './SentenceBuilder.scss'; // Import your SASS file
import { sounds, images } from '../WordButton/WordButtonChoices';

function ChoiceBuilder({ word }) {
  useEffect(() => {
    if (word) {
      playIChooseAndWordSound(word); // Play the sound when a word is chosen
    }
  }, [word]); // Re-run this effect whenever the `word` prop changes

  const playIChooseAndWordSound = (word) => {
    const audioChoose = new Audio(i_choose); // Play "I choose" sound
    const audioWord = new Audio(sounds[word]); // Play word-specific sound after "I choose"

    // Add a delay before playing "I choose"
    setTimeout(() => {
      // Play "I choose" sound after delay
      audioChoose.play();

      // When "I choose" finishes, play the word sound
      audioChoose.onended = () => {
        if (audioWord) {
          audioWord.play(); // Play the word sound after "I choose" finishes
        }
      };
    }, 500); // 500ms delay before "I choose" plays, you can adjust this as needed
  };

  return (
    <div className="choice-builder">
      <h2>I choose:</h2>
      <div className="chosen-words">
        {word ? (
          <div className="chosen-word">
            <img src={images[word] || 'https://via.placeholder.com/100'} alt={word} /> {/* Render image */}
            <span>{word}</span>
          </div>
        ) : (
          <p>Drag and drop your choice here</p>
        )}
      </div>
    </div>
  );
}

export default ChoiceBuilder;
