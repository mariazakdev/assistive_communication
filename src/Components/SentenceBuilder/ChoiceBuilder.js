import React, { useState } from 'react';
import './SentenceBuilder.scss';

function ChoiceBuilder({ words }) {
  const [droppedWords, setDroppedWords] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (e) => {
    const data = e.dataTransfer.getData('application/json');
    const droppedData = JSON.parse(data); // Parse the JSON data

    if (droppedData && !droppedWords.some(word => word.word === droppedData.word)) {
      setDroppedWords([...droppedWords, droppedData]); // Add word and image to droppedWords array
    }
  };

  const clearChoices = () => {
    setDroppedWords([]); // Clear the dropped words array
  };

  return (
    <div>
      <div
        className="choice-builder"
        onDragOver={handleDragOver} // Allow dragging over the drop area
        onDrop={handleDrop} // Handle dropping the word
      >
        <h2>I choose:</h2>
        <div className="chosen-words">
          {droppedWords.length > 0
            ? droppedWords.map((data, index) => (
                <div key={index} className="chosen-word">
                  <img src={data.image} alt={data.word} />
                  <span>{data.word}</span>
                </div>
              ))
            : <p>Drag and drop your choices here</p>
          }
        </div>
      </div>

      {/* Clear button */}
      <button className="clear-button" onClick={clearChoices}>
        Clear Choices
      </button>
    </div>
  );
}

export default ChoiceBuilder;
