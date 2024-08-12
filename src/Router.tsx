import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Global } from "@emotion/react";
import reset from "./styles/Reset";
import Home from "./pages/Home";
import Walk from "./pages/Walk";
import Login from "./pages/Login";
import Error from "./pages/Error";
import MyPage from "./pages/MyPage";
import MainLayout from "./layout/MainLayout";

const Router = () => {
  const AuthenticateRoute = ({
    isAuthenticated,
  }: {
    isAuthenticated: boolean;
  }) => {
    const token = sessionStorage.getItem("accessToken");

    if (isAuthenticated) {
      return token ? <Outlet /> : <Navigate to={"/login"} />;
    } else {
      return token ? <Navigate to={"/"} /> : <Outlet />;
    }
  };
  return (
    <>
      <Global styles={reset} />
      <Routes>
        {/* <Route element={<AuthenticateRoute isAuthenticated={false} />}> */}
        <Route path="/login" element={<Login />} />
        {/* </Route> */}
        <Route path="*" element={<Error />} />
        {/* <Route element={<AuthenticateRoute isAuthenticated={true} />}> */}
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="walk" element={<Walk />} />
          <Route path="myPage" element={<MyPage />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default Router;
