module.exports = ({env})=>[
  "strapi::errors",
  "strapi::security",
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            // `https://${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
            // `https://${(env('DOMAIN'))}`,
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            // `https://${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
            // `https://${(env('DOMAIN'))}`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      header: '*',
      origin: env('ALLOW_ORIGINS', '*'),
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  'strapi::session',
  "strapi::favicon",
  "strapi::public",
];
