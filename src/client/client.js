import 'babel-polyfill';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/index.js';
import HomePage from './pages/HomePage.jsx';
import TestPage from './pages/TestPage.jsx';

hydrateRoot(
document.getElementById('root'),
<Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    </BrowserRouter>
</Provider>
);