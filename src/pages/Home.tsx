import React, { useEffect } from "react";
import { css } from "@emotion/react";
import HomeMenu from "../components/home/HomeMenu";
import Carousel from "../components/home/Carousel";
import { useAtom } from "jotai";
import {
  userInLocateAtom,
  userLocateAtom,
  userIsNotLocationAtom,
} from "../hooks/atom/searchFilter";
import { useWeatherData } from "../api/useWeather";

const Home = () => {
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [isNotLocation, setIsNotLocation] = useAtom(userIsNotLocationAtom);

  const { data: weatherData, refetch } = useWeatherData(
    userInLocate?.lat,
    userInLocate?.lng
  );

  const { geolocation } = navigator;

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setUserLocate({
      ...userLocate,
      lat: latitude,
      lng: longitude,
    });
    setUserInLocate({
      ...userInLocate,
      lat: latitude,
      lng: longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    console.log("err", err);
    setIsNotLocation(true);
  };

  //* 현재 위치 가져오기
  const userLocationHandler = () => {
    geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  useEffect(() => {
    userLocationHandler();
  }, []);

  useEffect(() => {
    if (userInLocate?.lat) {
      refetch();
    }
  }, [userInLocate?.lat]);

  useEffect(() => {
    console.log("weatherData", weatherData);
  }, [weatherData]);

  return (
    <div css={rootStyle}>
      <Carousel />
      <div css={innerWrap}>
        <HomeMenu />
      </div>
    </div>
  );
};

export default Home;

const rootStyle = css`
  background: #f3f3f6;
  min-height: 100vh;
`;
const innerWrap = css`
  padding: 0 16px;
`;
