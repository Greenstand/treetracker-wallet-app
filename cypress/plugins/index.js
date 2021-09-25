require('dotenv').config();

module.exports = (on, config) => {
  //copy env
  config.env = { ...config.env, ...process.env };

  return config;
};
