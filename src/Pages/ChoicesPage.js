// import React, { useState } from 'react';
// import WordGridSongs from '../Components/WordGrid/WordGridChoices';
// import SentenceBuilder from '../Components/SentenceBuilder/SentenceBuilder';
// import ChoiceBuilder from '../Components/SentenceBuilder/ChoiceBuilder';
// import ControlPanel from '../Components/ControlPanel/ControlPanel';

// // Import sounds and images
// import { sounds } from '../Components/WordButton/WordButtonChoices'; 

// import './HomePage.scss'; 

// const words = Object.keys(sounds);

// function ChoicesPage() {
//   const [sentence, setSentence] = useState([]);
//   const [activeWord, setActiveWord] = useState(null); // Track the active word

//   const handleWordClick = (word) => {
//     if (word === activeWord) {
//       setActiveWord(null); // Deactivate the button if clicked again
//     } else {
//       setActiveWord(word); // Activate the clicked button
//       setSentence([...sentence, word]); // Append the clicked word to the sentence
//     }
//   };

//   const clearSentence = () => {
//     setSentence([]); // Clear the sentence
//     setActiveWord(null); // Deactivate any active button
//   };

//   const speakSentence = () => {
//     const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
//     window.speechSynthesis.speak(utterance); // Use the browser's speech synthesis API
//   };

//   return (
//     <div className="home-choices">
//       <h1>My Choices</h1>
//       <WordGridSongs words={words} onWordClick={handleWordClick} activeWord={activeWord} className="" />
//       <ChoiceBuilder sentence={sentence} />
//       <ControlPanel onSpeak={speakSentence} onClear={clearSentence} />
//     </div>
//   );
// }

// export default ChoicesPage;

// import React, { useState } from 'react';
// import WordGridSongs from '../Components/WordGrid/WordGridChoices';
// import ChoiceBuilder from '../Components/SentenceBuilder/ChoiceBuilder';
// import ControlPanel from '../Components/ControlPanel/ControlPanel';

// // Import sounds and images
// import { sounds } from '../Components/WordButton/WordButtonChoices'; 

// import './HomePage.scss'; 

// const words = Object.keys(sounds);

// function ChoicesPage() {
//   const [selectedWords, setSelectedWords] = useState([null, null]); // Selected words
//   const [activeWord, setActiveWord] = useState(null); // Active word in "I choose"
//   const [isCleared, setIsCleared] = useState(false); // To track if cleared

//   const handleWordClick = (word) => {
//     // If word already exists in the selected words, remove it
//     const index = selectedWords.indexOf(word);
//     if (index !== -1) {
//       const updatedWords = [...selectedWords];
//       updatedWords[index] = null; // Remove the word from selected words
//       setSelectedWords(updatedWords);
//     }

//     // Update the "I choose" area with the active word
//     setActiveWord(word);
//     setIsCleared(false);
//   };

//   const clearSentence = () => {
//     setActiveWord(null); // Clear "I choose" area
//     setIsCleared(true); // Mark as cleared
//   };

//   const speakSentence = () => {
//     if (activeWord) {
//       const utterance = new SpeechSynthesisUtterance(activeWord);
//       window.speechSynthesis.speak(utterance); // Use the browser's speech synthesis API
//     }
//   };

//   return (
//     <div className="home-choices">
//       <h1>My Choices</h1>
//       <WordGridSongs
//         words={words}
//         onWordClick={handleWordClick}
//         selectedWords={selectedWords}
//       />
//       {!isCleared && <ChoiceBuilder word={activeWord} />} {/* Only show if not cleared */}
//       <ControlPanel onSpeak={speakSentence} onClear={clearSentence} />
//     </div>
//   );
// }

// export default ChoicesPage;

import React, { useState } from 'react';
import WordGridChoices from '../Components/WordGrid/WordGridChoices';
import ChoiceBuilder from '../Components/SentenceBuilder/ChoiceBuilder';
import ControlPanel from '../Components/ControlPanel/ControlPanel';
import { sounds } from '../Components/WordButton/WordButtonChoices'; 

import './HomePage.scss'; 

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
      <h1>My Choices</h1>
      <WordGridChoices words={words} onWordClick={handleWordClick} />
    
    </div>
  );
}

export default ChoicesPage;
