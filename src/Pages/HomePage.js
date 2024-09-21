import React, { useState } from 'react';
import WordGridSongs from '../Components/WordGrid/WordGridSongs';
import SentenceBuilder from '../Components/SentenceBuilder/SentenceBuilder';
import ControlPanel from '../Components/ControlPanel/ControlPanel';

// Import sounds and images
import { sounds } from '../Components/WordButton/WordButtonSongs'; 

import './HomePage.scss'; 

const words = Object.keys(sounds);

function HomePage() {
  const [sentence, setSentence] = useState([]);
  const [activeWord, setActiveWord] = useState(null); // Track the active word

  const handleWordClick = (word) => {
    if (word === activeWord) {
      setActiveWord(null); // Deactivate the button if clicked again
    } else {
      setActiveWord(word); // Activate the clicked button
      setSentence([...sentence, word]); // Append the clicked word to the sentence
    }
  };

  const clearSentence = () => {
    setSentence([]); // Clear the sentence
    setActiveWord(null); // Deactivate any active button
  };

  const speakSentence = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
    window.speechSynthesis.speak(utterance); // Use the browser's speech synthesis API
  };

  return (
    <div className="home">
      <h1>My Songs</h1>
      <WordGridSongs words={words} onWordClick={handleWordClick} activeWord={activeWord} />
      <SentenceBuilder sentence={sentence} />
      <ControlPanel onSpeak={speakSentence} onClear={clearSentence} />
    </div>
  );
}

export default HomePage;
