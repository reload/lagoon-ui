const webpackShared = require('./webpack.shared-config');
require('dotenv-extended').load();
const fs = require('fs');

const withCSS = require('@zeit/next-css');

const lagoonRoutes =
  (process.env.LAGOON_ROUTES && process.env.LAGOON_ROUTES.split(',')) || [];

const lagoonApiRoute = lagoonRoutes.find(route => route.includes('api-'));
const envApiRoute = process.env.GRAPHQL_API;

const lagoonKeycloakRoute = lagoonRoutes.find(routes =>
  routes.includes('keycloak-')
);
const envKeycloakRoute = process.env.KEYCLOAK_API;

const lagoonVersion = process.env.LAGOON_VERSION;

const taskBlocklist =
  (process.env.LAGOON_UI_TASK_BLOCKLIST &&
    process.env.LAGOON_UI_TASK_BLOCKLIST.split(',')) ||
  [];

// Here we load the plugin registry from plugins.json
let pluginRegistry = {};
if(fs.existsSync("plugins.json")) {
  const pluginString = fs.readFileSync("plugins.json");
  pluginRegistry = JSON.parse(pluginString);
}

module.exports = withCSS({
  publicRuntimeConfig: {
    GRAPHQL_API: lagoonApiRoute ? `${lagoonApiRoute}/graphql` : envApiRoute,
    GRAPHQL_API_TOKEN: process.env.GRAPHQL_API_TOKEN,
    KEYCLOAK_API: lagoonKeycloakRoute
      ? `${lagoonKeycloakRoute}/auth`
      : envKeycloakRoute,
    LAGOON_UI_ICON: process.env.LAGOON_UI_ICON,
    LAGOON_UI_TASK_BLOCKLIST: taskBlocklist,
    LAGOON_VERSION: lagoonVersion,
    LAGOON_UI_DEPLOYMENTS_LIMIT: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT,
    LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE: process.env.LAGOON_UI_DEPLOYMENTS_LIMIT_MESSAGE,
    LAGOON_UI_TASKS_LIMIT: process.env.LAGOON_UI_TASKS_LIMIT,
    LAGOON_UI_TASKS_LIMIT_MESSAGE: process.env.LAGOON_UI_TASKS_LIMIT_MESSAGE,
    LAGOON_UI_BACKUPS_LIMIT: process.env.LAGOON_UI_BACKUPS_LIMIT,
    LAGOON_UI_BACKUPS_LIMIT_MESSAGE: process.env.LAGOON_UI_BACKUPS_LIMIT_MESSAGE,
    PLUGIN_SCRIPTS: pluginRegistry,
  },
  distDir: '../build',
  webpack(config, options) {
    // Add aliases from shared config file.
    Object.keys(webpackShared.alias).forEach(name => config.resolve.alias[name] = webpackShared.alias[name]);

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./lib/polyfills.js')
      ) {
        entries['main.js'].unshift('./lib/polyfills.js');
      }

      return entries;
    };

    // Debug config.
    // console.dir(config, { depth: null });

    return config;
  }
});
