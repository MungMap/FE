import React from "react";
import { css } from "@emotion/react";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { Link } from "react-router-dom";

const HomeMenu = () => {
  const menuList = [
    {
      no: 0,
      title: "산책하기",
      path: "/walk",
      icon: <PetsRoundedIcon sx={{ width: "30px", color: "#0B3458" }} />,
    },
    {
      no: 1,
      title: "병원찾기",
      path: "/hospital",
      icon: <MedicationRoundedIcon sx={{ width: "30px", color: "#0B3458" }} />,
    },
    {
      no: 2,
      title: "동반여행",
      path: "/travel",
      icon: <LuggageRoundedIcon sx={{ width: "30px", color: "#0B3458" }} />,
    },
    {
      no: 3,
      title: "마이페이지",
      path: "/myPage",
      icon: <AccountBoxRoundedIcon sx={{ width: "30px", color: "#0B3458" }} />,
    },
  ];
  return (
    <div css={rootStyle}>
      {menuList.map((menu, idx) => {
        return (
          <Link css={menuWrap} key={idx.toString()} to={menu.path}>
            {menu.icon}
            <p>{menu.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeMenu;

const rootStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px 34px;
  border-radius: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06);
  margin-top: 25px;
`;

const menuWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #0b3458;
  font-size: 10px;
  font-weight: 700;
  width: 33.3%;
  text-decoration-line: none;
  gap: 4px;
`;
