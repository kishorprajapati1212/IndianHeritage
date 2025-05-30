'use client';
import React, { useEffect, useRef, useState, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { Canvas,useFrame  } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

// GLTF Model Component
export const Model = ({ modelPath, keyProp, shouldAnimate }) => {
  const { scene } = useGLTF(modelPath);
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (scene) {
      const clonedScene = scene.clone(true);

      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 0.7;
          child.material.roughness = 0.3;
        }
      });

      setModel(clonedScene);
    }
  }, [scene]);

  useFrame(() => {
    if (model && shouldAnimate) {
      model.rotation.y += 0.01;
    }
  });

  if (!model) return null;

  return <primitive object={model} scale={0.03} key={keyProp} />;
};

// ProductDisplay Component
const ProductDisplay = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => {
      if (canvasRef.current) observer.unobserve(canvasRef.current);
    };
  }, []);

  const model = {
    modelPath: "/just_test/h4.gltf", // Make sure this is your actual GLB file path
    title: "Nataraj",
    description:
      `Nataraj, also known as the "Lord of Dance," is a depiction of the Hindu god Shiva as the cosmic dancer who performs the divine dance to destroy the weary universe and prepare for its renewal. The dance symbolizes the eternal cycle of creation, preservation, and destruction, highlighting the balance of cosmic forces.`,
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        position: "relative",
        background: "linear-gradient(to bottom, #121212, #000)",
        overflow: "hidden",
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          width: "40%",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          color: "#FFD700",
          background: "rgba(0, 0, 0, 0.7)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          borderRadius: "10px",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Roboto Slab', serif",
              marginBottom: "20px",
              fontWeight: "700",
              fontSize: "3.5rem",
              letterSpacing: "2px",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
              lineHeight: 1.2,
              color: "#FFD700",
            }}
          >
            {model.title}
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: "1.2rem",
              fontFamily: "'Playfair Display SC', serif",
              color: "#E5E5E5",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {model.description}
          </Typography>
        </motion.div>
      </Box>

      {/* Canvas Section */}
      <Box
        ref={canvasRef}
        sx={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          cursor: "pointer",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [3, 2, 8], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={5} color="#FFFACD" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.8}
            penumbra={1}
            intensity={300}
            color={"#FFD700"}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight
            position={[-3, 8, 5]}
            angle={0.5}
            penumbra={1}
            intensity={30}
            color={"#FF4500"}
            castShadow
          />
          <Suspense fallback={null}>
            <Model modelPath={model.modelPath} keyProp={model.title} shouldAnimate={isVisible} />
          </Suspense>
          <Environment preset="sunset" />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </Box>
    </Box>
  );
};

export default ProductDisplay;
