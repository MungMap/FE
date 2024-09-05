import { css } from "@emotion/react";
import intro from "../assets/introImg1.png";
import { Dialog } from "@mui/material";
import logo from "../assets/mainCi.png";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Policy from "../components/login/Policy";
import Privacy from "../components/login/Privacy";
import SignUp from "../components/login/SignUp";
import SignIn from "../components/login/SignIn";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const Login = () => {
  const navigate = useNavigate();
  const supabaseClient = useSupabaseClient();
  const [isClickedPolicy, setIsClickedPolicy] = useState<boolean>(false);
  const [isClickedPrivacy, setIsClickedPrivacy] = useState<boolean>(false);
  const [isServiceAgreed, setIsServiceAgreed] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isClickedLogin, setIsClickedLogin] = useState<boolean>(false);

  const isLogin = sessionStorage.getItem("isLogin");

  const handleKakaoLogin = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: import.meta.env.VITE_APP_REDIRECT_URL,
      },
    });
    if (!error) {
      sessionStorage.setItem("isLogin", JSON.stringify(true));
      navigate("/");
    } else {
      console.error("Login Error: ", error);
    }
  };

  return (
    <div css={rootStyle}>
      {isLogin && (
        <div css={overlayStyle}>
          <div css={spinnerWrap}>
            <div css={spinner} />
          </div>
        </div>
      )}
      <div css={innerStyle}>
        <div css={backImgWrap(intro)}>
          <img css={ciWrap} src={logo} alt="logo" />
        </div>
        <div css={labelWrap}>
          <p>댕댕여지도는 로그인 후 서비스를 제공합니다.</p>
        </div>
        <div css={bottomWrap}>
          <div css={lineContainer}>
            <span>간편 로그인</span>
          </div>
          <div>
            <b>카카오톡 로그인으로 3초안에 댕댕여지도를 이용하세요</b>
            <div
              css={loginBtn}
              onClick={() => {
                if (isServiceAgreed) {
                  handleKakaoLogin();
                } else {
                  setIsClickedLogin(true);
                }
              }}
            >
              카카오 로그인
            </div>
            <div css={signUpWrap}>
              <span
                onClick={() => {
                  setIsSignIn(true);
                }}
              >
                일반 로그인
              </span>{" "}
              |{" "}
              <span
                onClick={() => {
                  setIsSignUp(true);
                }}
              >
                회원가입
              </span>
            </div>
          </div>
          <div css={checkboxStyle}>
            <input
              type="checkbox"
              checked={isServiceAgreed}
              onChange={() => setIsServiceAgreed(!isServiceAgreed)}
            />
            댕댕여지도의
            <span
              onClick={() => {
                setIsClickedPolicy(true);
              }}
            >
              서비스 이용 약관
            </span>
            과
            <span
              onClick={() => {
                setIsClickedPrivacy(true);
              }}
            >
              개인정보 보호정책
            </span>
            에 동의
          </div>
        </div>
      </div>
      <Dialog
        open={isClickedPolicy}
        onClose={() => setIsClickedPolicy(false)}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "306px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <Policy />
      </Dialog>
      <Dialog
        open={isClickedPrivacy}
        onClose={() => setIsClickedPrivacy(false)}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "306px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <Privacy />
      </Dialog>
      <Dialog
        open={isSignUp}
        onClose={() => setIsSignUp(false)}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "306px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <div css={signUpModalWrap}>
          <SignUp
            setIsClickedPolicy={setIsClickedPolicy}
            setIsClickedPrivacy={setIsClickedPrivacy}
          />
          <div className="btn" onClick={() => setIsSignUp(false)}>
            <ClearRoundedIcon />
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isSignIn}
        onClose={() => setIsSignIn(false)}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "306px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <div css={signUpModalWrap}>
          <SignIn />
          <div className="btn" onClick={() => setIsSignIn(false)}>
            <ClearRoundedIcon />
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isClickedLogin}
        onClose={() => setIsClickedLogin(false)}
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
          <p>아래 약관에 동의해주세요.</p>
          <button onClick={() => setIsClickedLogin(false)}>확인</button>
        </div>
      </Dialog>
    </div>
  );
};

export default Login;

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

const innerStyle = css`
  position: relative;
  width: 100%;
  max-width: 667px;
  min-height: 100vh;
  img {
    width: 114px;
  }
`;

const checkboxStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: NanumGothic;
  font-size: 8px;
  font-weight: bold;
  line-height: normal;
  color: #494949;
  text-align: center;
  margin-bottom: 20px;
  span {
    color: #fcac7a;
  }
`;

const backImgWrap = (intro: any) => css`
  width: 100%;
  height: 60vh;
  background-image: url(${intro});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const labelWrap = css`
  width: 100%;
  height: 30px;
  background: #ffa871;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NanumGothic;
  font-size: 12px;
  font-weight: bold;
  line-height: normal;
  color: #ffffff;
`;

const ciWrap = css`
  position: absolute;
  width: 80px;
  top: 27%;
  left: 50%;
  transform: translateX(-50%);
`;
const bottomWrap = css`
  background: #fff;
  padding: 3vh 24px;
  width: 100%;
  height: calc(40vh - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  b {
    font-family: NanumGothic;
    font-size: 12px;
    font-weight: bold;
    line-height: normal;
    color: #3d3d3d;
  }
  p {
    font-family: NanumGothic;
    font-size: 8px;
    font-weight: bold;
    line-height: normal;
    color: #d8d8d8;
    text-align: center;
  }
`;
const lineContainer = css`
  height: 1px;
  width: 100%;
  background: #d8d8d8;
  position: relative;
  /* margin-bottom: 33px; */
  span {
    position: absolute;
    left: 50%;
    bottom: -500%;
    transform: translateX(-50%);
    width: 90px;
    background: #fff;
    text-align: center;
    font-family: NanumGothic;
    font-size: 10px;
    line-height: normal;
    color: #d8d8d8;
  }
`;

const loginBtn = css`
  width: 100%;
  padding: 14px 0;
  background: #fee500;
  color: #000000 85%;
  font-family: NanumGothic;
  font-weight: bold;
  font-size: 14px;
  border-radius: 12px;
  text-align: center;
  margin-top: 9px;
  cursor: pointer;
`;

const signUpWrap = css`
  font-family: NanumGothic;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-top: 8px;
  span {
    margin: 4px;
    cursor: pointer;
  }
`;

const spinner = css`
  position: absolute;
  top: 30vh;
  left: 50%;
  /* transform: translate(-50%); */
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fcac7a;
  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const spinnerWrap = css`
  position: relative;
  /* display: flex; */
  width: 100%;
  height: 100%;
  /* align-items: center;
  justify-content: center; */
`;

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const signUpModalWrap = css`
  position: relative;
  .btn {
    position: absolute;
    top: 0px;
    right: -30px;
    cursor: pointer;
  }
`;

const dialogContent = css`
  display: flex;
  text-align: center;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  font-family: "NanumSquareNeo";
  font-size: 12px;
  button {
    font-family: "NanumSquareNeoBold";
    background-color: #fcac7a;
    color: white;
    padding: 6px 30px;
    border-radius: 50px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;
