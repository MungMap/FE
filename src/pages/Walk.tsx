import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";
import Map from "../components/common/Map";
import Search from "../components/common/Search";
import Location from "../components/common/Location";
import List from "../components/common/List";
import { Dialog } from "@mui/material";
import { useAtom } from "jotai";
import {
  userZoomLevelAtom,
  userLocateAtom,
  userInLocateAtom,
  useAddressAtom,
  userIsNotLocationAtom,
  userNearDataAtom,
  userIsMobileAtom,
} from "../hooks/atom/searchFilter";
import ModalInfo from "../components/walk/ModalInfo";
import walkSpotIcon from "../assets/walkIcon.png";

declare global {
  interface Window {
    ReactNativeWebView?: any;
    getReactNativeLocation?: any;
  }
}

const Walk = () => {
  const initLatLngRef = useRef<any>(null);
  const [introPage, setIntroPage] = useState<number>(0);
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);
  const [isNotLocation, setIsNotLocation] = useAtom(userIsNotLocationAtom);
  const [isWebView, setIsWebView] = useAtom(userIsMobileAtom);

  const [dataList, setDataList] = useAtom(userNearDataAtom);

  const [modalInfo, setModalInfo] = useState<any>({});

  const [clickedItem, setClickedItem] = useState<boolean>(false);

  //* 산책 위치 마커ui
  const walkMarker = renderToStaticMarkup(<img src={walkSpotIcon} alt="" />);

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
    if (isWebView) {
      window.addEventListener("message", function (event) {
        const data = JSON.parse(event.data);
        if (data.type === "location") {
          // 웹뷰에서 location 데이터를 받을 때, 데이터를 사용하여 상태 업데이트
          const { latitude, longitude } = data;

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
        }
      });
    } else {
      // 일반 웹 브라우저에서 받은 위치 정보 처리
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
    }
  };
  const handleError = (err: GeolocationPositionError) => {
    console.log("err", err);
    setIsNotLocation(true);
  };

  //* 현재 위치 가져오기
  const userLocationHandler = () => {
    if (isWebView) {
      // 웹뷰에서 실행 중일 때
      window.getReactNativeLocation?.();
    } else {
      // 일반 웹 브라우저에서 실행 중일 때
      geolocation.getCurrentPosition(handleSuccess, handleError);
    }
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
      <>
        <div css={MapWrap}>
          <Search mapRef={mapRef} />
          <Map
            mapRef={mapRef}
            setIsNotLocation={setIsNotLocation}
            initLatLngRef={initLatLngRef}
            useMakerList={useMakerList}
            setClickedItem={setClickedItem}
            setModalInfo={setModalInfo}
            itemMarker={walkMarker}
          />
        </div>
        <Location
          userMarkerMove={userMarkerMove}
          mapRef={mapRef}
          useMakerList={useMakerList}
        />
        <div css={listWrap}>
          <List
            mapRef={mapRef}
            data={dataList}
            setClickedItem={setClickedItem}
            setModalInfo={setModalInfo}
          />
        </div>
      </>
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
          <p>10km 이하의 장소만 표시합니다.</p>
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
      <Dialog
        open={clickedItem}
        onClose={() => setClickedItem(false)}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "306px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <ModalInfo setClickedItem={setClickedItem} modalInfo={modalInfo} />
      </Dialog>
    </div>
  );
};

export default Walk;

const MapWrap = css`
  position: relative;
  width: 100%;
  max-width: 667px;
  min-width: 355px;
  background-color: #ffffff;
  height: calc(60vh - 62px);
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
