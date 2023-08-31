import 'babel-polyfill';
import express from 'express';
import renderer  from './helpers/renderer';
import createServerStore from './helpers/createServerStore';
import { apiSlice } from './client/api/apiSlice';
import https from 'https';
global.fetch = require('node-fetch');

const app = express();

app.use(express.static('public'));

app.get('*', async (request, response) => {
    const store = createServerStore();

    response.send(await renderer(request, store));
});

app.listen(3000, () => {
    console.log('Listening on port 3000..');
});