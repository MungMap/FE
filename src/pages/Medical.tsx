import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";
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
  userSeachTextAtom,
  userNearMedicalDataAtom,
} from "../hooks/atom/searchFilter";
import ModalInfo from "../components/walk/ModalInfo";
import medicalIcon from "../assets/medicalIcon.png";
import MedicalMap from "../components/medical/MedicalMap";

const Medical = () => {
  const initLatLngRef = useRef<any>(null);
  const [nearMedicalData, setNearMedicalData] = useAtom(
    userNearMedicalDataAtom
  );
  const [introPage, setIntroPage] = useState<number>(0);
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);
  const [isNotLocation, setIsNotLocation] = useAtom(userIsNotLocationAtom);
  const [modalInfo, setModalInfo] = useState<any>({});

  const [clickedItem, setClickedItem] = useState<boolean>(false);

  //* 병원위치 마커ui
  const medicalMarker = renderToStaticMarkup(<img src={medicalIcon} alt="" />);

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
      <>
        <div css={MapWrap}>
          <Search mapRef={mapRef} />
          <MedicalMap
            mapRef={mapRef}
            setIsNotLocation={setIsNotLocation}
            initLatLngRef={initLatLngRef}
            useMakerList={useMakerList}
            setClickedItem={setClickedItem}
            setModalInfo={setModalInfo}
            itemMarker={medicalMarker}
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
            data={nearMedicalData}
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

export default Medical;

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
