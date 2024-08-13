import React from "react";
import { css } from "@emotion/react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const menuName = location.pathname;

  const menuType = () => {
    switch (menuName) {
      case "/":
        return "댕댕여지도";
      case "/walk":
        return "산책하기";
      case "/myPage":
        return "마이페이지";
      case "/hospital":
        return "병원찾기";
      case "/travel":
        return "동반여행";
      default:
        return "";
    }
  };

  return (
    <div css={rootStyle}>
      <p>{menuType()}</p>
      <AccountCircleRoundedIcon sx={{ color: "#ffffff", width: "24px" }} />
    </div>
  );
};

export default NavBar;

const rootStyle = css`
  width: 100%;
  height: 36px;
  background-color: #ffa871;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 58px;
  }
  p {
    font-family: NanumGothic;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
  }
`;
