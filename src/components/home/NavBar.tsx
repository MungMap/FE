import React from "react";
import { css } from "@emotion/react";
import logo from "../../assets/textLogo.svg";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const NavBar = () => {
  return (
    <div css={rootStyle}>
      <img src={logo} alt="logo" />
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
`;
