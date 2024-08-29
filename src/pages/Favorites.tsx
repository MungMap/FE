import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { useGetFavorite, useRemoveFavorite } from "../api/useFavorite";
import mainImage from "../assets/favoriteMain.png";
import FavoritesList from "../components/mypage/FavoritesList";
import { renderToStaticMarkup } from "react-dom/server";
import { Dialog } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import travelMarkerIcon from "../assets/travelIcon.png";
import walkMarkerIcon from "../assets/walkIcon.png";
import medicalMarkerIcon from "../assets/medicalIcon.png";
import travelIcon from "../assets/suitcase.png";
import walkIcon from "../assets/dogIcon.png";
import medicalIcon from "../assets/medicineIcon.png";

const Favorites = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isRemoveFavorite, setIsRemoveFavorite] = useState<boolean>(false);

  const initLatLngRef = useRef<any>(null);
  //* 마커ui
  const marker = renderToStaticMarkup(
    <img
      src={
        category === "walk"
          ? walkMarkerIcon
          : category === "travel"
            ? travelMarkerIcon
            : medicalMarkerIcon
      }
      alt=""
    />
  );
  //* 지도표시 ref
  const mapRef = useRef<any>(null);
  const [favoriteslData, setFavoriteslData] = useState<any[]>();
  const [modalInfo, setModalInfo] = useState<any>({});
  const user = useUser();

  //* 즐겨찾기 데이터 요청
  const handleFavoritesData = async () => {
    const response = await useGetFavorite({ userId: user?.id, type: category });
    if (response?.status === 200) {
      const data = response.data;
      setFavoriteslData(data);
    } else {
      console.error("Error fetching data:");
    }
  };

  //* 좋아요 취소
  const handleRemoveFavorite = async ({ userId, placeId }) => {
    const response = await useRemoveFavorite({
      userId: userId,
      placeId: placeId,
    });
    if (response.status === 200) {
      setIsRemoveFavorite(true);
    } else {
      alert(response.message);
    }
  };

  //* 모��

  //* 맵 랜더링
  const handlerMap = () => {
    if (modalInfo.lat) {
      initLatLngRef.current = new naver.maps.LatLng(
        Number(modalInfo.lat),
        Number(modalInfo.lng)
      );
      if (mapRef.current && mapRef.current instanceof HTMLElement) {
        mapRef.current = new naver.maps.Map(mapRef.current, {
          center: initLatLngRef.current,
          zoom: 15, // 지도 확대 정도
          mapDataControl: false,
          tileSpare: 1,
          tileTransition: false,
        });
        mapRef.current = new naver.maps.Marker({
          position: initLatLngRef.current,
          map: mapRef.current,
          title: "즐겨찾기 장소",
          icon: {
            content: marker,
          },
        });
      }
    }
  };
  useEffect(() => {
    handleFavoritesData();
  }, [category]);

  return (
    <div css={rootStyle}>
      <div css={backImgWrap(mainImage)}>
        <div className="textWrap">
          <div>
            <p className="title">
              안녕하세요
              <br />
              <span>{user?.user_metadata?.name}</span> 님
            </p>
            <p className="titleDesc">
              <span>댕댕여지도</span>에서 좋아하는 <span>산책장소</span>를
              찾아보세요
            </p>
            <div
              className="button"
              onClick={() => {
                navigate("/walk");
              }}
            >
              START
            </div>
          </div>
        </div>
      </div>
      <FavoritesList
        data={favoriteslData}
        handlerMap={handlerMap}
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        icon={
          category === "walk"
            ? walkIcon
            : category === "travel"
              ? travelIcon
              : medicalIcon
        }
      />
      <Dialog
        open={!!modalInfo.title}
        onClose={() => setModalInfo({})}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "404px",
            minWidth: "306px",
            padding: "40px 22px 22px 22px",
            borderRadius: "12px",
          },
        }}
      >
        <div css={dialogInfoContent}>
          <div css={dialogWrap}>
            <img
              src={
                category === "walk"
                  ? walkIcon
                  : category === "travel"
                    ? travelIcon
                    : medicalIcon
              }
              alt=""
            />
            <p>{modalInfo?.title}</p>
          </div>
          <div ref={mapRef} css={mapStyle} />
          <div css={dialogTextWrap}>
            <span>주소:{modalInfo.address}</span>
            <span>문의: {modalInfo.tel}</span>
            <span>문의시간: {modalInfo?.oper_time}</span>
            <span>
              허용범주: {modalInfo.pet_size ? modalInfo.pet_size : "-"}
            </span>
            <span>
              허용제한: {modalInfo.pet_limit ? modalInfo.pet_limit : "-"}
            </span>
            <span>비고: {modalInfo.info}</span>
          </div>
          <button onClick={() => setModalInfo({})}>확인</button>
          <div
            css={likeBtn}
            onClick={() => {
              handleRemoveFavorite({
                userId: user?.id,
                placeId: modalInfo?.id,
              });
            }}
          >
            <FavoriteRoundedIcon sx={{ color: "#d9d9d9" }} />
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isRemoveFavorite}
        onClose={() => setIsRemoveFavorite(false)}
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
          <p>찜하기 취소가 완료되었습니다.</p>
          <button
            onClick={() => {
              setIsRemoveFavorite(false);
              handleFavoritesData();
            }}
          >
            확인
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Favorites;

const rootStyle = css`
  font-family: NanumGothic;
  width: 100%;
  max-width: 667px;
  min-height: 100vh;
`;

const backImgWrap = (image: any) => css`
  width: 100%;
  height: 30vh;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .textWrap {
    display: flex;
    height: 40vh;
    padding: 60px 25px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .title {
    font-size: 24px;
    font-weight: 800;
    line-height: normal;
    color: #ffff;
    text-align: left;
    margin-bottom: 6px;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    span {
      color: #ffa871;
    }
  }
  .titleDesc {
    margin-top: 18px;
    font-size: 8px;
    font-weight: 800;
    line-height: normal;
    color: #d8d8d8;
    span {
      color: #ffa871;
    }
  }
  .desc {
    font-size: 8px;
    font-weight: 500;
    line-height: normal;
    color: #fff;
  }
  .button {
    margin-top: 5px;
    width: 40px;
    border-radius: 4px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    background-color: #ffa871;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    padding: 6px;
  }
`;

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
  gap: 10px;
  margin-bottom: 11px;
`;

const mapStyle = css`
  width: 100%;
  height: 213px;
  background-color: #f0f0f0;
`;

const dialogTextWrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 6px;
  margin-bottom: 10px;
  margin-left: 6px;
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
