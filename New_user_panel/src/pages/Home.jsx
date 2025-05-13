// import State_Home from "../pages_components/State_Home"
// import Attraction from  "../pages_components/Attr"
import axios from "axios";
import dynamic from "next/dynamic";
const State_Home = dynamic(() => import("../pages_components/Home/State_Home"));
const Attraction = dynamic(() => import("../pages_components/Home/Attr"));

const Slider = dynamic(() => import("../pages_components/Home/Slider"), { ssr: false });
const Product = dynamic(() => import("../pages_components/Home/Product"), { ssr: false });

export async function getStaticProps() {
  const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
  let states = []
  let attractions = []

  try {
    const res = await axios.get(`${Backend_url}/Get_all_State_names`);
    const res2 = await axios.get(`${Backend_url}/Home_Page_Attractions`);

    states = res.data;
    attractions = res2.data;
  } catch (error) {
    console.error('Error fetching states:', error);
  }
  console.log(states)
  return {
    props: { states, attractions },
  };
}

const Home = ({ states, attractions }) => {
  return (
    <>
      <div style={{ width: '100%', height: '92vh', maxHeight: '100vh' }}>
        <Slider />
      </div>

      <State_Home states={states} />
      <div style={{ width: '100%', height: 'auto', maxHeight: '100vh' }}>
        <Product />

      </div>
      <Attraction attractions={attractions}/>
    </>
  );
};

export default Home;
