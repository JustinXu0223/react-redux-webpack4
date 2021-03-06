module.exports = {
  'pre:lint': {
    NODE_ENV: 'production',
    BABEL_ENV: 'production',
    REACT_APP_BASE_API: 'https://www.btccpool.info/api',
  },
  'start:dev': {
    NODE_ENV: 'development',
    BABEL_ENV: 'development',
    REACT_APP_BASE_API: 'https://pool-web-staging.com/api',
  },
  'build:staging': {
    NODE_ENV: 'production',
    BABEL_ENV: 'production',
    REACT_APP_BASE_API: 'https://pool-web-staging.com/api',
  },
  'build:prod': {
    NODE_ENV: 'production',
    BABEL_ENV: 'production',
    REACT_APP_BASE_API: 'https://www.btccpool.info/api',
  },
};
