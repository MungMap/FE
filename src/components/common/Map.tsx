import { useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";
import { useAtom } from "jotai";
import {
  userLocateAtom,
  userZoomLevelAtom,
  userInLocateAtom,
  userIsSeachedAtom,
  userNearDataAtom,
} from "../../hooks/atom/searchFilter";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import userIcon from "../../assets/user.png";
import { useNearWalkData } from "../../api/useSupabase";

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
  setClickedItem,
  setModalInfo,
  itemMarker,
}: any) => {
  //* 검색어 검색 사용여부

  const userLat = sessionStorage.getItem("userLat");
  const userLng = sessionStorage.getItem("userLng");

  //* 데이터
  const [dataList, setDataList] = useAtom(userNearDataAtom);
  const [isSearching, setIsSearching] = useAtom(userIsSeachedAtom);

  //* 공원 마커 리스트
  const parkMakerList = useRef<naver.maps.Marker[]>([]);

  //* 사용자 위치 마커ui
  const userMarker = renderToStaticMarkup(
    <img style={{ zIndex: "99", position: "absolute" }} src={userIcon} alt="" />
  );

  //* 현재 지도상 위치
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);

  //* 현재 유저 위치
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);

  //* 현 지도에서 가까운 장소 안내 데이터
  const handleNearData = async () => {
    const response = await useNearWalkData({
      lat: userLocate?.lat,
      lng: userLocate?.lng,
      radius: 7,
      param: "공원,관광지",
    });
    if (response.status === 200) {
      const data = response?.data;
      setDataList(data);
    } else {
      console.error("Error fetching data:", response.statusText);
    }
  };

  //* 줌레벨 10km제안 팝업여부
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
    parkMakerList.current?.map((val) => val?.setMap(null));
    parkMakerList.current = dataList?.map((item: any) => {
      const parkLatLng = new naver.maps.LatLng(
        Number(item.lat),
        Number(item.lng)
      );
      const newMarker: CustomMarker = new naver.maps.Marker({
        position: parkLatLng,
        clickable: true,
        map: mapRef.current,
        title: item?.title,
        address: item?.address,
        tel: item?.tel,
        oper_time: item?.oper_time,
        pet_size: item?.pet_size,
        pet_limit: item?.pet_limit,
        category: item?.category,
        info: item?.info,
        id: item?.id,
        icon: {
          content: itemMarker,
        },
      } as any);
      parkMakerList.current.push(newMarker);
      naver.maps.Event.addListener(mapRef.current, "dragend", () => {
        if (mapRef.current !== null) {
          updateMarkers(mapRef.current, parkMakerList.current);
        }
      });
      naver.maps.Event.addListener(newMarker, "click", (e: any) => {
        setModalInfo(newMarker);
        setClickedItem(true);
      });
      return newMarker;
    });
  };

  //* 맵 랜더링
  const handlerMap = () => {
    handleNearData();
    initLatLngRef.current = new naver.maps.LatLng(
      Number(userInLocate.lat),
      Number(userInLocate.lng)
    );
    mapRef.current = new naver.maps.Map(mapRef.current, {
      center: initLatLngRef.current,
      zoom: 11, // 지도 확대 정도
      mapDataControl: false,
      tileSpare: 1,
      tileTransition: false,
    });
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
      if (zoomLevel < 10) {
        mapRef.current.setZoom(10);
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
  };

  useEffect(() => {
    if (dataList?.length) {
      parkMarkers();
    }
  }, [dataList]);

  useEffect(() => {
    if (!userLat) {
      setIsNotLocation(true);
      handlerMap();
    } else {
      setUserInLocate({
        lat: Number(userLat),
        lng: Number(userLng),
      });
      handlerMap();
    }
  }, []);

  return (
    <>
      <div ref={mapRef} css={rootStyle}></div>
      <button
        css={locationBtn}
        onClick={() => {
          handleNearData();
          parkMarkers();
          setIsSearching(false);
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
