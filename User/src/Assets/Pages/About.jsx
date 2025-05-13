import React, { useEffect, useRef } from "react";

const About = () => {
  const sections = [
    {
      id: 1,
      title: "Our Mission",
      text: `We strive to bridge the gap between traditional artistry and modern audiences, empowering artisans  to showcase their work while preserving cultural heritage.`,
      image: "/photo/ab1.jpeg",
      bgColor: "#f8cd4f", // Soft Gold
    },
    {
      id: 2,
      title: "Why Choose Us",
      text: `From handcrafted products to curated articles about heritage, we provide an immersive experience 
               for those who value authenticity and culture.`,
      image: "/photo/ab2.jpeg",
      bgColor: "#FFDAB9", // Peach
    },
    {
      id: 3,
      title: "Our Vision",
      text:" Our vision is to empower artisans by giving them a global platform to showcase their talent.",
      image: "/photo/ab3.jpeg",
      bgColor: "#A9DFBF", // Light Olive Green
    },

    // {
    //   id: 4,
    //   title: "Join Us",
    //   text: "Be a part of our journey to celebrate and preserve India’s cultural wealth.",
    //   image: "/photo/ab5.jpeg",
    //   bgColor: "#F4A261",
    // },
  ];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.3, // Trigger animation when 30% of the section is visible
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1; // Fade in
          entry.target.style.transition = `opacity 1s ease ${
            (index + 0.5) * 0.2
          }s`;
        } else {
          entry.target.style.opacity = 0; // Hide when out of view
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    sectionRefs.current.forEach((section) => {
      observer.observe(section); // Observe each section
    });

    return () => {
      observer.disconnect(); // Clean up the observer
    };
  }, []);

  const containerStyle = {
    fontFamily: "'inter', sans-serif",
    color: "#333",
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "2.5rem",

    marginBottom: "40px",
  };

  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "60px",
    opacity: 0, // Start hidden
    position: "relative", // Ensure it's positioned correctly
    transition: "opacity 1s ease", // Smooth opacity transition
  };

  const textStyle = {
    // flex: 1,
    padding: "20px",
  };

  const imageStyle = {
    // flex: 1,
    textAlign: "center",
  };

  const imgStyle = {
    width: "80%",
    maxWidth: "200px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          style={{
            ...sectionStyle,
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            backgroundColor: section.bgColor, // Set unique background color for each section
          }}
        >
          <div style={textStyle}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
          <div style={imageStyle}>
            <img src={section.image} alt={section.title} style={imgStyle} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;