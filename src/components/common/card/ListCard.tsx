import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import walkIcon from "../../../assets/dogIcon.png";
import medicalIcon from "../../../assets/medicineIcon.png";
import travelIcon from "../../../assets/suitcase.png";

const ListCard = ({ item, userListItemMove, setClickedItem, isLast }: any) => {
  const location = useLocation();
  const menuName = location.pathname;
  return (
    <div css={rootStyle(isLast, menuName)}>
      <div
        css={innerWrapper}
        onClick={() => {
          setClickedItem(true);
        }}
      >
        <img
          src={
            menuName === "/walk"
              ? walkIcon
              : menuName === "/travel"
                ? travelIcon
                : medicalIcon
          }
          alt="icon"
        />
        <div css={infoWrapper}>
          <p>{item?.title}</p>
          <span>
            {item?.address} | {item?.tel}
          </span>
        </div>
      </div>
      <div
        css={searchBtn(menuName)}
        onClick={() => {
          userListItemMove();
        }}
      >
        찾기
      </div>
    </div>
  );
};

export default ListCard;

const rootStyle = (isLast: boolean, menuName: string) => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 667px;
  padding: 8px 10px;
  border-bottom: ${menuName === "/walk" && !isLast
    ? "1px solid #fcac7a"
    : menuName === "/travel" && !isLast
      ? "1px solid #5AAC6F"
      : menuName === "/medical" && !isLast
        ? "1px solid #DB6443"
        : ""};
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

const searchBtn = (menuName: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${menuName === "/walk"
    ? "#fcac7a"
    : menuName === "/travel"
      ? "#237B3A"
      : "#D43E14"};
  width: 44px;
  height: 24px;
  font-size: 12px;
  color: #ffffff;
  border-radius: 4px;
`;
