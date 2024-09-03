import { css } from "@emotion/react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuName = location.pathname;
  const menuList: any = [
    {
      no: 0,
      name: "홈",
      path: "/",
      icon: (isClicked) => (
        <HomeRoundedIcon
          sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
        />
      ),
    },
    {
      no: 1,
      name: "산책하기",
      path: "/walk",
      icon: (isClicked) => (
        <PetsRoundedIcon
          sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
        />
      ),
    },
    {
      no: 2,
      name: "마이페이지",
      path: "/mypage",
      icon: (isClicked) => (
        <AccountBoxRoundedIcon
          sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
        />
      ),
    },
    {
      no: 3,
      name: "뒤로가기",
      path: null,
      icon: (isClicked) => (
        <ArrowBackIosRoundedIcon
          sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
        />
      ),
      action: () => {
        navigate(-1);
      },
    },
  ];
  return (
    <div css={rootStyle}>
      {menuList.map((menu, idx) => {
        const isClicked =
          idx === 2 ? menuName.includes(menu?.path) : menu.path === menuName;
        return menu.path ? (
          <Link
            css={menuWrap(isClicked)}
            key={idx.toString()}
            to={menu.path}
            onClick={() => {}}
          >
            {menu.icon(isClicked)}
            <p css={menuTitle(isClicked)}>{menu.name}</p>
          </Link>
        ) : (
          <div
            css={menuWrap(false)}
            key={idx.toString()}
            onClick={menu.action}
            style={{ cursor: "pointer" }}
          >
            {menu.icon(false)}
            <p css={menuTitle(false)}>{menu.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNavigation;

const rootStyle = css`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  height: 46px;
  background-color: #ffffff;
`;

const menuWrap = (isActive: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33.3%;
  text-decoration-line: none;
  gap: 4px;
  border-top: 2px solid #d8d8d8;
`;

const menuTitle = (isActive: boolean) => css`
  color: ${isActive ? "#082E57" : "#999999"};
  font-size: 10px;
`;
