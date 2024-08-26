import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useSearchParkData } from "../../api/useSearchPark";
import { useAtom } from "jotai";
import { Dialog } from "@mui/material";
import {
  userIsSeachedAtom,
  userSeachTextAtom,
} from "../../hooks/atom/searchFilter";
import walkSpotIcon from "../../assets/walkIcon.png";
import icon from "../../assets/dogIcon.png";

interface CustomMarker extends naver.maps.Marker {
  title?: string;
  address?: string;
  tel?: string;
  category?: string;
  area?: string;
}

const Search = ({ mapRef }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalInfo, setModalInfo] = useState<any>({});
  const [clickedItem, setClickedItem] = useState<boolean>(false);

  const [isSearchedModal, setIsSearchedModal] = useState<boolean>(false);

  const [isSearching, setIsSearching] = useAtom(userIsSeachedAtom);
  const [searchText, setSearchText] = useAtom(userSeachTextAtom);
  const { data: searchData, refetch } = useSearchParkData(searchText);

  const walkMarker = renderToStaticMarkup(<img src={walkSpotIcon} alt="" />);

  useEffect(() => {
    if (searchData && searchData.length) {
      searchMarkers();
    }
  }, [searchData]);

  const searchDataMarkers = useRef<naver.maps.Marker[]>([]);

  const searchMarkers = () => {
    searchDataMarkers.current?.map((val) => val?.setMap(null));
    searchDataMarkers.current = searchData?.map((park: any) => {
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

      naver.maps.Event.addListener(newMarker, "click", (e: any) => {
        setModalInfo({
          title: newMarker?.title as string,
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

  const handleSearch = () => {
    if (searchText.length > 1) {
      setIsSearching(true);
      refetch();
    } else {
      setIsSearchedModal(true);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div css={rootStyle}>
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
            placeholder="지역을 검색하세요.(ex. 강남구 삼성동)"
            value={searchText}
            maxLength={15}
            onChange={(e) => {
              const val = e.target.value;
              setSearchText(val);
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
          <LocationSearchingIcon sx={{ fontSize: "24px", color: "#ffffff" }} />
        </button>
      </div>
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
      <Dialog
        open={isSearchedModal}
        onClose={() => setIsSearchedModal(false)}
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
            <p>검색어를 2글자 이상 입력해주세요</p>
          </div>
          <button onClick={() => setIsSearchedModal(false)}>확인</button>
        </div>
      </Dialog>
    </>
  );
};

export default Search;

const rootStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 16px 18px;
  z-index: 1;
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
