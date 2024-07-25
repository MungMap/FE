import { Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import reset from "./styles/Reset";
import Home from "./pages/Home";
import Error from "./pages/Error";

const Router = () => {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Router;
