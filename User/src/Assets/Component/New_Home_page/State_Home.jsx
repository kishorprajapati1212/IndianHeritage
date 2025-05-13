import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './css/States.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

export default function State_Home() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [states, setStates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Create a mapping for state names to custom images
  const stateImages = {
    GUJRAT: '/Home_page_state/Gujrat.jpeg',
    Bihar: 'https://example.com/bihar-image.jpg',
    HimachalPradesh: 'https://example.com/himachal-pradesh-image.jpg',
    // Add more states as necessary
  };

  // Fetch states from the backend
  const fetchState = async () => {
    try {
      const res = await axios.get(`${Backend_url}/Get_all_State_names`);
      setStates(res.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  useEffect(() => {
    fetchState();
    
  }, []);

  return (
    <div className="States">
      <div className="head">
        <h1>Explore States</h1>
      </div>
      <div className="stateSwiperContainer">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={3} // Keep 3 slides in view
          loop={true} // Ensure the slider loops
          spaceBetween={30} // Add space between slides for better visual separation
          autoplay={{
            delay: 2000, // Adjust autoplay speed
            disableOnInteraction: false, // Ensure autoplay continues even after user interaction
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false, // Keep shadows minimal
          }}
          pagination={false}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="stateSwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >

          {states.map((state, index) => (
            <SwiperSlide key={state._id} className="swiperSlideWrapper">
              <Link to={`/state/${state.stateId}`}>
                <div className={`stateSlideContent ${activeIndex === index ? 'active' : ''}`}>
                  {/* Display specific images for Gujarat, Bihar, Himachal Pradesh */}
                  <img
                    loading="lazy"
                    src={
                      stateImages[state.state_name] ||
                      `https://swiperjs.com/demos/images/nature-${(index % 6) + 1}.jpg` // Default image if state is not mapped
                    }
                    alt={state.state_name}
                    className="stateSlideImage"
                    onError={(e) => (e.target.src = '/fallback.jpg')} // Fallback for missing images
                  />
                  <h2 className="stateSlideTitle">{state.state_name}</h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          {states.map((state, index) => (
            <SwiperSlide key={state._id} className="swiperSlideWrapper">
              <Link to={`/state/${state.stateId}`}>
                <div className={`stateSlideContent ${activeIndex === index ? 'active' : ''}`}>
                  {/* Display specific images for Gujarat, Bihar, Himachal Pradesh */}
                  <img
                    loading="lazy"
                    src={
                      stateImages[state.state_name] ||
                      `https://swiperjs.com/demos/images/nature-${(index % 6) + 1}.jpg` // Default image if state is not mapped
                    }
                    alt={state.state_name}
                    className="stateSlideImage"
                    onError={(e) => (e.target.src = '/fallback.jpg')} // Fallback for missing images
                  />
                  <h2 className="stateSlideTitle">{state.state_name}</h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="viewMoreContainer">
          <button className="viewMoreButton">View All</button>
        </div>
      </div>
    </div>
  );
}
