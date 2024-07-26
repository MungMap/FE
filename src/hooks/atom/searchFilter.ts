import { atom } from "jotai";

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
  lat: "",
  lng: "",
});

//* 현재 유저 위치 위도경도
export const userInLocateAtom = atom<UserLocate>({
  lat: "",
  lng: "",
  sw: { x: "", y: "" },
  ne: { x: "", y: "" },
});

//*현재 줌레벨 초과여부
export const userZoomLevelAtom = atom<boolean>(false);

//* 현위치 주소
export const useAddressAtom = atom<string>("");

//* 현재위치 다시 가져오기
export const userClickedLocationAtom = atom<boolean>(false);

//* 마커 클릭 된 관리번호
export const userClickedMarkerAtom = atom<any>();
