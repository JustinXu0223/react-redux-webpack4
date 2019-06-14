module.exports = {
  reactDll: {
    output: 'dist-dll',
    name: 'react',
    suffix: '.manifest.json',
  },
  port: 8080,
  staticDir: './public',
  output: {
    path: 'www/',
    entryPath: 'www/main',
    publicPath: '/',
  },
};
