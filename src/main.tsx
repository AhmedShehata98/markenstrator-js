import ReactDOM from "react-dom/client";

// 3rd party libraries
import { Provider } from "react-redux";

// Redux store
import store from "./Redux/Store";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
