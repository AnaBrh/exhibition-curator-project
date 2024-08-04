import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Modal from "react-modal";
import { ExhibitionProvider } from "./ExhibitionContext.jsx";
import "./styles/index.css";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <ExhibitionProvider>
    <App />
  </ExhibitionProvider>
);
