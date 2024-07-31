import { css } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { renderToStaticMarkup } from "react-dom/server";
import { useAtom } from "jotai";
import {
  useAddressAtom,
  userSeachTextAtom,
  userInLocateAtom,
} from "../hooks/atom/searchFilter";
import userIcon from "../assets/user.png";

const Location = ({ userMarkerMove, mapRef, useMakerList }) => {
  //* 현재 유저 위치
  const [userInLocate, setUserInLocate] = useAtom(userInLocateAtom);
  const [userAddress, setUserAddress] = useAtom(useAddressAtom);
  const [searchText, setSearchText] = useAtom(userSeachTextAtom);

  const userMarker = renderToStaticMarkup(
    <img style={{ zIndex: "99", position: "absolute" }} src={userIcon} alt="" />
  );

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
          <div
            css={btnWrapper}
            onClick={() => {
              useMakerList.current?.map((val) => val?.setMap(null));
              const newMarker = new naver.maps.Marker({
                position: new naver.maps.LatLng(
                  Number(userInLocate.lat),
                  Number(userInLocate.lng)
                ),
                map: mapRef.current,
                title: "현재 위치",
                icon: {
                  content: userMarker,
                },
              });
              useMakerList.current.push(newMarker);
              userMarkerMove();
              setSearchText("");
            }}
          >
            <p> 현재위치</p>
            <MyLocationIcon sx={{ fontSize: "12px", marginLeft: "2px" }} />
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
  font-size: 8px;
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
  font-size: 10px;
  font-weight: 500;
  background-color: #ffffff;
  border-radius: 50px;
  padding: 6px 11px 6px 14px;
  color: #ffa871;
  cursor: pointer;
`;
