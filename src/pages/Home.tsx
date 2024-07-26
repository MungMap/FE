import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import Map from "../components/Map";
import logo from "../assets/mainCi.png";
// import Intro1 from "../components/Intro1";
// import Intro from "../components/Intro";
import Search from "../components/Search";
import Location from "../components/Location";
import List from "../components/List";
import { Dialog } from "@mui/material";
import { useAtom } from "jotai";
import {
  userZoomLevelAtom,
  userLocateAtom,
  userInLocateAtom,
  useAddressAtom,
} from "../hooks/atom/searchFilter";

const Home = () => {
  const [introPage, setIntroPage] = useState<number>(0);
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);

  const { geolocation } = navigator;

  //* 지도표시 ref
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (introPage < 2) {
      const timer = setTimeout(() => {
        setIntroPage((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [introPage]);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    // const bounds = mapRef.current.getBounds();
    // console.log("bounds ", bounds._sw);
    setUserLocate({
      ...userLocate,
      lat: latitude,
      lng: longitude,
    });
    setUserInLocate({
      ...userInLocate,
      lat: latitude,
      lng: longitude,
      // sw: bounds._sw,
      // ne: bounds._ne,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    console.log("ddd", err);
  };

  //* 현재 위치 가져오기
  const userLocationHandler = () => {
    geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  // useEffect(() => {
  //   console.log("userLocate", userInLocate);
  // }, [userInLocate]);

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
        setUserAddress(response.v2.address.jibunAddress);
      }
    );
  };

  //* 현재 내위치로 이동
  const userMarkerMove = () => {
    if (userInLocate?.sw?.x) {
      console.log("userInLocate?.sw?.x", userInLocate?.sw?.x);
      const user = new naver.maps.LatLngBounds(
        new naver.maps.LatLng(
          Number(userInLocate?.sw?.x),
          Number(userInLocate?.sw?.y)
        ),
        new naver.maps.LatLng(
          Number(userInLocate?.ne?.x),
          Number(userInLocate?.ne?.y)
        )
      );
      mapRef.current.panToBounds(user);
    }

    // const user = new naver.maps.LatLngBounds(
    //   new naver.maps.LatLng(37.2380651, 131.8562652),
    //   new naver.maps.LatLng(37.2444436, 131.8786475)
    // );

    // const bounds = mapRef.current.getBounds();

    // console.log("bounds", bounds);

    // const map = new naver.maps.Map(mapRef.current, {
    //   center: new naver.maps.LatLng(
    //     Number(userInLocate?.lat),
    //     Number(userInLocate?.lng)
    //   ),
    //   zoom: 14,
    // });

    // mapRef.current.setZoom(15);
  };

  useEffect(() => {
    userLocationHandler();
  }, []);

  useEffect(() => {
    if (userInLocate.lat) {
      addressChangeHandler();
    }
  }, [userInLocate]);

  return (
    <div css={rootStyle}>
      {/* {introPage === 0 ? (
        <Intro1 />
      ) : introPage === 1 ? (
        <Intro />
      ) : ( */}
      <div css={MapWrap}>
        <Search />
        {userInLocate?.lat && (
          <Map mapRef={mapRef} userLocationHandler={userLocationHandler} onL />
        )}
      </div>

      <Location
        userLocationHandler={userLocationHandler}
        addressChangeHandler={addressChangeHandler}
        userMarkerMove={userMarkerMove}
      />

      <div css={listWrap}>
        <List />
      </div>
      {/* )} */}
      <div css={ciWrapper}>
        <img src={logo} alt="logo" />
      </div>
      <Dialog
        open={userZoomLevel}
        onClose={() => setUserZoomLevel(false)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "444px",
            minWidth: "240px",
            padding: "14px",
            borderRadius: "12px",
          },
        }}
      >
        <div css={dialogContent}>
          <p>3km 이하의 장소만 표시합니다.</p>
          <button onClick={() => setUserZoomLevel(false)}>확인</button>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;

const rootStyle = css`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #9899be;
  height: 100vh;
  overflow: hidden;
`;

const ciWrapper = css`
  display: block;
  position: absolute;
  bottom: 20px;
  right: 2%;
  img {
    width: 80px;
  }
  @media screen and (max-width: 677px) {
    display: none;
  }
`;

const MapWrap = css`
  position: relative;
  width: 100%;
  max-width: 667px;
  min-width: 355px;
  background-color: #ffffff;
  height: 60vh;
`;
const listWrap = css`
  /* display: block; */
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 667px;
  height: 35vh;
  background-color: #ffffff;
  /* margin-top: 5vh; */
  overflow-y: scroll;
  scroll-margin-block-start: 20px;
  ::-webkit-scrollbar {
    border-radius: 24px;
    width: 8px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 23px;
    background-color: #fcac7a;
  }
  ::-webkit-scrollbar-track {
    border-radius: 20px;
    background-color: #ffffff;
  }
`;

const dialogContent = css`
  display: flex;
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

const locationBtn = css`
  position: absolute;
  bottom: 50px;
  font-family: "NanumSquareNeoBold";
  font-size: 12px;
  right: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffa871;
  color: #ffffff;
  border-radius: 50px;
  padding: 4px 11px 4px 14px;
  border: none;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
