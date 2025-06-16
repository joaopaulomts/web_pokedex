/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione esta parte para autorizar o domínio das imagens
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
