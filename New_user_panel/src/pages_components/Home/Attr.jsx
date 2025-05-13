import styles from "./css/Attr.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Attraction = ({ attractions }) => {
  return (
    <div className={styles.Attr_container}>
      <p className={styles.Attr_heading}>ATTRACTIONS</p>
      <div className={styles.Attr_card_container}>
        {attractions.map((attraction, index) => (
          <div key={index} className={styles.Attr_card}>
            <div className={styles.Attr_image_wrapper}>
              <Image
                src={attraction.place_image[0]}
                alt={attraction.place_name}
                fill
                className={styles.Attr_image}
                loading="lazy"
              />
            </div>

            <div className={styles.Attr_card_content}>
              <h2 className={styles.Attr_card_title}>{attraction.place_name}</h2>
              <p className={styles.Attr_card_body}>
                {attraction.description.length > 50
                  ? `${attraction.description.substring(0, 50)}...`
                  : attraction.description}
              </p>
              <Link
                href={`/state/${attraction.stateId}/place/${attraction._id}`}
                className={styles.Attr_button}
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attraction;
