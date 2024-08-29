import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import {
  userInLocateAtom,
  userLocateAtom,
  userIsNotLocationAtom,
  useAddressAtom,
} from "../../hooks/atom/searchFilter";
import { useWeatherData } from "../../api/useWeather";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";

const Weather = () => {
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [isNotLocation, setIsNotLocation] = useAtom(userIsNotLocationAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);

  const weatherDescKo = [
    { 201: "가벼운 비를 동반한 천둥구름" },
    { 200: "비를 동반한 천둥구름" },
    { 202: "폭우를 동반한 천둥구름" },
    { 210: "약한 천둥구름" },
    { 211: "천둥구름" },
    { 212: "강한 천둥구름" },
    { 221: "불규칙적 천둥구름" },
    { 230: "약한 연무를 동반한 천둥구름" },
    { 231: "연무를 동반한 천둥구름" },
    { 232: "강한 안개비를 동반한 천둥구름" },
    { 300: "가벼운 안개비" },
    { 301: "안개비" },
    { 302: "강한 안개비" },
    { 310: "가벼운 적은비" },
    { 311: "적은비" },
    { 312: "강한 적은비" },
    { 313: "소나기와 안개비" },
    { 314: "강한 소나기와 안개비" },
    { 321: "소나기" },
    { 500: "악한 비" },
    { 501: "중간 비" },
    { 502: "강한 비" },
    { 503: "매우 강한 비" },
    { 504: "극심한 비" },
    { 511: "우박" },
    { 520: "약한 소나기 비" },
    { 521: "소나기 비" },
    { 522: "강한 소나기 비" },
    { 531: "불규칙적 소나기 비" },
    { 600: "가벼운 눈" },
    { 601: "눈" },
    { 602: "강한 눈" },
    { 611: "진눈깨비" },
    { 612: "소나기 진눈깨비" },
    { 615: "약한 비와 눈" },
    { 616: "비와 눈" },
    { 620: "약한 소나기 눈" },
    { 621: "소나기 눈" },
    { 622: "강한 소나기 눈" },
    { 701: "박무" },
    { 711: "연기" },
    { 721: "연무" },
    { 731: "모래 먼지" },
    { 741: "안개" },
    { 751: "모래" },
    { 761: "먼지" },
    { 762: "화산재" },
    { 771: "돌풍" },
    { 781: "토네이도" },
    { 800: "구름 한 점 없는 맑은 하늘" },
    { 801: "약간의 구름이 낀 하늘" },
    { 802: "드문드문 구름이 낀 하늘" },
    { 803: "구름이 거의 없는 하늘" },
    { 804: "구름으로 뒤덮인 흐린 하늘" },
    { 900: "토네이도" },
    { 901: "태풍" },
    { 902: "허리케인" },
    { 903: "한랭" },
    { 904: "고온" },
    { 905: "바람부는" },
    { 906: "우박" },
    { 951: "바람이 거의 없는" },
    { 952: "약한 바람" },
    { 953: "부드러운 바람" },
    { 954: "중간 세기 바람" },
    { 955: "신선한 바람" },
    { 956: "센 바람" },
    { 957: "돌풍에 가까운 센 바람" },
    { 958: "돌풍" },
    { 959: "심각한 돌풍" },
    { 960: "폭풍" },
    { 961: "강한 폭풍" },
    { 962: "허리케인" },
  ];

  const { data: weatherData, refetch } = useWeatherData(
    userInLocate?.lat,
    userInLocate?.lng
  );

  const weatherId = weatherData?.weather?.[0]?.id;
  const weatherDesc = weatherDescKo.find((desc) => desc[weatherId])?.[
    weatherId
  ];

  const { geolocation } = navigator;

  //* 현재 내위치 주소
  const addressChangeHandler = () => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(
          Number(userInLocate.lat),
          Number(userInLocate.lng)
        ),
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        }
        setUserAddress(response?.v2.results[0].region.area3.name);
      }
    );
  };

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

    sessionStorage.setItem("userLat", JSON.stringify(latitude));
    sessionStorage.setItem("userLng", JSON.stringify(longitude));
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
      addressChangeHandler();
    }
  }, [userInLocate?.lat]);

  return (
    <div css={rootStyle}>
      <span css={title}>오늘의 날씨</span>
      <div css={innerWrap}>
        <div css={weatherWrap}>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
            alt=""
          />
          <div>
            <p>설정위치:{userAddress}</p>
            <p>날씨상태: {weatherDesc}</p>
            <p>습도: {weatherData?.main?.humidity}%</p>
          </div>
        </div>
        <div css={weatherWrap}>
          <ThermostatRoundedIcon sx={{ color: "#929191" }} />
          <div>
            <p>현재기온: {weatherData?.main?.temp}°C</p>
            <p>최저기온: {weatherData?.main?.temp_min}°C</p>
            <p>최고기온: {weatherData?.main?.temp_max}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

const rootStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 28px;
`;

const innerWrap = css`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

const weatherWrap = css`
  width: 100%;
  padding: 14px 10px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  font-size: 8px;
  font-weight: 300;
  line-height: normal;
  color: #3d3d3d;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06);
  img {
    width: 40px;
    height: auto;
  }
`;

const title = css`
  color: #9899be;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 4px;
  margin-left: 4px;
`;
