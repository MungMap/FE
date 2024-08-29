import { css } from "@emotion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FavoritesList = ({
  data,
  handlerMap,
  modalInfo,
  setModalInfo,
  icon,
}: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      handlerMap();
    }, 500);
  }, [modalInfo]);
  return (
    <div css={rootStyles}>
      <div css={searchCardWrap}>
        {data?.length > 0 ? (
          <>
            {data?.map((item: any, idx: number, arr: any) => (
              <div key={idx} css={cardRootStyle(idx === arr.length - 1)}>
                <div css={innerWrapper}>
                  <img src={icon} alt="icon" />
                  <div css={infoWrapper}>
                    <p>{item?.title}</p>
                    <span>
                      {item?.address} | {item?.tel}
                    </span>
                  </div>
                </div>
                <div
                  css={searchBtn}
                  onClick={() => {
                    setModalInfo(item);
                  }}
                >
                  상세
                </div>
              </div>
            ))}
          </>
        ) : (
          <div css={noneDataWrap}>
            <p> 즐겨찾기 항목이 없습니다.</p>
            <div
              className="btnStyle"
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;

const rootStyles = css`
  width: 100%;
  height: calc(78vh - 152px);
  padding: 6px 18px;
  font-family: NanumGothic;
  overflow-y: auto;
  overflow-x: hidden;
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

const noneDataWrap = css`
  display: flex;
  flex-direction: column;
  height: 100px;
  align-items: center;
  justify-content: center;
  p {
    font-family: "NanumSquareNeo";
    font-size: 12px;
    color: #88888a;
  }
  .btnStyle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fcac7a;
    font-size: 12px;
    color: #ffffff;
    border-radius: 4px;
    margin-top: 10px;
    padding: 6px;
    cursor: pointer;
  }
`;

const searchCardWrap = css`
  gap: 11px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px 0;
`;

const cardRootStyle = (isLast: boolean) => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 667px;
  padding: 8px 10px;
  border-bottom: ${isLast ? "" : "1px solid #fcac7a"};
  cursor: pointer;
  img {
    width: 27.72px;
    /* height: 25px; */
  }
`;

const innerWrapper = css`
  display: flex;
  gap: 10px;
  font-size: 10px;
`;

const infoWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3px;
  p {
    font-family: "NanumSquareNeoExtraBold";
    color: #3d3d3d;
  }
  span {
    font-family: "NanumSquareNeoRegular";
    color: #88888a;
  }
`;

const searchBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcac7a;
  width: 44px;
  height: 24px;
  font-size: 12px;
  color: #ffffff;
  border-radius: 4px;
`;
