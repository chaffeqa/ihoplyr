const withSerwist = require('@serwist/next').default({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure we don't need 'target: serverless' anymore as it's deprecated/default behavior mostly.
};

module.exports = withSerwist(nextConfig);
