## Lagoon UI

The main user interface and dashboard for [Lagoon](https://github.com/uselagoon/lagoon). 

## Build

To build and test changes locally the Lagoon UI can be built via Yarn or Docker.

Testing locally, the UI can be connected to production or development Lagoon instances. Here we have included the URLs for the amazee.io cloud, but you can substitute your own.

### Yarn
Note: Within `docker-compose.yml` `GRAPHQL_API` & `KEYCLOAK_API` are set to localhost by default.

```
yarn install
yarn build && GRAPHQL_API=https://api.lagoon.amazeeio.cloud/graphql KEYCLOAK_API=https://keycloak.amazeeio.cloud/auth yarn dev
```
These values can also be updated in `docker-compose.yml`.

### Docker
Note: Within `docker-compose.yml` `GRAPHQL_API` & `KEYCLOAK_API` will need to be set to 
```
  GRAPHQL_API: "${GRAPHQL_API:-https://api.lagoon.amazeeio.cloud/graphql}"
  KEYCLOAK_API: "${KEYCLOAK_API:-https://keycloak.amazeeio.cloud/auth}"
```

```
docker-compose build
docker-compose up -d
```

This project is tested with BrowserStack.

## Linting

The linter is configured for both JS and TypeScript files, with the latter being much stricter.
It runs during the build step but can also be ran during development by `yarn lint`

Linter and TS configs are both located in the root of the project as `.eslintrc.js` and `tsconfig.json`


## Styling

Lagoon-UI uses styled-components and it's recommended to use separete files for styling for each component.
`<style jsx>` tags are allowed but nesting is not.


## Plugin system

The Lagoon UI supports basic plugins via a plugin registry.
The file, in the root, "plugins.json" allows you to hook into the server side rendering to add additional CSS and Javascript files. These are simply added as "script" and "link" elements to the resulting HTML.
We currently support adding elements to the `head` at at the end of the `body` as demonstrated below.

In this example, we load two elements, a JS script and a css file into the `head`, and then we add an external library at the bottom of the `body`.

```
{
    "head": [
        {"type": "script", "location":"/static/custom.js"},
        {"type": "link",   "href":"/static/plugins/custom.css"}
        
    ],
    "body": [
        {"type": "script", "location":"https://www.cornify.com/js/cornify.js"}
    ]
}
```

## Tours configuration

The `tour.json` file contains configuration for the tour of the Lagoon app. it has the following structure:

``` 
{
    "mode": "translated",
    "routes": [
        {
            "pathName": "/projects",
            "steps": [
                {
                    "target":".someclass",
                    "title:": "title of the tour step",
                    "content": "description of the tour step",
                    "key": "unique step identifier per route"
                }
                ...
            ]
        }
        ...
    ]
}

```
> Note: The sequence of routes is self paced, meaning the users see information once as they traverse the app in an explanatory way

### Tour properties

- `mode` (string) - "translated" or "literal", if the value is "translated", `content` and `title` will be used as keys for lookup in the translation file, otherwise directly used.
- `routes` (array) - Array of objects, each describing a steps in the tour per route.  
   - `pathName` (string) - route.
   - `target` (string) - css selector for the tour step.
   - `content` (string) - This property is used based on the `mode` property, acts as the tour step body.
   - `title` (string) - Similar to content, only acts as the header for the tour step.
   - `key` (string) - identifier of steps per route, needs to be unique for each object in the `steps` array.
   - `placement` (string) (optional) - tooltip placement defined in react-joyride [docs](https://docs.react-joyride.com/step) 
