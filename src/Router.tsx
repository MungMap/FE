import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Global } from "@emotion/react";
import reset from "./styles/Reset";
import Home from "./pages/Home";
import Walk from "./pages/Walk";
import Login from "./pages/Login";
import Error from "./pages/Error";
import MyPage from "./pages/MyPage";
import MainLayout from "./layout/MainLayout";
import Medical from "./pages/Medical";
import Travel from "./pages/Travel";

const Router = () => {
  const isLogin = sessionStorage.getItem("isLogin");

  const AuthenticateRoute = ({
    isAuthenticated,
  }: {
    isAuthenticated: boolean;
  }) => {
    if (isAuthenticated) {
      return isLogin ? <Outlet /> : <Navigate to="/login" />;
    } else {
      return isLogin ? <Navigate to="/" /> : <Outlet />;
    }
  };

  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route element={<AuthenticateRoute isAuthenticated={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route element={<AuthenticateRoute isAuthenticated={true} />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="walk" element={<Walk />} />
            <Route path="myPage" element={<MyPage />} />
            <Route path="medical" element={<Medical />} />
            <Route path="travel" element={<Travel />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
