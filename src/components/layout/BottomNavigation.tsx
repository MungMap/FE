import { css } from "@emotion/react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const menuName = location.pathname;
  const menuList = [
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
      path: "/myPage",
      icon: (isClicked) => (
        <AccountBoxRoundedIcon
          sx={{ width: "24px", color: isClicked ? "#082E57" : "#999999" }}
        />
      ),
    },
  ];
  return (
    <div css={rootStyle}>
      {menuList.map((menu, idx) => {
        return (
          <Link
            css={menuWrap(menu.path === menuName)}
            key={idx.toString()}
            to={menu.path}
          >
            {menu.icon(menu.path === menuName)}
            <p css={menuTitle(menu.path === menuName)}>{menu.name}</p>
          </Link>
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
  border-top: ${isActive ? "2px solid #082E57" : "2px solid #D8D8D8"};
`;

const menuTitle = (isActive: boolean) => css`
  color: ${isActive ? "#082E57" : "#999999"};
  font-size: 10px;
`;
