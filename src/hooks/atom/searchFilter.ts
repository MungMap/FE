import { atom } from "jotai";

export interface searchTextType {
  searchText: string;
}

export const searchText = atom("");

export interface UserLocate {
  lat: number | string;
  lng: number | string;
}

export const userLocateAtom = atom<UserLocate>({
  lat: "",
  lng: "",
});

//*현재 줌레벨 초과여부
export const userZoomLevelAtom = atom<boolean>(false);

//*상세화면 클릭 여부
export const userClickedDetailAtom = atom<boolean>(false);

//* 현위치 주소
export const useAddressAtom = atom<any>({});
