import React from "react";
import ReactDOM from "react-dom/client";

// 3rd party libraries
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// helpers
import Routes from "./Router/Routes";
import store from "./Redux/Store";

// themes
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);
