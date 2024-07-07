/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          child_process: false,
        },
      };
    }
    return config;
  },
  images: {
    domains: ["blue-quickest-opossum-600.mypinata.cloud"],
  },
};

export default nextConfig;
