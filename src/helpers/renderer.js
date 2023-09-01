import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter} from "react-router-dom/server";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import serialize from "serialize-javascript";

import HomePage, {loadHomeData} from "../client/pages/HomePage.jsx";
import TestPage from "../client/pages/TestPage.jsx";

export default async (request, store) => {
  const content = renderToString(
    <Provider store={store}>
        <StaticRouter location={request.path}>
            <Routes>
                <Route path="/" element={<HomePage />} loader={await loadHomeData(store)} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </StaticRouter>
    </Provider>
  );

  return `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script>
                 window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <script src='bundle.js'></script>
            </body>
        </html>
    `;
};
