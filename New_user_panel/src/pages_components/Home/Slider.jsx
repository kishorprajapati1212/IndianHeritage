'use client';

import React, { useState, useRef } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styles from './css/Slider.module.css';

export default function Slider() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);


  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted((prev) => !prev);
  };

  return (
    <div className={styles.swiper_container}>
      <div className={styles.customSwiper}>
        <div className={styles.customSwiperSlide}>
          <video
            ref={videoRef}
            muted={muted}
            loop
            autoPlay
            playsInline
            preload="auto"
            poster="/just_test/Gujarat.jpeg"
          >
            <source src="/just_test/Hpage.mp4" type="video/mp4" />
          </video>
          <button
            className={styles.mute_button}
            onClick={toggleMute}
            style={{ zIndex: 10 }}
          >
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
