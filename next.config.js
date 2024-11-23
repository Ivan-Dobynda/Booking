/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
  },
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "photos.hotelbeds.com" },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_DO_SPACES_ASSET_HOST,
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_DO_SPACES_ASSET_PATH_NAME}/**`,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_DO_SPACES_ASSET_HOST_CDN,
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_DO_SPACES_ASSET_PATH_NAME}/**`,
      },
    ],
  },
};

module.exports = nextConfig;
