import React, { useEffect } from "react";
import { css } from "@emotion/react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import { userIsMobileAtom } from "../../hooks/atom/searchFilter";

const NavBar = () => {
  const location = useLocation();
  const [isWebView, setIsWebView] = useAtom(userIsMobileAtom);
  const menuName = location.pathname;
  const user = useUser();

  const menuType = () => {
    switch (menuName) {
      case "/":
        return "댕댕여지도";
      case "/walk":
        return "산책하기";
      case "/mypage":
        return "마이페이지";
      case "/medical":
        return "병원찾기";
      case "/travel":
        return "동반여행";
      case "/mypage/favorites/walk":
        return "좋아요 한 산책장소";
      case "/mypage/favorites/medical":
        return "찜 한 동물병원";
      case "/mypage/favorites/travel":
        return "좋아요한 동반여행지";
      default:
        return "";
    }
  };

  return (
    <div css={rootStyle}>
      <p>{menuType()}</p>
      <Link to={"/mypage"}>
        {!isWebView && user?.user_metadata?.avatar_url ? (
          <img src={user?.user_metadata?.avatar_url} alt="user profile" />
        ) : (
          <AccountCircleRoundedIcon sx={{ color: "#ffffff", width: "24px" }} />
        )}
      </Link>
    </div>
  );
};

export default NavBar;

const rootStyle = css`
  width: 100%;
  height: 62px;
  background-color: #ffa871;
  padding: 0 16px;
  padding-bottom: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  p {
    font-family: NanumGothic;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
  }
`;
