import React, { useState } from 'react';
import WordButtonChoice from '../WordButton/WordButtonChoices';
import ChoiceBuilder from '../SentenceBuilder/ChoiceBuilder';
import ControlPanel from '../ControlPanel/ControlPanel';
import './WordGrid.scss'; // Import SASS
import { images } from '../WordButton/WordButtonChoices'; // Import the images object

function WordGridChoices({ words, onWordClick }) {
  const [selectedWords, setSelectedWords] = useState([null, null]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track which word to replace (0 or 1)

  const handleWordClick = (word) => {
    setSelectedWords((prevSelectedWords) => {
      const updatedWords = [...prevSelectedWords];
      updatedWords[currentIndex] = word; // Replace the word at the current index (0 or 1)
      return updatedWords;
    });

    // Toggle index between 0 and 1 to alternate the replacement
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));

    if (onWordClick) {
      onWordClick(selectedWords); // Send both selected words to parent component
    }
  };

  const handleDragStart = (e, word) => {
    // Create an object with the word and image and pass it as JSON
    const data = JSON.stringify({ word, image: images[word] });
    e.dataTransfer.setData('application/json', data); // Use 'application/json' MIME type for structured data
  };

  const clearChoices = () => {
    setSelectedWords([null, null]); // Clear both selected words
  };

  const speakChoices = () => {
    const sentence = selectedWords.filter(Boolean).join(' '); // Join non-null words into a sentence
    if (sentence) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <div className="word-grid-choice">
        {/* Word buttons grid */}
        {words.map((word, index) => (
          <WordButtonChoice key={index} word={word} onClick={() => handleWordClick(word)} />
        ))}
      </div>

      {/* Separate div for selected words */}
      <div className="selected-words-container">
        <h3>Selected Words</h3>
        <div className="selected-words">
          {selectedWords.map((word, index) => (
            <div
              key={index}
              className="selected-word"
              draggable
              onDragStart={(e) => handleDragStart(e, word)} // Enable dragging
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
      </div>
      <ChoiceBuilder words={selectedWords} />
      <ControlPanel onClear={clearChoices} onSpeak={speakChoices} />
    </>
  );
}

export default WordGridChoices;
