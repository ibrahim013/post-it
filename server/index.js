import path from 'path';
import webpack from 'webpack';
import webpackmiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const index = require('./routes/user');

const port = parseInt(process.env.PORT, 10) || 3000;
const compiler = webpack(webpackConfig);


app.use(webpackmiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


// API MIDDLEWARE ============================================================
app.listen(port);

