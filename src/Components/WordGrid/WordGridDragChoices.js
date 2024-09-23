import React, { useState } from 'react';
import WordButtonDragChoice from '../WordButton/WordButtonChoices';
import ChoiceBuilder from '../SentenceBuilder/ChoiceBuilder';
import ControlPanel from '../ControlPanel/ControlPanel';
import './WordGrid.scss'; // Import SASS
import { images, sounds } from '../WordButton/WordButtonChoices'; // Import the images and sounds objects

function WordGridDragChoices({ words, onWordClick }) {
  const [selectedWords, setSelectedWords] = useState([null, null]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track which word to replace (0 or 1)
  const [audio, setAudio] = useState(null);
  const [chosenWord, setChosenWord] = useState(null); // Store the word in the "I choose" area
  const [touchingWord, setTouchingWord] = useState(null); // Track the word being touched

  const handleWordClick = (word) => {
    replaceWordInSelectedArea(word);
  };

  const replaceWordInSelectedArea = (word) => {
    setSelectedWords((prevSelectedWords) => {
      const updatedWords = [...prevSelectedWords];
      updatedWords[currentIndex] = word; // Replace the word at the current index (0 or 1)
      return updatedWords;
    });

    // Toggle index between 0 and 1 to alternate the replacement
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));

    // Trigger callback to parent component if needed
    if (onWordClick) {
      onWordClick(selectedWords); // Send updated words to parent component
    }
  };

  const handleDragStart = (e, word) => {
    const data = JSON.stringify({ word });
    e.dataTransfer.setData('application/json', data);
  };

  const moveToIChoose = (word) => {
    setChosenWord(word); // Set the word in the "I choose" area
    if (onWordClick) {
      onWordClick(word); // Trigger parent function to update the "I choose" area
    }
  };

  // Play sound for the selected word
  const playSound = (word) => {
    const sound = sounds[word];
    if (sound) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      const newAudio = new Audio(sound);
      setAudio(newAudio);
      newAudio.play().catch((error) => {
        console.error(`Failed to play sound: ${error}`);
        // Removed alert; no interruption if sound playback fails.
      });
    }
  };

  const handleSelectedWordClick = (word) => {
    playSound(word); // Play the sound
    moveToIChoose(word); // Move word to the "I choose" area
  };

  // Handle touch start
  const handleTouchStart = (word) => {
    setTouchingWord(word); // Set the word being touched
    console.log('Touch start:', word); // Log the correct word
  };

  // Handle touch end
  const handleTouchEnd = (word) => {
    if (word) {
      moveToIChoose(word); // Move the word to "I choose" area when touch ends
      playSound(word); // Play the sound for the word
      setTouchingWord(null); // Clear the touched word
    }
  };

  const clearChoices = () => {
    setSelectedWords([null, null]); // Clear both selected words
    setChosenWord(null); // Clear the chosen word
  };

  const speakChoices = () => {
    const sentence = selectedWords.filter(Boolean).join(' '); // Join non-null words into a sentence
    if (sentence) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="word-grid-container-drag">
      {/* Word buttons grid */}
      <div className="word-grid-choice-drag">
        {words.map((word, index) => (
          <WordButtonDragChoice key={index} word={word} onClick={() => handleWordClick(word)} />
        ))}
      </div>

      {/* "Which one?" area for selected words */}
      {/* <div className="selected-words-container">
        <h3>Which one?</h3>
        <div className="selected-words">
          {selectedWords.map((word, index) => (
            <div
              key={index}
              className="selected-word"
              draggable
              onDragStart={(e) => handleDragStart(e, word)} // Enable dragging
              onClick={() => handleSelectedWordClick(word)} // Play sound and move word to "I choose"
              onTouchStart={() => handleTouchStart(word)} // Track the word being touched
              onTouchEnd={() => handleTouchEnd(word)} // Move word to "I choose" when touch ends
            >
              {word ? (
                <>
                  <img
                    src={images[word] || 'https://via.placeholder.com/100'}
                    alt={word}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/100')} // Fallback image
                  />
                  <span>{word}</span>
                </>
              ) : (
                '---'
              )}
            </div>
          ))}
        </div>
      </div> */}
{/* 
      "I choose" area
      <ChoiceBuilder word={chosenWord} /> */}

      {/* Control panel for clearing and speaking */}
      {/* <ControlPanel onClear={clearChoices} onSpeak={speakChoices} /> */}
    </div>
  );
}

export default WordGridDragChoices;
