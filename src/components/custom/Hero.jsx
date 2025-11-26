import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [fade, setFade] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const imageList = [
    '/assets/background/image1.png',
    '/assets/background/image2.png',
    '/assets/background/image3.png',
    '/assets/background/image4.png',
    '/assets/background/image5.png',
    '/assets/background/image6.png',
    '/assets/background/image7.png',
    '/assets/background/image8.png',
    '/assets/background/image9.png',
    '/assets/background/image10.png',
  ];

  // Background rotation
  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((currentImage) => (currentImage + 1) % imageList.length);
        setFade(false);
      }, 1500);
    }, 3500);
    return () => clearInterval(timeoutRef.current);
  }, []);

  useEffect(() => setLoaded(true), []);

  const handleButtonPress = () => {
    setButtonPressed(true);
    setTimeout(() => setButtonPressed(false), 100);
  };

  // 🔹 Google login logic
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      window.location.reload();
    });
  };

  return (
    <div
      className="flex flex-col items-center mx-50 gap-9"
      style={{
        width: '100vw',
        height: '92vh',
        backgroundImage: `url(${imageList[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'all 1s ease-in-out',
        zIndex: -1,
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '15px',
          padding: '30px',
          margin: 'auto',
          maxWidth: '100%',
          boxShadow: '2px 4px 5px rgba(0, 0, 0, 0.3)',
          marginTop: '200px',
          marginBottom: '0px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease-in',
        }}
      >
        <h1
          className="font-extrabold text-[50px] text-center"
          style={{
            fontFamily: 'Times New Roman, sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span className="text-[#462F26]">
            Navigate Your Next Journey<br />
            <i style={{ fontFamily: 'Monotype Corsiva, cursive' }}>With The Power of AI</i>
          </span>
        </h1>
        <p
          className="text-xl text-center text-[#462F26] mt-5"
          style={{
            fontFamily: 'Times New Roman, sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Seamlessly crafted itineraries that bring your travel aspirations to life
        </p>
      </div>

      {/* 🔹 Conditional Button */}
      {user ? (
        <Link to={'/create-trip'}>
          <Button
            className="bg-[#462F26] text-white rounded hover:bg-[#805545] hover:text-white hover:border-[#805545]"
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonPress}
            style={{
              transform: buttonPressed ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.2s',
            }}
          >
            Begin Your Adventure Now!
          </Button>
        </Link>
      ) : (
        <Button
          className="bg-[#462F26] text-white rounded hover:bg-[#805545] hover:text-white hover:border-[#805545]"
          onClick={login}
          onMouseDown={handleButtonPress}
          onMouseUp={handleButtonPress}
          style={{
            transform: buttonPressed ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 0.2s',
          }}
        >
          Sign in with Google to Begin Your Adventure
        </Button>
      )}
    </div>
  );
}

export default Hero;
