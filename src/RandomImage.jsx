import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const RandomImage = () => {
  const [randomImage, setRandomImage] = useState('');
  const ACCESS_KEY = 's_NZZgqYIyd4v15mzbIQHfuYnPc2F1OjawQt6QAJESo'; // Replace with your Unsplash Access Key

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
          params: {
            query: 'fashion', // Change the query to your desired category
          },
        });
        const imageUrl = response.data.urls.full; // Get the full-size image URL
        setRandomImage(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div id="root">
      {randomImage && <img src={randomImage} alt="Random" className="full-image" />}
    </div>
  );
};

export default RandomImage;