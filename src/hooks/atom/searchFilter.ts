import { atom } from "jotai";

const userLat = sessionStorage.getItem("userLat");
const userLng = sessionStorage.getItem("userLng");
export interface searchTextType {
  searchText: string;
}

export const searchText = atom("");

export interface UserLocate {
  lat: number | string;
  lng: number | string;
  sw?: { x: number | string; y: number | string };
  ne?: { x: number | string; y: number | string };
}

//* 현재 지도상 가운데 위도경도
export const userLocateAtom = atom<UserLocate>({
  lat: userLat ? userLat : 37.5206868,
  lng: userLng ? userLng : 127.1171114,
});

//* 현재 유저 위치 위도경도
export const userInLocateAtom = atom<UserLocate>({
  lat: userLat ? userLat : 37.5206868,
  lng: userLng ? userLng : 127.1171114,
});

//*현재 줌레벨 초과여부
export const userZoomLevelAtom = atom<boolean>(false);

//* 현위치 주소
export const useAddressAtom = atom<string>("");

//* 현재위치 다시 가져오기
export const userClickedLocationAtom = atom<boolean>(false);

//* text 검색 사용여부
export const userIsSeachedAtom = atom<boolean>(false);

//* 검색어 string
export const userSeachTextAtom = atom<string>("");

//* 검색 및 현지도 데이터 위도, 경도
export const userSeachLoacationAtom = atom<UserLocate>({
  lat: "",
  lng: "",
});

//* 위치 정보 판별여부
export const userIsNotLocationAtom = atom<boolean>(false);
