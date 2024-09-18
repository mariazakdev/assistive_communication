import React from 'react';
import './WordButton.scss'; // Import the SASS file

// Import the sound files statically
import wheelsSong from '../../Assets/Sounds/Wheels.m4a';
import happySong from '../../Assets/Sounds/Happy_and_you_know.m4a';
import weWillSong from '../../Assets/Sounds/Rock_you.m4a';
import no from '../../Assets/Sounds/No.m4a';
import take from '../../Assets/Sounds/Take.m4a';
import yay from '../../Assets/Sounds/Yay.m4a';

// Import images or use placeholders for buttons
import wheelsSongImg from '../../Assets/Images/wheels.png';
import ifHappySongImg from '../../Assets/Images/if_happy.png';
import weWillSongImg from '../../Assets/Images/rock_you.png';

export const sounds = {
  wheelsSong,
  happySong,
  weWillSong,
};

export const images = {
  wheelsSong: wheelsSongImg,
  happySong: ifHappySongImg,
  weWillSong: weWillSongImg,
};

function WordButton({ word, onClick }) {
  const playSound = () => {
    const sound = sounds[word];
    if (sound) {
      const audio = new Audio(sound);
      audio.play();
    } else {
      console.error(`Sound file not found for word: ${word}`);
    }
  };

  const handleClick = () => {
    playSound(); // Play sound when button is clicked
    onClick(word); // Callback for adding the word
  };

  return (
    <button className="word-button" onClick={handleClick}>
      <img
        src={images[word] || 'https://via.placeholder.com/100'}
        alt={word}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')} // Fallback image
      />
      <span>{word}</span>
    </button>
  );
}

export default WordButton;
