import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import Map from "../components/walk/Map";
import logo from "../assets/mainCi.png";
import Intro1 from "../components/Intro1";
import Intro from "../components/Intro";
import Search from "../components/walk/Search";
import Location from "../components/walk/Location";
import List from "../components/walk/List";
import { Dialog } from "@mui/material";
import { useAtom } from "jotai";
import {
  userZoomLevelAtom,
  userLocateAtom,
  userInLocateAtom,
  useAddressAtom,
  userIsNotLocationAtom,
} from "../hooks/atom/searchFilter";

const Walk = () => {
  const initLatLngRef = useRef<any>(null);
  const [introPage, setIntroPage] = useState<number>(0);
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);
  const [isNotLocation, setIsNotLocation] = useAtom(userIsNotLocationAtom);
  //* 유저 리스트
  const useMakerList = useRef<naver.maps.Marker[]>([]);

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
    if (userInLocate?.lat) {
      const user = new naver.maps.LatLngBounds(
        new naver.maps.LatLng(
          Number(userInLocate?.lat) + 0.002,
          Number(userInLocate?.lng) + 0.002
        ),
        new naver.maps.LatLng(
          Number(userInLocate?.lat) - 0.002,
          Number(userInLocate?.lng) - 0.002
        )
      );
      mapRef.current.panToBounds(user);
    }
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
    <div>
      {/* {introPage === 0 ? (
        <Intro1 />
      ) : introPage === 1 ? (
        <Intro />
      ) : ( */}
      <>
        <div css={MapWrap}>
          <Search mapRef={mapRef} />
          {/* {userInLocate?.lat && <Map mapRef={mapRef} />} */}
          <Map
            mapRef={mapRef}
            setIsNotLocation={setIsNotLocation}
            initLatLngRef={initLatLngRef}
            useMakerList={useMakerList}
          />
        </div>

        <Location
          userMarkerMove={userMarkerMove}
          mapRef={mapRef}
          useMakerList={useMakerList}
        />

        <div css={listWrap}>
          <List mapRef={mapRef} />
        </div>
      </>
      {/* )} */}
      {/* <div css={ciWrapper}>
        <img src={logo} alt="logo" />
      </div> */}
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
      <Dialog
        open={isNotLocation}
        onClose={() => setIsNotLocation(false)}
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
          <p>기본장소로 설정됩니다.</p>
          <button onClick={() => setIsNotLocation(false)}>확인</button>
        </div>
      </Dialog>
    </div>
  );
};

export default Walk;

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
  height: calc(60vh - 36px);
`;
const listWrap = css`
  /* display: block; */
  position: absolute;
  bottom: 46px;
  width: 100%;
  max-width: 667px;
  height: calc(35vh - 46px);
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
