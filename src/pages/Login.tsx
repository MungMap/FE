import { css } from "@emotion/react";
import intro from "../assets/introImg1.png";
import logo from "../assets/mainCi.png";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const supabaseClient = useSupabaseClient();

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
            <div css={loginBtn} onClick={handleKakaoLogin}>
              카카오 로그인
            </div>
          </div>
          <p>
            회원가입 시 댕댕여지도의 서비스 이용 약관과 개인정보 보호정책에
            동의하게 됩니다.
          </p>
        </div>
      </div>
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

const backImgWrap = (intro: any) => css`
  width: 100%;
  height: 70vh;
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
  height: calc(30vh - 30px);
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
  margin-bottom: 53px;
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
