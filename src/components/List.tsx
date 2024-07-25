/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ListCard from "./common/card/ListCard";
import { css } from "@emotion/react";
// import { parkData } from "../utils/useData";
import { useAtom } from "jotai";
import { userLocateAtom } from "../hooks/atom/searchFilter";
import { Dialog } from "@mui/material";
import icon from "../assets/dogIcon.png";
import { useNearestParkData } from "../api/useSearchPark";

const List = () => {
  const [clickedItem, setClickedItem] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<any>({});
  const [userLocate, setUserLocate] = useAtom(userLocateAtom);

  const { data, refetch, isFetched } = useNearestParkData({
    lat: userLocate?.lat,
    lon: userLocate?.lng,
    radius: 1,
  });

  return (
    <>
      <div css={rootStyle}>
        <div css={innerWrapper}>
          {data?.map((item: any) => (
            <div
              key={item.관리번호}
              onClick={() => {
                setModalInfo(item);
                setClickedItem(true);
              }}
            >
              <ListCard item={item} />
            </div>
          ))}
        </div>
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
  /* width: 100%;
  background-color: #ffffff; */
  padding: 17px 11px 17px 11px;
`;

const innerWrapper = css`
  gap: 11px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* min-height: 35vh;
  height: 100%; */
  /* height: 100%; */
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
