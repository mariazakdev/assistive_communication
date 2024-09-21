import React, { useState } from 'react';
import './WordButton.scss'; // Import the SASS file

// Import the sound files statically
import book from '../../Assets/Sounds/Book.m4a';
  import book1 from '../../Assets/Sounds/Book.m4a';
  import book2 from '../../Assets/Sounds/Book.m4a';
  import book3 from '../../Assets/Sounds/Book.m4a';
import broom from '../../Assets/Sounds/Broom.m4a';
import bubbles from '../../Assets/Sounds/Bubbles.m4a';
import bubbles2 from '../../Assets/Sounds/Bubbles.m4a';
import car from '../../Assets/Sounds/Car.m4a';
import eggs from '../../Assets/Sounds/Eggs.m4a';
import cups from '../../Assets/Sounds/Cups.m4a';
import flower from '../../Assets/Sounds/Flower.m4a';
import flashlight from '../../Assets/Sounds/Flashlight.m4a';
import lego from '../../Assets/Sounds/Lego.m4a';
import mic from '../../Assets/Sounds/Mic.m4a';
import medical from '../../Assets/Sounds/Doctor_tools.m4a';
import musical_book from '../../Assets/Sounds/Musical_book.m4a';
import phone from '../../Assets/Sounds/Phone.m4a';
import shaker from '../../Assets/Sounds/Shaker.m4a';
import utensils from '../../Assets/Sounds/Eat.m4a';
import songglove from '../../Assets/Sounds/Glove.m4a';
import woodanimals from '../../Assets/Sounds/Animals.m4a';


// Import images or use placeholders for buttons
import book1img from '../../Assets/Images/book1.jpg';
import book2img from '../../Assets/Images/book2.jpg';
import book3img from '../../Assets/Images/book3.jpg';
import broomimg from '../../Assets/Images/broom.jpg';  
import bubblesimg from '../../Assets/Images/bubbles.jpg';
import bubbles2img from '../../Assets/Images/bubbles2.jpg';
import carimg from '../../Assets/Images/car.jpg';
import eggsimg from '../../Assets/Images/eggs.jpg';
import cupsimg from '../../Assets/Images/cups.jpg';
import flowerimg from '../../Assets/Images/flower.jpg';
import flashlightimg from '../../Assets/Images/flashlight.jpg';
import legoimg from '../../Assets/Images/lego.jpg';
import micimg from '../../Assets/Images/mic.jpg';
import medicalimg from '../../Assets/Images/medical.jpg';
import musical_bookimg from '../../Assets/Images/musical_book.jpg';
import phoneimg from '../../Assets/Images/phone.jpg';
import shakerimg from '../../Assets/Images/shaker.jpg';
import utensilsimg from '../../Assets/Images/utentils.jpg';
import songgloveimg from '../../Assets/Images/songglove.jpg';
import woodanimalsimg from '../../Assets/Images/woodanimals.jpg';


export const sounds = {
  book1,
  book2,
  book3,
  broom,
  bubbles,
  bubbles2,
  car,
  eggs,
  cups,
  flower,
  flashlight,
  lego,
  mic,
  medical,
  musical_book,
  phone,
shaker,
utensils,
songglove,
woodanimals,
  
};

  export const images = {
    book1: book1img,
    book2: book2img,
    book3: book3img,
    broom: broomimg,
    bubbles: bubblesimg,
    bubbles2: bubbles2img,
    car: carimg,
    eggs: eggsimg,
    cups: cupsimg,
    flower: flowerimg,
    flashlight: flashlightimg,
    lego: legoimg,
    mic: micimg,
    medical: medicalimg,
    musical_book: musical_bookimg,
    phone: phoneimg,
    shaker: shakerimg,
    utensils: utensilsimg,
    songglove: songgloveimg,
    woodanimals: woodanimalsimg,
  };


function WordButtonChoices({ word, onClick }) {
  const [isActive, setIsActive] = useState(false); // Track button active state
  const [audio, setAudio] = useState(null); // Store audio object

  const playSound = () => {
    const sound = sounds[word];
    if (sound) {
      const newAudio = new Audio(sound);
      setAudio(newAudio);
      newAudio.play();
    } else {
      console.error(`Sound file not found for word: ${word}`);
    }
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (isActive) {
      stopSound(); // Stop sound if active
      setIsActive(false); // Deactivate button
    } else {
      playSound(); // Play sound if not active
      setIsActive(true); // Activate button
      onClick(word); // Callback for adding the word
    }
  };

  return (
    <button
      className={`word-button ${isActive ? 'active' : ''}`} // Add class when active
      onClick={handleClick}
    >
      <img
        src={images[word] || 'https://via.placeholder.com/100'}
        alt={word}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')} // Fallback image
      />
      <span>{word}</span>
    </button>
  );
}

export default WordButtonChoices;
