import { css } from "@emotion/react";
import { useUser } from "@supabase/auth-helpers-react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

const MyPage = () => {
  const user = useUser();
  const menuList = [
    {
      no: 0,
      title: "좋아요한 산책장소",
      icon: <FavoriteRoundedIcon sx={{ color: "#D53E14" }} />,
    },
    {
      no: 1,
      title: "찜 한 동물병원",
      icon: <GradeRoundedIcon sx={{ color: "#5AAC6F" }} />,
    },
    {
      no: 2,
      title: "좋아요한 동반여행지",
      icon: <ThumbUpAltRoundedIcon sx={{ color: "#48B7E2" }} />,
    },
    {
      no: 3,
      title: "로그아웃",
      icon: <LoginRoundedIcon sx={{ color: "#999999" }} />,
    },
  ];
  return (
    <div css={rootStyle}>
      <div css={topInnerStyle}>
        <img src={user?.user_metadata?.avatar_url} alt="user" />
        <p>
          안녕하세요. <span>{user?.user_metadata?.name}</span> 님<br />
          댕댕여지도에 오신걸 환영합니다.
        </p>
      </div>
      <div css={bottomInnerStyle}>
        {menuList.map((menu, idx, arr) => (
          <div css={menuStyle(arr.length - 1 === idx)}>
            {menu.icon}
            <p>{menu.title}</p>
          </div>
        ))}
      </div>
      <div css={textContainer}>회원탈퇴</div>
    </div>
  );
};

export default MyPage;

const rootStyle = css`
  position: relative;
  width: 100%;
  height: calc(100vh - 82px);
  background-color: #f3f3f6;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  ::scroll-margin {
    width: 0px;
  }
`;

const topInnerStyle = css`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 157px;
    height: 157px;
    border-radius: 50%;
    border: 4px solid #ffa871;
    margin-top: 35px;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
    text-align: center;
    letter-spacing: 0em;
    color: #fcac7a;
    padding-top: 30px;
  }
  span {
    color: #082e57;
  }
`;

const bottomInnerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom: 31px;
  width: 100%;
  min-height: 266px;
`;

const menuStyle = (isLogout: boolean) => css`
  width: 100%;
  background-color: #fff;
  border-radius: 16px;
  padding: 17px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
  text-align: center;
  color: ${isLogout ? "#999999" : "#082e57"};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const textContainer = css`
  position: absolute;
  bottom: 14px;
  right: 20px;
  font-size: 10px;
  font-weight: bold;
  line-height: normal;
  color: #d8d8d8;
`;
