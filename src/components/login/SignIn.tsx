import { css } from "@emotion/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import icon from "../../assets/dogIcon.png";

const SignIn = () => {
  const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
  const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      sessionStorage.setItem("isLogin", JSON.stringify(true));
    }
  };
  return (
    <form css={modalWrapper} onSubmit={handleLogin}>
      <div css={dialogWrap}>
        <img src={icon} alt="" />
        <p>로그인</p>
      </div>
      <div css={inputWrapperStyles}>
        <span css={labelStyles}>이름(닉네임)</span>
        <input
          css={topInputStyles(false)}
          type="email"
          value={email}
          placeholder="아이디(이메일)을 입력해주세요."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div css={inputWrapperStyles}>
        <span css={labelStyles}>비밀번호</span>
        <input
          css={topInputStyles(false)}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          required
        />
      </div>
      <button css={btnWrap(!!email && !!password)} type="submit">
        로그인
      </button>
    </form>
  );
};

export default SignIn;

const modalWrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  background-color: #fafcff;
  p {
    color: #141c2a;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 16px;
  }
`;
const labelStyles = css`
  color: #747980;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 4px;
  margin-left: 4px;
`;

const inputWrapperStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const topInputStyles = (isInformation: boolean) => css`
  display: flex;
  width: 280px;
  padding: 12px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  font-family: "Pretendard-Regular";
  ${isInformation
    ? `box-shadow: 0 0 0 2px #D73131 inset;
       border: 1px solid #D73131; 
    `
    : `border: 1px solid transparent`};
  background: #f4f4f4;
  /* padding-top: 43px; */
  margin-bottom: -0.5px;
  color: #141c2a;
  font-size: 8px;
  font-weight: 400;
  &:-webkit-autofill {
    -webkit-transition: background-color 9999s ease-out;
    -webkit-text-fill-color: #141c2a !important;
  }
  ::placeholder {
    color: #bac2cc;
    font-size: 8px;
    font-weight: 400;
  }
  &:focus {
    ${isInformation
      ? `
      box-shadow: 0 0 0 1px #D73131 inset;
       border: 1px solid #D73131; 
      `
      : `box-shadow: 0 0 0 1px #FFA871 inset;`}
    border: 1px solid transparent;
    outline: none;
  }
`;

const btnWrap = (isActive: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  padding: 14px 0;
  border-radius: 8px;
  background: ${isActive ? "#FFA871" : "rgba(20, 28, 42, 0.40)"};
  border: 1px solid transparent;
  color: #fafcff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
`;

const dialogWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
  font-family: NanumGothic;
  font-size: 10px;
  font-weight: 700;
  img {
    width: 28px;
  }
`;
