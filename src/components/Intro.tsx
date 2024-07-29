import { css } from "@emotion/react";
import logo from "../assets/mainCi.png";

const Intro = () => {
  return (
    <div css={rootStyle}>
      <div css={ciWrap}>
        <img src={logo} alt="logo" />
        <p>우리집 댕댕이의 산책 장소를 빠르게 찾아보세요!</p>
      </div>
    </div>
  );
};

export default Intro;

const rootStyle = css`
  position: relative;
  width: 100%;
  max-width: 667px;
  min-height: 100vh;
  background: #fcac7a;
  animation: fadeIn 1s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ciWrap = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  img {
    width: 156px;
  }
  p {
    color: white;
  }
`;
