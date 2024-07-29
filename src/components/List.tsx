/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ListCard from "./common/card/ListCard";
import { css } from "@emotion/react";
// import { parkData } from "../utils/useData";
import { useAtom } from "jotai";
import {
  userLocateAtom,
  userIsSeachedAtom,
  userSeachTextAtom,
} from "../hooks/atom/searchFilter";
import { Dialog } from "@mui/material";
import icon from "../assets/dogIcon.png";
import { useNearestParkData, useSearchParkData } from "../api/useSearchPark";

const List = ({ mapRef }: any) => {
  const [clickedItem, setClickedItem] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<any>({});
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);

  const [isSearching, setIsSearching] = useAtom(userIsSeachedAtom);
  const [searchText, setSearchText] = useAtom(userSeachTextAtom);

  const { data: searchData } = useSearchParkData(searchText);

  const { data, isLoading } = useNearestParkData({
    lat: userLocate?.lat,
    lon: userLocate?.lng,
    radius: 1,
  });

  return (
    <>
      <div css={rootStyle}>
        {isLoading ? (
          <div css={spinnerWrap}>
            <div css={spinner}></div>
          </div>
        ) : (
          <>
            {isSearching && searchData?.length > 0 ? (
              <div css={innerWrapper}>
                <div css={countWrapper}>
                  검색한 지역에는 <span>{searchData?.length} </span>
                  건이 있습니다.
                </div>
                {searchData?.map((item: any, idx: number) => {
                  const userListItemMove = () => {
                    const user = new naver.maps.LatLngBounds(
                      new naver.maps.LatLng(
                        Number(item?.위도) + 0.002,
                        Number(item?.경도) + 0.002
                      ),
                      new naver.maps.LatLng(
                        Number(item?.위도) - 0.002,
                        Number(item?.경도) - 0.002
                      )
                    );
                    mapRef.current.panToBounds(user);
                  };
                  return (
                    <div
                      key={idx.toString()}
                      onClick={() => {
                        setModalInfo(item);
                        // setClickedItem(true);
                      }}
                    >
                      <ListCard
                        item={item}
                        userListItemMove={userListItemMove}
                        setClickedItem={setClickedItem}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div css={innerWrapper}>
                <div css={countWrapper}>
                  현 지도에서 추천장소가 <span>{data?.length} </span>
                  곳이 있습니다.
                </div>
                {data?.map((item: any, idx: number) => {
                  const userListItemMove = () => {
                    const user = new naver.maps.LatLngBounds(
                      new naver.maps.LatLng(
                        Number(item?.위도) + 0.002,
                        Number(item?.경도) + 0.002
                      ),
                      new naver.maps.LatLng(
                        Number(item?.위도) - 0.002,
                        Number(item?.경도) - 0.002
                      )
                    );
                    mapRef.current.panToBounds(user);
                  };
                  return (
                    <div
                      key={idx.toString()}
                      onClick={() => {
                        setModalInfo(item);
                      }}
                    >
                      <ListCard
                        item={item}
                        userListItemMove={userListItemMove}
                        setClickedItem={setClickedItem}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
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
            <p>{modalInfo?.공원명}</p>
          </div>
          <div css={dialogTextWrap}>
            <span>주소: {modalInfo?.소재지지번주소}</span>
            <span>문의: {modalInfo?.전화번호}</span>
            <span>구분: {modalInfo?.공원구분}</span>
            <span>공원면적: {modalInfo?.공원면적}</span>
          </div>
          <button onClick={() => setClickedItem(false)}>확인</button>
        </div>
      </Dialog>
    </>
  );
};

export default List;

const rootStyle = css`
  padding: 17px 11px 17px 11px;
  height: 35vh;
`;

const innerWrapper = css`
  gap: 11px;
  display: flex;
  flex-direction: column;
  width: 100%;
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

const spinner = css`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fcac7a;
  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const spinnerWrap = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const countWrapper = css`
  margin-left: 8px;
  font-size: 10px;
  font-family: "NanumSquareNeoRegular";
  color: #88888a;
  span {
    font-size: 10px;
    font-weight: 700;
    font-family: "NanumSquareNeoExtraBold";
    color: #3d3d3d;
  }
`;
