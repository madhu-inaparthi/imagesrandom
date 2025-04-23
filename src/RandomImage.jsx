import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const RandomImage = () => {
  const [randomImage, setRandomImage] = useState('');
  const [error, setError] = useState(false); // Track errors
  const ACCESS_KEY = import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY || ''; // Access Key

  console.log('Unsplash Access Key:', ACCESS_KEY); // Debugging

  useEffect(() => {
    const fetchRandomImage = async () => {
      if (!ACCESS_KEY) {
        console.error('Unsplash Access Key is missing!');
        setError(true); // Trigger error state
        return;
      }

      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
          params: {
            query: 'fashion', // Category
          },
        });
        const imageUrl = response.data.urls.full; // Full-size image URL
        setRandomImage(imageUrl);
        setError(false); // Reset error state on success
      } catch (error) {
        console.error('Error fetching image:', error);
        setError(true); // Trigger error state
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div id="root">
      {error ? (
        <p>Error: Unable to fetch image. Please check your configuration.</p>
      ) : (
        randomImage && <img src={randomImage} alt="Random" className="full-image" />
      )}
    </div>
  );
};

export default RandomImage;