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
  userSeachTextAtom,
} from "../hooks/atom/searchFilter";
import { useNearestParkData, useSearchParkData } from "../api/useSearchPark";
import ModalInfo from "../components/walk/ModalInfo";
import travelIcon from "../assets/travelIcon.png";
import travelImg from "../assets/travelMainImg.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { fetchFilteredData, ISearchParams } from "../supabase/useSupabase";
import SearchList from "../components/travel/SearchList";

const Travel = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    category: "펜션",
    searchText: "양양군",
    page: 1,
    pageSize: 30,
  });
  const [searchTravelData, setSearchTravelData] = useState<any[]>();
  const initLatLngRef = useRef<any>(null);
  const [introPage, setIntroPage] = useState<number>(0);
  const [userZoomLevel, setUserZoomLevel] = useAtom(userZoomLevelAtom);
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);
  const [isNotLocation, setIsNotLocation] = useAtom(userIsNotLocationAtom);
  const [searchText, setSearchText] = useAtom(userSeachTextAtom);
  const [modalInfo, setModalInfo] = useState<any>({});

  const [clickedItem, setClickedItem] = useState<boolean>(false);

  //* 여행장소위치 마커ui
  const travelMarker = renderToStaticMarkup(<img src={travelIcon} alt="" />);

  //* 유저 리스트
  const useMakerList = useRef<naver.maps.Marker[]>([]);

  const { geolocation } = navigator;

  //* 산책공원 검색 데이터
  const { data: searchData, isLoading: searchDataIsLoading } =
    useSearchParkData(searchText);

  //* 산책공원 주변 데이터
  const { data, isLoading } = useNearestParkData({
    lat: userLocate?.lat,
    lon: userLocate?.lng,
    radius: 1,
  });

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
    setSearchText("");
    // fetchFilteredData("");
  }, []);

  useEffect(() => {
    if (userInLocate.lat) {
      addressChangeHandler();
    }
  }, [userInLocate]);

  const handleSearch = async () => {
    const response = await fetchFilteredData(searchParams);
    if (response.status === 200) {
      const data = response?.data;
      setSearchTravelData(data);
    } else {
      console.error("Error fetching data:", response.statusText);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
      <div css={rootStyle}>
        <div css={backImgWrap(travelImg)}>
          <div className="textWrap">
            <div>
              <p className="title">
                여행지를
                <br />
                검색해보세요.
              </p>
              <p className="titleDesc">
                우리 댕댕이와 함께 떠나고싶은 지역을 검색하고 추억을 쌓아보세요.
              </p>
            </div>
            <div className="desc">
              최초 검색지는 '양양'입니다.검색 하고싶은 지역을 검색 후 '찾기'
              클릭 시 위치 정보가 표기됩니다.
            </div>
          </div>
        </div>
        <div css={searchStyle}>
          <div css={searchWrap}>
            <LocationOnIcon
              sx={{
                fontSize: "24px",
                color: "#FCAC7A",
              }}
            />
            <input
              type="text"
              css={searchInputWrap}
              placeholder="지역을 검색하세요.(ex. 강원도 양양)"
              value={searchParams.searchText}
              maxLength={15}
              onChange={(e) => {
                const val = e.target.value;
                setSearchParams({
                  ...searchParams,
                  searchText: val,
                });
              }}
              onKeyPress={(e) => {
                handleKeyPress(e);
              }}
            />
          </div>
          <button
            css={searchBtnWrap}
            onClick={() => {
              handleSearch();
            }}
          >
            <LocationSearchingIcon
              sx={{ fontSize: "24px", color: "#ffffff" }}
            />
          </button>
        </div>
        <SearchList
          data={searchTravelData}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </>
    // <div>
    //   <>
    //     <div css={MapWrap}>
    //       <Search mapRef={mapRef} />
    //       <Map
    //         mapRef={mapRef}
    //         setIsNotLocation={setIsNotLocation}
    //         initLatLngRef={initLatLngRef}
    //         useMakerList={useMakerList}
    //         setClickedItem={setClickedItem}
    //         setModalInfo={setModalInfo}
    //         itemMarker={travelMarker}
    //       />
    //     </div>
    //     <Location
    //       userMarkerMove={userMarkerMove}
    //       mapRef={mapRef}
    //       useMakerList={useMakerList}
    //     />
    //     <div css={listWrap}>
    //       <List
    //         mapRef={mapRef}
    //         searchData={searchData}
    //         isLoading={isLoading}
    //         searchDataIsLoading={searchDataIsLoading}
    //         data={data}
    //         setClickedItem={setClickedItem}
    //         setModalInfo={setModalInfo}
    //         modalInfo={modalInfo}
    //       />
    //     </div>
    //   </>
    //   <Dialog
    //     open={userZoomLevel}
    //     onClose={() => setUserZoomLevel(false)}
    //     sx={{
    //       "& .MuiDialog-paper": {
    //         maxWidth: "444px",
    //         minWidth: "240px",
    //         padding: "14px",
    //         borderRadius: "12px",
    //       },
    //     }}
    //   >
    //     <div css={dialogContent}>
    //       <p>3km 이하의 장소만 표시합니다.</p>
    //       <button onClick={() => setUserZoomLevel(false)}>확인</button>
    //     </div>
    //   </Dialog>
    //   <Dialog
    //     open={isNotLocation}
    //     onClose={() => setIsNotLocation(false)}
    //     sx={{
    //       "& .MuiDialog-paper": {
    //         maxWidth: "444px",
    //         minWidth: "240px",
    //         padding: "14px",
    //         borderRadius: "12px",
    //       },
    //     }}
    //   >
    //     <div css={dialogContent}>
    //       <p>기본장소로 설정됩니다.</p>
    //       <button onClick={() => setIsNotLocation(false)}>확인</button>
    //     </div>
    //   </Dialog>
    //   <Dialog
    //     open={clickedItem}
    //     onClose={() => setClickedItem(false)}
    //     sx={{
    //       "& .MuiDialog-paper": {
    //         minWidth: "306px",
    //         padding: "31px 50px  24px 50px",
    //         borderRadius: "20px",
    //       },
    //     }}
    //   >
    //     <ModalInfo setClickedItem={setClickedItem} modalInfo={modalInfo} />
    //   </Dialog>
    // </div>
  );
};

export default Travel;

const rootStyle = css`
  font-family: NanumGothic;
  width: 100%;
  max-width: 667px;
  min-height: 100vh;
  img {
    width: 114px;
  }
`;

const backImgWrap = (intro: any) => css`
  width: 100%;
  height: 40vh;
  background-image: url(${intro});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .textWrap {
    display: flex;
    height: 40vh;
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .title {
    font-size: 24px;
    font-weight: 800;
    line-height: normal;
    color: #fafcff;
    text-align: left;
    margin-bottom: 6px;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
  .titleDesc {
    font-size: 8px;
    font-weight: 800;
    line-height: normal;
    color: #d8d8d8;
  }
  .desc {
    font-size: 8px;
    font-weight: 500;
    line-height: normal;
    color: #fff;
  }
`;

const searchStyle = css`
  width: 100%;
  height: 10vh;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const searchWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 2px solid #fcac7a;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  padding: 6px 8px;
`;

const searchInputWrap = css`
  background-color: transparent;
  width: 231px;
  border: none;
  outline: none;
  padding-left: 14px;
  ::placeholder {
    color: #88888a;
    font-size: 12px;
  }
  ::focus {
  }
`;

const searchBtnWrap = css`
  padding: 7px 14px;
  background-color: #fcac7a;
  outline: none;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  cursor: pointer;
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
