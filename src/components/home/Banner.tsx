import { css } from "@emotion/react";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";

const Banner = () => {
  const bannerList = [
    { no: 0, src: banner1, path: "/walk" },
    { no: 1, src: banner2, path: "/medical" },
    { no: 2, src: banner3, path: "/walk" },
  ];
  return (
    <div css={rootStyle}>
      {bannerList.map((banner, idx) => (
        <img key={idx} src={banner.src} alt="" />
      ))}
    </div>
  );
};

export default Banner;

const rootStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 18px;
  img {
    width: 100%;
  }
`;
