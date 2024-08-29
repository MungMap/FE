import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSaveFavorite, ILikeParams } from "../../api/useFavorite";
import { useUser } from "@supabase/auth-helpers-react";
import { css } from "@emotion/react";
import walkIcon from "../../assets/dogIcon.png";
import medicalIcon from "../../assets/medicineIcon.png";
import travelIcon from "../../assets/suitcase.png";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Dialog } from "@mui/material";

const ModalInfo = ({ setClickedItem, modalInfo }: any) => {
  const user = useUser();
  const location = useLocation();
  const menuName = location.pathname;
  const [isAddFavorite, setIsAddFavorite] = useState<boolean>(false);
  const handleFavorite = async (params: ILikeParams) => {
    const response = await useSaveFavorite(params);
    if (response.status === 200) {
      setIsAddFavorite(true);
    } else {
      console.error("Error fetching data:", response);
    }
  };
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
        <span>
          {" "}
          허용견종크기: {modalInfo.pet_size ? modalInfo.pet_size : "-"}
        </span>
        <span>허용제한: {modalInfo.pet_limit ? modalInfo.pet_limit : "-"}</span>
        <span>비고: {modalInfo?.info ? modalInfo?.info : "-"}</span>
      </div>
      <button onClick={() => setClickedItem(false)}>확인</button>
      <div
        css={likeBtn}
        onClick={() => {
          handleFavorite({
            userId: user?.id,
            placeId: modalInfo?.id,
            type: menuName === "/walk" ? "walk" : "medical",
          });
        }}
      >
        <FavoriteRoundedIcon sx={{ color: "#b86570" }} />
      </div>
      <Dialog
        open={isAddFavorite}
        onClose={() => setIsAddFavorite(false)}
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
          <p>
            찜하기 완료!
            <br />
            마이페이지에서 확인해주세요.
          </p>
          <button onClick={() => setIsAddFavorite(false)}>확인</button>
        </div>
      </Dialog>
    </div>
  );
};

export default ModalInfo;

const dialogInfoContent = css`
  position: relative;
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

const likeBtn = css`
  position: absolute;
  top: 0;
  right: 0;
`;

const dialogContent = css`
  display: flex;
  text-align: center;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  font-family: "NanumSquareNeo";
  font-size: 12px;
  button {
    font-family: "NanumSquareNeoBold";
    background-color: #fcac7a;
    color: white;
    padding: 6px 30px;
    border-radius: 50px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;
