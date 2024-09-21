import React, { useState } from 'react';
import WordButtonChoice from '../WordButton/WordButtonChoices';
import ChoiceBuilder from '../SentenceBuilder/ChoiceBuilder';
import ControlPanel from '../ControlPanel/ControlPanel';
import './WordGrid.scss'; // Import SASS
import { images } from '../WordButton/WordButtonChoices'; // Import the images object

function WordGridChoices({ words, onWordClick }) {
  const [selectedWords, setSelectedWords] = useState([null, null]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track which word to replace (0 or 1)
  const [draggedWord, setDraggedWord] = useState(null); // For tracking which word is dragged on touch devices
  const [isDragging, setIsDragging] = useState(false); // To track whether we are currently dragging

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
    e.dataTransfer.setData('text/plain', word); // Set the word being dragged
    setDraggedWord(word);
  };

  // For touch screen start
  const handleTouchStart = (word) => {
    setDraggedWord(word);
    setIsDragging(true); // Indicate dragging has started
  };

  // For touch screen move
  const handleTouchMove = (e) => {
    // Optional: You can use this event to give visual feedback while dragging, e.g., showing the word move
    e.preventDefault(); // Prevent default touch behavior (scrolling)
  };

  // For touch screen end
  const handleTouchEnd = () => {
    if (draggedWord) {
      handleWordClick(draggedWord); // Replace the word in selectedWords
    }
    setDraggedWord(null);
    setIsDragging(false); // Reset the dragging state
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
          <WordButtonChoice
            key={index}
            word={word}
            onClick={() => handleWordClick(word)} // Handle click
            draggable
            onDragStart={(e) => handleDragStart(e, word)} // Handle desktop drag start
            onTouchStart={() => handleTouchStart(word)} // Handle touch start
            onTouchMove={handleTouchMove} // Handle touch move (dragging)
            onTouchEnd={handleTouchEnd} // Handle touch end (drop)
          />
        ))}
      </div>

      {/* Separate div for selected words */}
      <div className="selected-words-container">
        <h3>Which one?</h3>
        <div className="selected-words">
          {selectedWords.map((word, index) => (
            <div
              key={index}
              className={`selected-word ${isDragging && draggedWord === word ? 'dragging' : ''}`} // Add class for visual feedback
              draggable
              onDragStart={(e) => handleDragStart(e, word)} // Handle desktop drag start
              onTouchStart={() => handleTouchStart(word)} // Handle touch start
              onTouchMove={handleTouchMove} // Handle touch move (dragging)
              onTouchEnd={handleTouchEnd} // Handle touch end (drop)
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
