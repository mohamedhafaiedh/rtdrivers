import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/covid-19-voyagez-en-toute-securite",
        destination: "/",
        permanent: true,
      },
      {
        source: "/covid-19-voyagez-en-toute-securite/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
