import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BackButton = dynamic(() => import("../../../Home_pages/BackButton"));
const State_Card = dynamic(() => import("../../../pages_components/State/State_Card") );
const State_Information = dynamic(() => import("../../../pages_components/State/State_Information") );
const State_Slide = dynamic(() => import("../../../pages_components/State/State_Slider") );

const State_Home = () => {
  const router = useRouter();
  const {stateId} = router.query;
  console.log(stateId)
  return ( 
    <>
      <BackButton />

      <State_Slide />
      <State_Information />
      <State_Card />
    </>
  );
};

export default State_Home;
