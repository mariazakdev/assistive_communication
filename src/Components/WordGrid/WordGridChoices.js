import React, { useState } from 'react';
import WordButtonChoice from '../WordButton/WordButtonChoices';
import ChoiceBuilder from '../SentenceBuilder/ChoiceBuilder';
import ControlPanel from '../ControlPanel/ControlPanel';
import './WordGrid.scss'; // Import SASS
import { images } from '../WordButton/WordButtonChoices'; // Import the images object

function WordGridChoices({ words, onWordClick }) {
  const [selectedWords, setSelectedWords] = useState([null, null]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track which word to replace (0 or 1)
  const [draggedWord, setDraggedWord] = useState(null); // To track the word being dragged
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 }); // To track the position of touch

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

  const handleDragStart = (word) => {
    // Track the word being dragged
    setDraggedWord(word);
  };

  const handleTouchStart = (e, word) => {
    // Store touch starting position
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    setDraggedWord(word);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent the default scroll action while dragging
    const touch = e.touches[0];
    const dx = touch.clientX - touchPosition.x;
    const dy = touch.clientY - touchPosition.y;
    // Optionally you can track the move or show a preview of the word being dragged
  };

  const handleTouchEnd = () => {
    // Handle touch end by simulating a drop of the word
    if (draggedWord) {
      handleWordClick(draggedWord); // Simulate clicking the dragged word to place it
    }
    setDraggedWord(null); // Reset the dragged word
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
            onClick={() => handleWordClick(word)}
            onTouchStart={(e) => handleTouchStart(e, word)} // Handle touch start
            onTouchMove={handleTouchMove} // Prevent scrolling while dragging
            onTouchEnd={handleTouchEnd} // Handle touch end
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
              className="selected-word"
              onTouchStart={(e) => handleTouchStart(e, word)} // Handle touch start for selected words
              onTouchMove={handleTouchMove} // Handle touch move for selected words
              onTouchEnd={handleTouchEnd} // Handle touch end for selected words
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

