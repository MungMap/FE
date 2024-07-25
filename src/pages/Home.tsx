import { useEffect, useState } from "react";
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
import { userZoomLevelAtom, userLocateAtom } from "../hooks/atom/searchFilter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Home = () => {
  const [introPage, setIntroPage] = useState<number>(0);
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const { geolocation } = navigator;
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
  };

  const handleError = (err: GeolocationPositionError) => {
    console.log("ddd", err);
  };

  const userLocationHandler = () => {
    geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  useEffect(() => {
    userLocationHandler();
  }, []);

  return (
    <div css={rootStyle}>
      {/* {introPage === 0 ? (
        <Intro1 />
      ) : introPage === 1 ? (
        <Intro />
      ) : ( */}
      <div css={MapWrap}>
        <Search />
        {userLocate?.lat && <Map />}
        {/* <button css={locationBtn}>
          <p>현 위치에서 찾기</p>
          <RestartAltIcon sx={{ fontSize: "20px" }} />
        </button> */}
        <Location />
      </div>
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
  min-height: 505px;
  height: 60vh;
`;
const listWrap = css`
  display: block;
  width: 100%;
  max-width: 667px;
  height: 40vh;
  background-color: #ffffff;
  padding-top: 40px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    border-radius: 24px;
    width: 8px;
    height: 6px;
    margin-left: 4px;
    padding-top: 70px;
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
