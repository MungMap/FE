import { useState } from "react";
import { css } from "@emotion/react";
import { createClient } from "@supabase/supabase-js";
import icon from "../../assets/dogIcon.png";
import { Dialog } from "@mui/material";

const SignUp = ({ setIsClickedPolicy, setIsClickedPrivacy }: any) => {
  const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
  const serviceRoleKey = import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isServiceAgreed, setIsServiceAgreed] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword && isServiceAgreed) {
      setIsConfirm(true);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          email: email,
          user_name: name,
          full_name: name,
          avatar_url: null,
        },
      },
    });
    if (error) {
      alert(error.message);
    } else {
      setIsSignUp(true);
    }
  };
  return (
    <>
      <form css={modalWrapper} onSubmit={handleSignUp}>
        <div css={dialogWrap}>
          <img src={icon} alt="" />
          <p>회원가입</p>
        </div>
        <div css={inputWrapperStyles}>
          <span css={labelStyles}>이름(닉네임)</span>
          <input
            css={topInputStyles(false)}
            type="text"
            value={name}
            placeholder="이름(닉네임)을 입력하세요"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div css={inputWrapperStyles}>
          <span css={labelStyles}>이메일(아이디)</span>
          <input
            css={topInputStyles(false)}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
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
        <div css={inputWrapperStyles}>
          <span css={labelStyles}>비밀번호 확인</span>
          <input
            css={topInputStyles(false)}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한번 더 입력해주세요"
            required
          />
        </div>
        {isConfirm && <div>비밀번호가 일치하지 않습니다.</div>}
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
        <button
          css={btnWrap(
            !!name &&
              !!email &&
              !!password &&
              !!confirmPassword &&
              isServiceAgreed
          )}
          type="submit"
        >
          가입하기
        </button>
      </form>
      <Dialog
        open={isSignUp}
        onClose={() => setIsSignUp(false)}
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
          <p>
            회원가입이 완료되었습니다.
            <br />
            로그인 후 서비스를 이용하세요.
          </p>
          <button onClick={() => setIsSignUp(false)}>확인</button>
        </div>
      </Dialog>
    </>
  );
};

export default SignUp;

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

const checkboxStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  gap: 6px;
  font-family: NanumGothic;
  font-size: 7px;
  font-weight: bold;
  line-height: small;
  color: #494949;
  text-align: center;
  margin-bottom: 20px;
  span {
    color: #fcac7a;
  }
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
