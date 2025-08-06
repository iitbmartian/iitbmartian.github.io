/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
    domains: ['cdn-icons-png.flaticon.com'], // ✅ Add this line
  },
};

export default nextConfig;
