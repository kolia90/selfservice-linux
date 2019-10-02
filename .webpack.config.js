const argv = require('yargs').argv;

module.exports = (config) => {
  config.target = argv.web ? 'web' : 'electron-renderer';
  return config;
};
