import 'babel-polyfill';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { renderRoutes } from 'react-router-config';
import DefinedRoutes from './Routes.jsx';
import { store } from './store/index.js';
import Home from './components/Home.jsx';

hydrateRoot(
document.getElementById('root'),
<Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
</Provider>
);