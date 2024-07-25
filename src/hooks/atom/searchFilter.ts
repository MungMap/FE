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
// lat: 37.4903127,
// lng: 127.0450338,
export const userZoomLevelAtom = atom<boolean>(false);

export const userClickedDetailAtom = atom<boolean>(false);
// useEffect(() => {
//   const { naver } = window;
//   if (mapRef.current && naver) {
//     const location = new naver.maps.LatLng(lat, lng);
//     const map = new naver.maps.Map(mapRef.current, {
//       center: location,
//       zoom: 17, // 지도 확대 정도
//     });
//     new naver.maps.Marker({
//       position: location,
//       map,
//     });
//   }
// }, [location]);
