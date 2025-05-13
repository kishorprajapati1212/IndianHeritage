import React, { useState, useEffect, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './css/Slider.css';

// import required modules
import { Navigation } from 'swiper/modules';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function Slider() {
  // State to track mute/unmute status for each video
  const [muted, setMuted] = useState(true);

  // Refs to store video elements
  const videoRefs = useRef([]);

  useEffect(() => {
    // Play videos after 1 second delay
    setTimeout(() => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play();
        }
      });
    }, 1000);
  }, []);

  const toggleMute = () => {
    // Toggle mute/unmute for all videos
    setMuted((prevMuted) => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = !prevMuted;
        }
      });
      return !prevMuted;
    });
  };

  return (
    <div className="swiper-container">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="customSwiper"
        slidesPerView={1}  // Only show 1 slide at a time
        loop={true}        // Enable infinite looping of slides
      >
        <SwiperSlide className="customSwiperSlide">
          <video preload="auto" ref={(el) => (videoRefs.current[0] = el)} muted={muted} loop loading="lazy">
            <source src="/Home_Slider/Hpage.mp4" type="video/mp4" />
          </video>
          <button className="mute-button" style={{color:"white", background:"white", zIndex:10}} onClick={toggleMute}>
            {muted ?  <VolumeUpIcon /> : <VolumeOffIcon /> }
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
