/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['swiperjs.com', 'raw.githubusercontent.com', 'example.com'], // add all domains you use
  },
  output: 'export',  
  // reactStrictMode: false,
};

export default nextConfig;
