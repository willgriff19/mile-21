/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/?utm_source=instagram&utm_medium=bio',
        permanent: false,
      },
      {
        source: '/buy',
        destination: '/?utm_source=tiktok&utm_medium=bio',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
