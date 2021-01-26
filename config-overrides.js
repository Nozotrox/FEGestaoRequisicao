const { alias } = require("react-app-rewire-alias");
const path = require("path");

module.exports = function override(config) {
  alias({
    "@components": path.join(__dirname, 'src', 'components'),
    "@auth": path.join(__dirname, 'src', 'components', 'Auth'),
    "@mainPage": path.join(__dirname, 'src', 'components', 'MainPage'),
    "@sharedComponents": path.join(__dirname, 'src', 'components', 'Shared'),
    "@utils": path.join(__dirname, 'src', 'utils'),
    "@actions": path.join(__dirname, 'src', 'actions'),
    "@reducers": path.join(__dirname, 'src', 'reducers'),
    "@resources": path.join(__dirname, 'src', 'res'),
    "@model": path.join(__dirname, 'src', 'model'),
    "@resources": path.join(__dirname, 'src', 'resources'),
  })(config);

  return config;
};
