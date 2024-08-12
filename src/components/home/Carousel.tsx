import React from "react";
import { css } from "@emotion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/carousel/carousel1.png";
import img2 from "../../assets/carousel/carousel2.png";
import img3 from "../../assets/carousel/carousel3.png";
import img4 from "../../assets/carousel/carousel4.png";
import img5 from "../../assets/carousel/carousel5.png";

const Carousel = () => {
  const carouselList = [
    { no: 0, src: img1 },
    { no: 1, src: img2 },
    { no: 2, src: img3 },
    { no: 3, src: img4 },
    { no: 4, src: img5 },
  ];
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
  };
  return (
    <div css={carousel}>
      <Slider {...settings}>
        {carouselList.map((item) => (
          <div key={item.no}>
            <img src={item.src} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

const carousel = css`
  width: 100%;
  margin: 0 auto;
  /* height: 175px; */
  .slick-slide img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .slick-list {
    overflow: hidden;
  }
`;
