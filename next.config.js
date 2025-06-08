/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /@supabase\/realtime-js/,
        message: /the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

module.exports = nextConfig;