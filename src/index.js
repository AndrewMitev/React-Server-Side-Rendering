import 'babel-polyfill';
import express from 'express';
import renderer  from './helpers/renderer';
import createServerStore from './helpers/createServerStore';
import { apiSlice } from './client/api/apiSlice';

const app = express();

app.use(express.static('public'));

app.get('*', async (request, response) => {
    const store = createServerStore();

    const result = await store.dispatch(
        apiSlice.endpoints.getMentors.initiate({
          skip: 0,
          take: 10,
          searchText: "",
        })
      );

    console.error("Request was rejected with:", result.error);

    response.send(renderer(request, store));
});

app.listen(3000, () => {
    console.log('Listening on port 3000..');
});