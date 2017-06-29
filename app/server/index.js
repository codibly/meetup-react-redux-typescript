const express = require('express');
const process = require('process');
const path = require('path');
const dotenv = require('dotenv-safe').load({ sample: path.resolve(__dirname, '../../.env.dist') });
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const todos = require('./todos');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multipart());

// add todos endpoints
todos(app);

switch (process.env.NODE_ENV || 'development') {
  case 'development':
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const history = require('connect-history-api-fallback');
    const chalk = require('chalk');

    const config = require('../../builder/webpack.config');
    const compiler = webpack(config);
    const devMiddleware = webpackDevMiddleware(
      compiler,
      {
        stats: {
          colors: true,
          modules: false,
          assets: false,
          chunks: false,
          chunkModules: false
        }
      }
    );
    const hotMiddleware = webpackHotMiddleware(
      compiler,
      {
        log: console.log.bind(console)
      }
    );

    const historyFallback = history({
      rewrites: [
        { from: /^\/login/, to: '/auth.html' },
        { from: /^\/admin/, to: '/admin.html' },
        { from: /^\//, to: '/client.html' },
      ]
    });

    // use dev middleware, fallback history and use dev for fallback
    app.use(devMiddleware);
    app.use(historyFallback);
    app.use(devMiddleware);
    // use hot middleware
    app.use(hotMiddleware);

    // listen
    app.listen(port, () => compiler.plugin('done', () => console.log(`Server: ${chalk.bold.underline(`localhost:${port}`)}`)));

    break;

  case 'production':
    // serve static files
    const dist = path.resolve(__dirname, '../dist');

    app.use(express.static(dist));
    app.get('/login', (req, res) => {
      res.sendFile(path.join(dist, 'auth.html'));
    });
    app.get('/admin*', (req, res) => {
      res.sendFile(path.join(dist, 'admin.html'));
    });
    app.get('/*', (req, res) => {
      res.sendFile(path.join(dist, 'client.html'));
    });

    app.listen(port, () => console.log(`Worker ${process.pid} is listening on localhost:${port}...`));

    break;

  default:
    throw new Error(`Unknown environment ${process.env.NODE_ENV}. Server supports development and production environments.`);
}
