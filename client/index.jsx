import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import React from "react";

const appRoot = document.getElementById("app");

const root = createRoot(appRoot);

root.render(<App />);
