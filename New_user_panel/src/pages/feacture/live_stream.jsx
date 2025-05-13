import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Box, Typography } from "@mui/material";

const Viewer = () => {
  const videoRef = useRef(null);
  const [isStreamAvailable, setIsStreamAvailable] = useState(false);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const ROOM_ID = "room123"; // Example room ID

  useEffect(() => {
    socket.current = io("https://livestreamonlyone.onrender.com", {
      transports: ["websocket", "polling"],
    });

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    socket.current.emit("join-room", ROOM_ID);

    socket.current.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answer", answer, ROOM_ID);
    });

    peerConnection.current.ontrack = (event) => {
      if (event.streams[0]) {
        videoRef.current.srcObject = event.streams[0];
        setIsStreamAvailable(true);
      }
    };

    socket.current.on("ice-candidate", async (candidate) => {
      if (candidate) {
        try {
          await peerConnection.current.addIceCandidate(candidate);
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    });

    return () => {
      socket.current.disconnect();
      peerConnection.current.close();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #000, #6a0dad)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        Live Stream Viewer
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 800,
          height: 450,
          backgroundColor: "#000",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {!isStreamAvailable && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
              }}
            >
              Waiting for stream...
            </Typography>
          </Box>
        )}
      </Box>

      <Typography
        sx={{
          mt: 2,
          fontSize: "1.2rem",
          fontWeight: "medium",
          textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        {isStreamAvailable ? "Stream is live!" : "Waiting for stream..."}
      </Typography>
    </Box>
  );
};

export default Viewer;