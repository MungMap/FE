import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import {
  userLocateAtom,
  userZoomLevelAtom,
  userInLocateAtom,
} from "../hooks/atom/searchFilter";
// import { parkData } from "../utils/useData";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNearestParkData } from "../api/useSearchPark";
// import useGeolocation from "../hooks/useGeolocation";

const Map = () => {
  //* 지도표시 ref
  const mapRef = useRef<any>(null);

  //* 공원 마커 리스트
  const parkMakerList: naver.maps.Marker[] = [];

  //* 현재 지도상 위치
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);

  //* 현재 유저 위치
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);

  //* 현 지도에서 가까운 장소 안내 데이터
  const { data, refetch, isLoading, isFetched } = useNearestParkData({
    lat: userLocate?.lat,
    lon: userLocate?.lng,
    radius: 1,
  });

  //* 줌레벨 3km제안 팝업여부
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);

  //* 마커 표시 함수
  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    marker.setMap(map);
  };

  //* 마커 숨김 함수
  const hideMarker = (marker: naver.maps.Marker) => {
    marker.setMap(null);
  };

  //* 마커 업데이트 유/무 판별 함수
  const updateMarkers = (
    map: naver.maps.Map,
    parkMakerList: naver.maps.Marker[]
  ) => {
    const mapBounds: any = map.getBounds();

    for (let i = 0; i < parkMakerList.length; i++) {
      const position = parkMakerList[i].getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, parkMakerList[i]);
      } else {
        hideMarker(parkMakerList[i]);
      }
    }
  };

  //*현 지도 공원마커 찍기
  const parkMarkers = () => {
    refetch();
    data?.forEach((park: any) => {
      const parkLatLng = new naver.maps.LatLng(
        Number(park.위도),
        Number(park.경도)
      );
      const newMarker = new naver.maps.Marker({
        position: parkLatLng,
        map: mapRef.current,
        title: park.공원명,
      });
      parkMakerList.push(newMarker);
      naver.maps.Event.addListener(mapRef.current, "dragend", () => {
        if (mapRef.current !== null) {
          updateMarkers(mapRef.current, parkMakerList);
        }
      });
      naver.maps.Event.addListener(newMarker, "click", (e) => {
        console.log("marker clicked", newMarker, e);
      });
    });
    // });
  };

  //* 맵 랜더링
  const handlerMap = () => {
    const initLatLng = new naver.maps.LatLng(
      Number(userInLocate.lat),
      Number(userInLocate.lng)
    );
    const map = new naver.maps.Map(mapRef.current, {
      center: initLatLng,
      zoom: 17, // 지도 확대 정도
      mapDataControl: false,
      tileSpare: 1,
      tileTransition: false,
    });
    mapRef.current = map;

    new naver.maps.Marker({
      position: initLatLng,
      map: mapRef.current,
      title: "현재 위치",
    });
    //* 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
    naver.maps.Event.addListener(mapRef?.current, "zoom_changed", () => {
      if (mapRef.current !== null) {
        updateMarkers(mapRef.current, parkMakerList);
      }
    });
    //*  지도 드래그 시 마커 업데이트 이벤트 핸들러
    naver.maps.Event.addListener(mapRef.current, "dragend", () => {
      if (mapRef?.current !== null) {
        updateMarkers(mapRef?.current, parkMakerList);
      }
    });
    //* 지도의 중간 위도 경도 변경될때마다 기준 locate에 담기
    naver.maps.Event.addListener(mapRef.current, "idle", () => {
      const newBounds = mapRef.current?.getCenter();
      if (newBounds) {
        setUserLocate({ lat: newBounds.y, lng: newBounds.x });
      }
    });
    //*  Zoom limit 설정
    naver.maps.Event.addListener(mapRef.current, "zoom_changed", () => {
      const zoomLevel = mapRef.current.getZoom();
      //* 줌레벨 3km까지
      if (zoomLevel < 12) {
        mapRef.current.setZoom(12);
        setUserZoomLevel(true);
      }
    });
    refetch();
  };

  useEffect(() => {
    if (data?.length) {
      parkMarkers();
    }
  }, [data]);

  useEffect(() => {
    handlerMap();
  }, []);

  return (
    <>
      <div ref={mapRef} css={rootStyle}></div>
      <button
        css={locationBtn}
        onClick={() => {
          parkMarkers();
        }}
      >
        <p>현 지도에서 찾기</p>
        <RestartAltIcon sx={{ fontSize: "20px" }} />
      </button>
    </>
  );
};

export default Map;

const rootStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60vh;
  min-height: 505px;
  max-width: 667px;
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
