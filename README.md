# Codibly Meetup #2
Creating scalable SPA on React / Redux / TypeScript stack

## Requirements
* node `^6.9.0`
* yarn `^0.17.0` or npm `^3.0.0`

### Installation
It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install         # Install project dependencies
$ cp .env.dist .env    # Create .env file based on dist template
$ yarn dev             # Start dev server
```
While developing, you will probably rely mostly on `yarn dev`; however, there are additional scripts at your disposal:

|`yarn run <script>`| Description |
|-------------------|-------------|
|`dev`              | Serves app at `localhost:3000`. |
|`build:dev`        | Builds development package to disk (`~/dist` by default). |
|`build`            | Builds production package to disk (`~/dist` by default). |
|`serve`            | Serve production package with node server. |
|`test`             | Runs unit tests with Jest.|
|`lint`             | Lint project files. |
|`lint:fix`         | Try to fix lint errors. |

## Thank you
I would like to thank [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) for inspiration.
