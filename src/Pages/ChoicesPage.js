import React, { useState } from 'react';
import WordGridChoices from '../Components/WordGrid/WordGridChoices';
import ChoiceBuilder from '../Components/SentenceBuilder/ChoiceBuilder';
import ControlPanel from '../Components/ControlPanel/ControlPanel';
import { sounds } from '../Components/WordButton/WordButtonChoices'; 

import './HomePage.scss'; 
import Draggable from '../Components/Draggable/Draggable';

const words = Object.keys(sounds);

function ChoicesPage() {
  const [selectedWords, setSelectedWords] = useState([]); // Selected words

  const handleWordClick = (newSelectedWords) => {
    setSelectedWords(newSelectedWords); // Update selected words from WordGridChoices
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
    <div className="home-choices">
      <h1>My Words</h1>
      <WordGridChoices words={words} onWordClick={handleWordClick} />
    {/* <Draggable words={words} onWordClick={handleWordClick}  /> */}
    </div>
  );
}

export default ChoicesPage;
