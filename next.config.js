/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.REMOTE_PATTERN_PROTOCOL,
        hostname: process.env.REMOTE_PATTERN_HOSTNAME,
        port: process.env.REMOTE_PATTERN_PORT,
        pathname: process.env.REMOTE_PATTERN_PATHNAME
      }
    ]
  }
}

module.exports = nextConfig
