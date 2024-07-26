import { css } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAtom } from "jotai";
import { useAddressAtom } from "../hooks/atom/searchFilter";

const Location = () => {
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);

  return (
    <>
      {!userAddress ? (
        <div css={rootStyle}>
          <div css={textWrapper}>현재 위치를 찾고 있습니다.</div>
        </div>
      ) : (
        // <div css={innerWrapper}>
        <div css={rootStyle}>
          <div css={textWrapper}>
            <LocationOnIcon sx={{ color: "#ffffff" }} />
            <div>
              현재 지역은 <span>{userAddress}</span> 입니다.
            </div>
          </div>
          <div css={btnWrapper}>
            <p> 현재위치</p>
            <RestartAltIcon sx={{ fontSize: "20px" }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Location;

const rootStyle = css`
  position: absolute;
  bottom: 35vh;
  width: 100%;
  max-width: 667px;
  background: #fcac7a;
  padding: 11px 17px;
  min-height: 5vh;
  max-height: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const textWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeoBold";
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  gap: 8px;
  span {
    font-family: "NanumSquareNeoExtraBold";
    font-weight: 700;
    color: #3d3d3d;
  }
`;

const btnWrapper = css`
  display: flex;
  font-family: "NanumSquareNeoBold";
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  background-color: #ffffff;
  border-radius: 50px;
  padding: 4px 11px 4px 14px;
  color: #ffa871;
  cursor: pointer;
`;
