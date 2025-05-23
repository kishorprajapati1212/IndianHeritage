// pages/_app.js
import '../styles/globals.css';
import Navbar from '../Home_pages/Navbar';
// import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
}
