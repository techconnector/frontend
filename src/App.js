import React from "react";
import { Provider } from "react-redux";

import "./global.css";

import store from "./store";
import Routes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
