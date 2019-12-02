const argv = require('yargs').argv;

module.exports = (config) => {
  config.target = argv.web || argv.dev ? 'web' : 'electron-renderer';
  return config;
};
