const path = require('path');

module.exports = {
    i18n: {
      locales: ['en', 'ru'],
      defaultLocale: 'en',
      localeDetection: true
    },
    localePath: path.resolve('./public/locales'),
  };