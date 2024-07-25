import { css } from "@emotion/react";
import intro from "../assets/introImg1.png";
import logoImg from "../assets/logo.png";
import logo from "../assets/mainCi.png";

const Intro1 = () => {
  return (
    <div css={rootStyle(intro)}>
      <img css={logoImgWrap} src={logoImg} alt="logo" />
      <img css={ciWrap} src={logo} alt="logo" />
    </div>
  );
};

export default Intro1;

const rootStyle = (intro: any) => css`
  position: relative;
  width: 100%;
  max-width: 667px;
  min-height: 100vh;
  background-image: url(${intro});
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
`;

const logoImgWrap = css`
  position: absolute;
  width: 40%;
  top: 103px;
  left: 43px;
`;

const ciWrap = css`
  position: absolute;
  width: 80px;
  bottom: 33px;
  left: 50%;
  transform: translateX(-50%);
`;
