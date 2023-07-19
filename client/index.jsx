import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { store } from '../client/components/store/store';
import { Provider } from "react-redux";
import App from "./components/App.jsx";

const appRoot = document.getElementById("app");

const root = createRoot(appRoot);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
