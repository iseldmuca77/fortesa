/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site launched with English route names; keep those URLs working.
  async redirects() {
    return [
      { source: "/services", destination: "/sherbimet", permanent: true },
      { source: "/services/:path*", destination: "/sherbimet/:path*", permanent: true },
      { source: "/about", destination: "/rreth-nesh", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
    ];
  },
};

export default nextConfig;
