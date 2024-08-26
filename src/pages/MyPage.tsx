import { useState } from "react";
import { css } from "@emotion/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";

const MyPage = () => {
  const [userStatus, setUserStatus] = useState<number>(0);
  const user = useUser();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  //* 로그아웃
  const handleAuth = async () => {
    sessionStorage.removeItem("isLogin");
    localStorage.removeItem("sb-gzmgdpstnvnvyeyhoppc-auth-token");
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
      }
    }
    if (!user) {
      navigate("/login");
    }
  };

  //* 회원탈퇴
  const handleDeleteAccount = async () => {
    const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
    const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;
    const response = await fetch(
      `${supabaseUrl}/auth/v1/admin/users/${user?.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceRoleKey}`,
          apikey: serviceRoleKey,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.error("Error deleting user:", error);
      return;
    }
    handleAuth();
  };

  const menuList = [
    {
      no: 0,
      title: "좋아요한 산책장소",
      icon: <FavoriteRoundedIcon sx={{ color: "#D53E14" }} />,
      onClick: () => navigate("/"),
    },
    {
      no: 1,
      title: "찜 한 동물병원",
      icon: <GradeRoundedIcon sx={{ color: "#5AAC6F" }} />,
      onClick: () => navigate("/"),
    },
    {
      no: 2,
      title: "좋아요한 동반여행지",
      icon: <ThumbUpAltRoundedIcon sx={{ color: "#48B7E2" }} />,
      onClick: () => navigate("/"),
    },
    {
      no: 3,
      title: "로그아웃",
      icon: <LoginRoundedIcon sx={{ color: "#999999" }} />,
      onClick: () => setUserStatus(1),
    },
  ];
  return (
    <>
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
            <div
              key={idx.toString()}
              css={menuStyle(arr.length - 1 === idx)}
              onClick={menu.onClick}
            >
              {menu.icon}
              <p>{menu.title}</p>
            </div>
          ))}
        </div>
        <div
          css={textContainer}
          onClick={() => {
            setUserStatus(2);
          }}
        >
          회원탈퇴
        </div>
      </div>
      <Dialog
        open={userStatus === 1}
        onClose={() => setUserStatus(0)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "306px",
            minWidth: "240px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <div css={dialogContent}>
          <div css={dialogWrap}>
            <p>로그아웃 하시겠습니까?</p>
          </div>
          <div css={btnWrap}>
            <button css={disabledBtn} onClick={() => handleAuth()}>
              확인
            </button>
            <button css={activeBtn} onClick={() => setUserStatus(0)}>
              취소
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={userStatus === 2}
        onClose={() => setUserStatus(0)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "306px",
            minWidth: "240px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <div css={dialogContent}>
          <div css={dialogWrap}>
            <p>정말 탈퇴 하시겠습니까?</p>
          </div>
          <div css={btnWrap}>
            <button css={disabledBtn} onClick={() => handleDeleteAccount()}>
              확인
            </button>
            <button css={activeBtn} onClick={() => setUserStatus(0)}>
              취소
            </button>
          </div>
        </div>
      </Dialog>
    </>
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

const dialogContent = css`
  display: flex;
  font-family: "NanumSquareNeo";
  font-size: 12px;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  img {
    width: 27px;
  }
  p {
    font-family: "NanumSquareNeoExtraBold";
    color: #3d3d3d;
  }
  span {
    font-family: "NanumSquareNeoRegular";
    color: #88888a;
  }
`;

const dialogWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
`;

const btnWrap = css`
  display: flex;
  justify-content: flex;
  align-items: center;
  gap: 6px;
`;

const activeBtn = css`
  font-family: "NanumSquareNeoExtraBold";
  background-color: #fcac7a;
  color: white;
  padding: 7px 30px;
  border-radius: 50px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const disabledBtn = css`
  font-family: "NanumSquareNeoExtraBold";
  background-color: #d8d8d8;
  color: white;
  padding: 7px 30px;
  border-radius: 50px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
