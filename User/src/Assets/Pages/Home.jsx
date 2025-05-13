// import FamousThings from "../Component/Home_components/FamousThings";
// import History from "../Component/Home_components/History";
// import Slider from "../Component/Home_components/Slider";
// import States from "../Component/Home_components/StateHeader";
// import TopReels from "../Component/Home_components/TopReels";
// import "./css/home.css";
import React, { lazy, Suspense } from "react";

// Lazy imports
const Slider = lazy(() => import("../Component/New_Home_page/Slider"));
const State_Home = lazy(() => import("../Component/New_Home_page/State_Home"));
const Product = lazy(() => import("../Component/New_Home_page/Product"));
const Attraction = lazy(() => import("../Component/New_Home_page/Attr"));



// const Kp_Home = () => {

//   return (
//     <>
//       {/* Home */}
//       <Product />
//       {/* <States />
//       <Slider />
//       <History />
//       <FamousThings />
//       <TopReels /> */}
//     </>

//   )
// }

const Home = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Slider...</div>}>
        <Slider />
      </Suspense>

      <Suspense fallback={<div>Loading States...</div>}>
        <State_Home />
      </Suspense>

      <Suspense fallback={<div>Loading Products...</div>}>
        <Product />
      </Suspense>

      <Suspense fallback={<div>Loading Attractions...</div>}>
        <Attraction />
      </Suspense>
      
    </>
  );
};


export default Home;