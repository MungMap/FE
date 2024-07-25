import { atom } from "jotai";

export interface searchTextType {
  searchText: string;
}

export const searchText = atom("");

export interface UserLocate {
  lat: number | string;
  lng: number | string;
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
});

//*현재 줌레벨 초과여부
export const userZoomLevelAtom = atom<boolean>(false);

//* 현위치 주소
export const useAddressAtom = atom<string>("");
