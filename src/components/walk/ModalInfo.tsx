import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import walkIcon from "../../assets/dogIcon.png";
import medicalIcon from "../../assets/medicineIcon.png";
import travelIcon from "../../assets/suitcase.png";

const ModalInfo = ({ setClickedItem, modalInfo }: any) => {
  const location = useLocation();
  const menuName = location.pathname;
  return (
    <div css={dialogInfoContent}>
      <div css={dialogWrap}>
        <img
          src={
            menuName === "/walk"
              ? walkIcon
              : menuName === "/travel"
                ? travelIcon
                : medicalIcon
          }
          alt=""
        />
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
  );
};

export default ModalInfo;

const dialogInfoContent = css`
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
