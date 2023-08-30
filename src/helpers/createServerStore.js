import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../client/store/reducers/rootReducer';
import { isDevelopment } from '../client/infrastructure/environment';
import { apiSlice } from '../client/api/apiSlice';

export default () => {
    const store = configureStore({
        reducer: rootReducer,
        // Middlewares
        // Adding the api middleware enables caching, invalidation, polling,
        // and other useful features of `rtk-query`
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware]),
        devTools: isDevelopment,
      });

    return store;
};