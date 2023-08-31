import React from "react";
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { Provider } from "react-redux";
//import Routes from '../client/Routes.jsx';
import { Routes, Route } from "react-router-dom";
import Home, { loadData } from "../client/components/Home.jsx";

const routes = [
    {
      path: "/",
      loader: loadData,
      Component: Home,
    },
  ];

export default async (request, store) => {
  //let { dataRoutes } = createStaticHandler(routes);
  //let router = createStaticRouter(dataRoutes, {});
  const content = renderToString(
    <Provider store={store}>
        <StaticRouter location={request.path}>
            <Routes>
                <Route path="/" element={<Home />} loader={await loadData(store)} />
            </Routes>
        </StaticRouter>
    </Provider>
  );

  return `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script src='bundle.js'></script>
            </body>
        </html>
    `;
};
