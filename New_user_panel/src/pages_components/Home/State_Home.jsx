import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './css/States.module.css';
import React, { useState } from 'react';
import Link from 'next/link';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';


export default function State_Home({ states }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stateImages = {
    GUJRAT: '/just_test/Gujrat.jpeg',
    Bihar: 'https://example.com/bihar-image.jpg',
    HimachalPradesh: 'https://example.com/himachal-pradesh-image.jpg',
  };

  return (
    <div className={styles.States}>
      <p className={styles.head}>Explore States</p>
      <div className={styles.stateSwiperContainer}>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={3}
          loop={true}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={false}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className={styles.stateSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {states.map((state, index) => (
            <SwiperSlide key={state._id} className={styles.swiperSlideWrapper}>
              <Link href={`/state/${state.stateId}`} legacyBehavior>
                <a>
                  <div
                    className={`stateSlideContent ${activeIndex === index ? styles.active : ''
                      }`}
                  >
                    <img
                      loading="lazy"
                      src={
                        stateImages[state.state_name] ||
                        `https://swiperjs.com/demos/images/nature-${(index % 6) + 1}.jpg`
                      }
                      width={300}
                      height={200}
                      alt={state.state_name}
                      className={styles.stateSlideImage}
                      onError={() => console.log("Error is detected")}
                    />
                    <h2 className={styles.stateSlideTitle}>{state.state_name}</h2>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
