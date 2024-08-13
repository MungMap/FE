import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import BottomNavigation from "../components/layout/BottomNavigation";

const MainLayout = () => {
  return (
    <div css={rootStyle}>
      <div css={innerWrap}>
        <NavBar />
        <Outlet />
        <BottomNavigation />
      </div>
    </div>
  );
};

export default MainLayout;

const rootStyle = css`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #9899be;
  height: 100vh;
  overflow: hidden;
`;

const innerWrap = css`
  position: relative;
  width: 100%;
  max-width: 667px;
  min-width: 355px;
  background-color: #ffffff;
  height: 100vh;
`;
