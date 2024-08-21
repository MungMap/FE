import { css } from "@emotion/react";
import icon from "../../../assets/dogIcon.png";
import { useAtom } from "jotai";
import { userSeachLoacationAtom } from "../../../hooks/atom/searchFilter";

const ListCard = ({ item, userListItemMove, setClickedItem, isLast }: any) => {
  const [userSearchLocate, setUserSearchLocate] = useAtom(
    userSeachLoacationAtom
  );
  return (
    <div css={rootStyle(isLast)}>
      <div
        css={innerWrapper}
        onClick={() => {
          setClickedItem(true);
        }}
      >
        <img src={icon} alt="icon" />
        <div css={infoWrapper}>
          <p>{item?.공원명}</p>
          <span>
            {item?.소재지지번주소} | {item?.전화번호}
          </span>
        </div>
      </div>
      <div
        css={searchBtn}
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

const rootStyle = (isLast: boolean) => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 667px;
  padding: 8px 10px;
  border-bottom: ${!isLast && "1px solid #fcac7a"};
  cursor: pointer;
  img {
    width: 27.72px;
    height: 25px;
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
