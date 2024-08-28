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
        <p>{modalInfo?.title}</p>
      </div>
      <div css={dialogTextWrap}>
        <span>주소: {modalInfo?.address ? modalInfo?.address : "-"}</span>
        <span>문의: {modalInfo?.tel ? modalInfo?.tel : "-"}</span>
        <span>
          문의시간: {modalInfo?.oper_time ? modalInfo?.oper_time : "-"}
        </span>
        <span> 허용범주: {modalInfo.pet_size ? modalInfo.pet_size : "-"}</span>
        <span>허용제한: {modalInfo.pet_limit ? modalInfo.pet_limit : "-"}</span>
        <span>비고: {modalInfo?.info ? modalInfo?.info : "-"}</span>
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
