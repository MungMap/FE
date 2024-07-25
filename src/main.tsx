import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <App />

    // <React.StrictMode> //* StrictMode시 지도 랜더링 2번됨
    //   <App />
    // </React.StrictMode>
  );
}
