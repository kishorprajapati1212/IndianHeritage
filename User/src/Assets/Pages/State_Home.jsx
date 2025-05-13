import React, {lazy, Suspense} from "react";
import { useNavigate } from "react-router-dom";  // Importing useNavigate from react-router-dom

import { Button, Box } from "@mui/material"; // Importing MUI Button
const BackButton = lazy(() => import("../Component/BackButton"));
const Formate = lazy(() => import("../Component/State_Main_Component/Formate") );
const State_Card = lazy(() => import("../Component/State_Main_Component/State_Card") );
const State_Information = lazy(() => import("../Component/State_Main_Component/State_Information") );
const State_Slide = lazy(() => import("../Component/State_Main_Component/State_Slider") );

const State_Home = () => {
  return ( 
    <>
      {/* Back Button */}
      <BackButton />

      {/* Other Components */}
      <State_Slide />
      <State_Information />
      {/* <Formate /> */}
      <State_Card />
    </>
  );
};

export default State_Home;
