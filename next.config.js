const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const withManifest = require('next-manifest');
const { resolve } = require('path');

const manifest = {
  name: 'ihoplyr',
  short_name: 'ihoplyr',
  display: 'minimal-ui',
  icons: {
    src: resolve(process.cwd(), './assets/icon.png'),
    cache: true
  }
}
const workboxOpts = {
  swDest: 'static/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'https-calls',
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/feed\.theplatform\.com*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'remote-https-calls',
        networkTimeoutSeconds: 30,
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 15 * 60, // 15 minutes
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
}

const nextConfig = {
  workboxOpts: workboxOpts,
  manifest: manifest,
}


const config = withOffline(
  withManifest(
    withTypescript(nextConfig)
  )
)
// config.target = 'serverless'
module.exports = config
