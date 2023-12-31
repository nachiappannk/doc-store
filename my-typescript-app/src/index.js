import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { reportWebVitals, AppAuthProvider } from "./Config";
import { AppRoutes } from "./Containers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <AppAuthProvider>
      <AppRoutes />
    </AppAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
