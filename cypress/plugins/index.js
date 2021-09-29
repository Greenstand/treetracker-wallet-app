require('dotenv').config();

module.exports = (on, config) => {
  //copy env
  config.env = { ...config.env, ...process.env };

  require('@cypress/react/plugins/react-scripts')(on, config);

  return config;
};
