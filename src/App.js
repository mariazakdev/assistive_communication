import React, { useState } from 'react';
import WordGrid from './Components/WordGrid/WordGrid';
import SentenceBuilder from './Components/SentenceBuilder/SentenceBuilder';
import ControlPanel from './Components/ControlPanel/ControlPanel';

// Import sounds and images
import { sounds } from './Components/WordButton/WordButton'; 

import './App.scss'; 

const words = Object.keys(sounds);

function App() {
  const [sentence, setSentence] = useState([]);

  const handleWordClick = (word) => {
    setSentence([...sentence, word]); // Append the clicked word to the sentence
  };

  const clearSentence = () => {
    setSentence([]); // Clear the sentence
  };

  const speakSentence = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
    window.speechSynthesis.speak(utterance); // Use the browser's speech synthesis API
  };

  return (
    <div className="app">
      <h1>Assistive Communication</h1>
      <WordGrid words={words} onWordClick={handleWordClick} />
      <SentenceBuilder sentence={sentence} />
      <ControlPanel onSpeak={speakSentence} onClear={clearSentence} />
    </div>
  );
}

export default App;
