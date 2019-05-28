const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const withManifest = require('next-manifest');
const { resolve } = require('path');

const pwaManifest = require('@pwa/manifest');
const pwaManifestIcons = require('@pwa/manifest-icons');

// const withManifest = module.exports = (nextConfig = {}) => {
//   return Object.assign({}, nextConfig, {
//     webpack(config, options) {
//       const {
//         isServer,
//         dev,
//         buildId,
//         defaultLoaders,
//         config: {
//           distDir
//         }
//       } = options
// 
//       if (!defaultLoaders) {
//         throw new Error(
//           'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
//         )
//       }
// 
//       const {webpack, manifest} = nextConfig;
// 
//       if (!isServer && !dev) {
//         const m = pwaManifest.sync({
//           "background_color": "#FFFFFF",
//           "theme_color": "#FFFFFF",
//           "start_url": "/?utm_source=web_app_manifest",
//           ...manifest
//         });
// 
//         if (manifest.icons && manifest.icons.src) {
//           m.icons = pwaManifestIcons.sync({
//             src: manifest.icons.src,
//             cache: manifest.icons.cache || false,
//             output: resolve(process.cwd(), `./static/manifest/icons`),
//             publicPath: '/static/manifest/icons/',
//             sizes: manifest.icons.sizes || [192, 512]
// 
//           });
//         }
// 
//         pwaManifest.writeSync('./static/manifest/', m);
//       }
// 
//       if (typeof webpack === 'function') {
//         return webpack(config, options);
//       }
// 
//       return config;
//     }
//   })
// }

const manifest = {
  name: 'ihoplyr',
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
