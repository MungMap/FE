import React, { useEffect } from "react";
import { css } from "@emotion/react";
import HomeMenu from "../components/home/HomeMenu";
import Carousel from "../components/home/Carousel";
import Weather from "../components/home/Weather";
import Banner from "../components/home/Banner";

const Home = () => {
  return (
    <div css={rootStyle}>
      <Carousel />
      <div css={innerWrap}>
        <HomeMenu />
        <Weather />
        <Banner />
      </div>
    </div>
  );
};

export default Home;

const rootStyle = css`
  background: #f3f3f6;
  height: calc(100vh - 102px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const innerWrap = css`
  padding: 0 16px;
  padding-bottom: 40px;
`;
