import React from "react";
import { css } from "@emotion/react";
import NavBar from "../components/home/NavBar";
import Carousel from "../components/home/Carousel";

const Home = () => {
  return (
    <div css={rootStyle}>
      <NavBar />
      <Carousel />
    </div>
  );
};

export default Home;

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
