import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";

const appRoot = document.getElementById("app");

const root = createRoot(appRoot);

root.render(<App />);
