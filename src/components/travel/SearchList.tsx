import { css } from "@emotion/react";
import travelIcon from "../../assets/suitcase.png";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { useEffect } from "react";

const SearchList = ({
  data,
  searchParams,
  setSearchParams,
  handleSearch,
  setModalInfo,
  handlerMap,
  modalInfo,
  searchText,
}: any) => {
  const handleNextPage = () => {
    if (data?.length === searchParams.pageSize) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        page: prevParams.page + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (searchParams.page > 1) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        page: prevParams.page - 1,
      }));
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams.page]);

  useEffect(() => {
    setTimeout(() => {
      handlerMap();
    }, 500);
  }, [modalInfo]);

  return (
    <div css={rootStyles}>
      <div css={searchTextWrap}>
        현재 검색 지역은
        <span> '{searchText}'</span>입니다
      </div>
      <div css={searchCardWrap}>
        {data?.length > 0 ? (
          <>
            {data?.map((item: any, idx: number, arr: any) => (
              <div key={idx} css={cardRootStyle(idx === arr.length - 1)}>
                <div css={innerWrapper}>
                  <img src={travelIcon} alt="icon" />
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
            <div css={searchPageNation}>
              {searchParams.page > 1 && (
                <div className="btnWrap" onClick={handlePrevPage}>
                  <NavigateBeforeRoundedIcon sx={{ fontSize: "20px" }} />
                  이전
                </div>
              )}
              {data?.length === searchParams.pageSize && (
                <div className="btnWrap" onClick={handleNextPage}>
                  다음
                  <NavigateNextRoundedIcon sx={{ fontSize: "20px" }} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div css={noneDataWrap}>검색어와 일치하는 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchList;

const rootStyles = css`
  width: 100%;
  height: calc(58vh - 182px);
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
  height: 100px;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeo";
  font-size: 12px;
  color: #88888a;
`;

const searchTextWrap = css`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: #88888a;
  span {
    color: #0b3458;
    margin: 0 4px;
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
  border-bottom: ${isLast ? "" : "1px solid #5AAC6F"};
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
  background-color: #237b3a;
  width: 44px;
  height: 24px;
  font-size: 12px;
  color: #ffffff;
  border-radius: 4px;
`;

const searchPageNation = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  font-size: 10px;
  color: #6d6d6d;
  .btnWrap {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
