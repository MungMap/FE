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
import { useUser } from "@supabase/auth-helpers-react";
import Favorites from "./pages/Favorites";

const AuthenticateRoute = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const user = useUser();
  if (isAuthenticated) {
    return user ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
};

const Router = () => {
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
            <Route path="mypage" element={<MyPage />} />
            <Route path="/mypage/favorites/:category" element={<Favorites />} />
            <Route path="medical" element={<Medical />} />
            <Route path="travel" element={<Travel />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
