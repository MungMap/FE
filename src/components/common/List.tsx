import ListCard from "../common/card/ListCard";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import {
  userIsSeachedAtom,
  userSearchDataAtom,
} from "../../hooks/atom/searchFilter";

const List = ({
  mapRef,
  data,
  setClickedItem,
  setModalInfo,
  modalInfo,
}: any) => {
  const [isSearching, setIsSearching] = useAtom(userIsSeachedAtom);
  const [searchData, setSearchDataList] = useAtom(userSearchDataAtom);

  return (
    <>
      <div css={rootStyle}>
        <>
          {isSearching && searchData?.length > 0 ? (
            <div css={innerWrapper}>
              <div css={countWrapper}>
                검색한 지역에는 <span>{searchData?.length} </span>
                건이 있습니다.
              </div>
              {searchData?.map((item: any, idx: number, arr: any) => {
                const userListItemMove = () => {
                  const user = new naver.maps.LatLngBounds(
                    new naver.maps.LatLng(
                      Number(item?.lat) + 0.002,
                      Number(item?.lng) + 0.002
                    ),
                    new naver.maps.LatLng(
                      Number(item?.lat) - 0.002,
                      Number(item?.lng) - 0.002
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
                      isLast={idx === arr.length - 1}
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
              {data?.map((item: any, idx: number, arr: any) => {
                const userListItemMove = () => {
                  const user = new naver.maps.LatLngBounds(
                    new naver.maps.LatLng(
                      Number(item?.lat) + 0.002,
                      Number(item?.lng) + 0.002
                    ),
                    new naver.maps.LatLng(
                      Number(item?.lat) - 0.002,
                      Number(item?.lng) - 0.002
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
                      isLast={idx === arr.length - 1}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      </div>
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
  padding-bottom: 20px;
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
