import { css } from "@emotion/react";
import icon from "../../../assets/dogIcon.png";

const ListCard = ({ item }: any) => {
  return (
    <div css={rootStyle}>
      <div css={innerWrapper}>
        <img src={icon} alt="icon" />
        <div css={infoWrapper}>
          <p>{item?.공원명}</p>
          <span>
            {item?.소재지지번주소} | {item?.전화번호}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListCard;

const rootStyle = css`
  width: 100%;
  max-width: 667px;
  padding: 8px 10px;
  border-bottom: 1px solid #fcac7a;
  cursor: pointer;
  img {
    width: 27.72px;
    height: 25px;
  }
`;

const innerWrapper = css`
  display: flex;
  gap: 10px;
  font-size: 12px;
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
