import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";
import { Dialog } from "@mui/material";
import travelIcon from "../assets/travelIcon.png";
import travelImg from "../assets/travelMainImg.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useSearchData, ISearchParams } from "../api/useSupabase";
import SearchList from "../components/travel/SearchList";
import icon from "../assets/suitcase.png";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { ILikeParams, useSaveFavorite } from "../api/useFavorite";
import { useUser } from "@supabase/auth-helpers-react";

const Travel = () => {
  const user = useUser();
  const [searchText, setSearchText] = useState<string>("양양");
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    category: "펜션",
    searchText: "양양군",
    page: 1,
    pageSize: 10,
  });
  const [searchTravelData, setSearchTravelData] = useState<any[]>();
  const initLatLngRef = useRef<any>(null);
  const [modalInfo, setModalInfo] = useState<any>({});

  //* 여행장소위치 마커ui
  const travelMarker = renderToStaticMarkup(<img src={travelIcon} alt="" />);

  //* 지도표시 ref
  const mapRef = useRef<any>(null);

  const handleSearch = async () => {
    const response = await useSearchData(searchParams);
    if (response.status === 200) {
      const data = response?.data;
      setSearchTravelData(data);
    } else {
      console.error("Error fetching data:", response.statusText);
    }
  };

  //* 맵 랜더링
  const handlerMap = () => {
    if (modalInfo.lat) {
      initLatLngRef.current = new naver.maps.LatLng(
        Number(modalInfo.lat),
        Number(modalInfo.lng)
      );
      if (mapRef.current && mapRef.current instanceof HTMLElement) {
        mapRef.current = new naver.maps.Map(mapRef.current, {
          center: initLatLngRef.current,
          zoom: 15, // 지도 확대 정도
          mapDataControl: false,
          tileSpare: 1,
          tileTransition: false,
        });
        mapRef.current = new naver.maps.Marker({
          position: initLatLngRef.current,
          map: mapRef.current,
          title: "여행지",
          icon: {
            content: travelMarker,
          },
        });
      }
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
      setSearchText(searchParams.searchText as string);
    }
  };

  const handleFavorite = (params: ILikeParams) => {
    const res = useSaveFavorite(params);
    console.log(res);
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
              placeholder="지역을 검색하세요.(ex. 양양, 가평)"
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
              setSearchText(searchParams.searchText as string);
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
          handleSearch={handleSearch}
          setModalInfo={setModalInfo}
          handlerMap={handlerMap}
          modalInfo={modalInfo}
          searchText={searchText}
        />
      </div>
      <Dialog
        open={!!modalInfo.title}
        onClose={() => setModalInfo({})}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "404px",
            minWidth: "306px",
            padding: "40px 22px 22px 22px",
            borderRadius: "12px",
          },
        }}
      >
        <div css={dialogInfoContent}>
          <div css={dialogWrap}>
            <img src={icon} alt="" />
            <p>{modalInfo?.title}</p>
          </div>
          <div ref={mapRef} css={mapStyle} />
          <div css={dialogTextWrap}>
            <span>주소:{modalInfo.address}</span>
            <span>문의: {modalInfo.tel}</span>
            <span>문의시간: {modalInfo?.oper_time}</span>
            <span>
              허용범주: {modalInfo.pet_size ? modalInfo.pet_size : "-"}
            </span>
            <span>
              허용제한: {modalInfo.pet_limit ? modalInfo.pet_limit : "-"}
            </span>
            <span>비고: {modalInfo.info}</span>
          </div>
          <button onClick={() => setModalInfo({})}>확인</button>
          <div
            css={likeBtn}
            onClick={() => {
              handleFavorite({
                userId: user?.id,
                placeId: modalInfo?.id,
                type: "산책",
              });
            }}
          >
            <FavoriteRoundedIcon sx={{ color: "#b86570" }} />
          </div>
        </div>
      </Dialog>
    </>
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

const mapStyle = css`
  width: 100%;
  height: 213px;
  background-color: #f0f0f0;
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

const dialogInfoContent = css`
  position: relative;
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
  gap: 10px;
  margin-bottom: 11px;
`;

const dialogTextWrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 6px;
  margin-bottom: 10px;
  margin-left: 6px;
`;

const likeBtn = css`
  position: absolute;
  top: 0;
  right: 0;
`;
