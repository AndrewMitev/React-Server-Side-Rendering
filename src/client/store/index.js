import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiSlice } from '../api/apiSlice';
import { isDevelopment } from '../infrastructure/environment';
import { rootReducer } from './reducers/rootReducer';

// This creates a Redux store, and also automatically configure the Redux DevTools extension
// Once it is created we need to make it available to React components by passing Provider in index.js
export const store = configureStore({
  reducer: rootReducer,
  // Middlewares
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware]),
  devTools: isDevelopment,
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
