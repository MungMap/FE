import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";
import { useAtom } from "jotai";
import {
  userLocateAtom,
  userZoomLevelAtom,
  userInLocateAtom,
  userIsSeachedAtom,
} from "../../hooks/atom/searchFilter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNearestParkData } from "../../api/useSearchPark";
import userIcon from "../../assets/user.png";
import { Dialog } from "@mui/material";
import walkSpotIcon from "../../assets/walkIcon.png";
import icon from "../../assets/dogIcon.png";

interface CustomMarker extends naver.maps.Marker {
  title?: string;
  address?: string;
  tel?: string;
  category?: string;
  area?: string;
}

const Map = ({
  mapRef,
  setIsNotLocation,
  initLatLngRef,
  useMakerList,
}: any) => {
  const [clickedItem, setClickedItem] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalInfo, setModalInfo] = useState<any>({});

  //* 검색어 검색 사용여부
  const [isSearching, setIsSearching] = useAtom(userIsSeachedAtom);

  //* 공원 마커 리스트
  const parkMakerList = useRef<naver.maps.Marker[]>([]);

  //* 사용자 위치 마커ui
  const userMarker = renderToStaticMarkup(
    <img style={{ zIndex: "99", position: "absolute" }} src={userIcon} alt="" />
  );

  //* 산책 위치 마커ui
  const walkMarker = renderToStaticMarkup(<img src={walkSpotIcon} alt="" />);

  //* 현재 지도상 위치
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);

  //* 현재 유저 위치
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);

  //* 현 지도에서 가까운 장소 안내 데이터
  const { data, refetch } = useNearestParkData({
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
    parkMakerList.current?.map((val) => val?.setMap(null));
    parkMakerList.current = data?.map((park: any) => {
      const parkLatLng = new naver.maps.LatLng(
        Number(park.위도),
        Number(park.경도)
      );
      const newMarker: CustomMarker = new naver.maps.Marker({
        position: parkLatLng,
        clickable: true,
        map: mapRef.current,
        title: park?.공원명,
        address: park?.소재지지번주소,
        tel: park?.전화번호,
        category: park?.공원구분,
        area: park?.공원면적,
        icon: {
          content: walkMarker,
        },
      } as any);
      parkMakerList.current.push(newMarker);
      naver.maps.Event.addListener(mapRef.current, "dragend", () => {
        if (mapRef.current !== null) {
          updateMarkers(mapRef.current, parkMakerList.current);
        }
      });
      naver.maps.Event.addListener(newMarker, "click", (e: any) => {
        setModalInfo({
          title: newMarker?.title,
          address: newMarker?.address,
          tel: newMarker?.tel,
          category: newMarker?.category,
          area: newMarker?.area,
        });
        setClickedItem(true);
      });
      return newMarker;
    });
  };

  //* 맵 랜더링
  const handlerMap = () => {
    initLatLngRef.current = new naver.maps.LatLng(
      Number(userInLocate.lat),
      Number(userInLocate.lng)
    );
    mapRef.current = new naver.maps.Map(mapRef.current, {
      center: initLatLngRef.current,
      zoom: 15, // 지도 확대 정도
      mapDataControl: false,
      tileSpare: 1,
      tileTransition: false,
    });
    // mapRef.current = map;

    const newUserMarker = new naver.maps.Marker({
      position: initLatLngRef.current,
      map: mapRef.current,
      title: "현재 위치",
      icon: {
        content: userMarker,
      },
    });
    useMakerList.current.push(newUserMarker);

    //* 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
    naver.maps.Event.addListener(mapRef?.current, "zoom_changed", () => {
      const zoomLevel = mapRef.current.getZoom();
      if (mapRef.current !== null) {
        updateMarkers(mapRef.current, parkMakerList.current);
      }
      //* 줌레벨 설정
      if (zoomLevel < 12) {
        mapRef.current.setZoom(12);
        setUserZoomLevel(true);
      }
    });
    //*  지도 드래그 시 마커 업데이트 이벤트 핸들러
    naver.maps.Event.addListener(mapRef.current, "dragend", () => {
      if (mapRef?.current !== null) {
        updateMarkers(mapRef?.current, parkMakerList.current);
      }
    });
    //* 지도의 중간 위도 경도 변경될때마다 기준 locate에 담기
    naver.maps.Event.addListener(mapRef.current, "idle", () => {
      const newCenter = mapRef.current?.getCenter();
      if (newCenter) {
        setUserLocate({ lat: newCenter.y, lng: newCenter.x });
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
    if (userInLocate.lat === 37.5206868) {
      setIsNotLocation(true);
      handlerMap();
    } else {
      handlerMap();
    }
  }, []);

  return (
    <>
      <div ref={mapRef} css={rootStyle}></div>
      <button
        css={locationBtn}
        onClick={() => {
          parkMarkers();
          setIsSearching(false);
        }}
      >
        <p>현 지도에서 찾기</p>
        <RestartAltIcon sx={{ fontSize: "20px" }} />
      </button>
      <Dialog
        open={clickedItem}
        onClose={() => setClickedItem(false)}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "306px",
            minWidth: "240px",
            padding: "31px 50px  24px 50px",
            borderRadius: "20px",
          },
        }}
      >
        <div css={dialogContent}>
          <div css={dialogWrap}>
            <img src={icon} alt="" />
            <p>{modalInfo?.title}</p>
          </div>
          <div css={dialogTextWrap}>
            <span>주소: {modalInfo?.address}</span>
            <span>문의: {modalInfo?.tel}</span>
            <span>구분: {modalInfo?.category}</span>
            <span>공원면적: {modalInfo?.area}</span>
          </div>
          <button onClick={() => setClickedItem(false)}>확인</button>
        </div>
      </Dialog>
    </>
  );
};

export default Map;

const rootStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  height: calc(60vh - 36px);
  min-width: 355px;
  max-width: 667px;
  background-color: #ffffff;
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

const dialogContent = css`
  display: flex;
  font-family: "NanumSquareNeo";
  font-size: 12px;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  img {
    width: 27px;
  }
  p {
    font-family: "NanumSquareNeoExtraBold";
    color: #3d3d3d;
  }
  span {
    font-family: "NanumSquareNeoRegular";
    color: #88888a;
  }
  button {
    font-family: "NanumSquareNeoExtraBold";
    background-color: #fcac7a;
    color: white;
    padding: 7px 30px;
    border-radius: 50px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const dialogWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
`;

const dialogTextWrap = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
`;

const rootLocateStyle = css`
  position: absolute;
  bottom: -5vh;
  width: 100%;
  max-width: 667px;
  background: #fcac7a;
  padding: 11px 17px;
  min-height: 5vh;
  max-height: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const textWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeoBold";
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  gap: 8px;
  span {
    font-family: "NanumSquareNeoExtraBold";
    font-weight: 700;
    color: #3d3d3d;
  }
`;

const btnWrapper = css`
  display: flex;
  font-family: "NanumSquareNeoBold";
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  background-color: #ffffff;
  border-radius: 50px;
  padding: 4px 11px 4px 14px;
  color: #ffa871;
  cursor: pointer;
`;
