import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./Contexts/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>
);
