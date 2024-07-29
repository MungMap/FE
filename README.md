# 강아지 산책은? 댕댕여지도

![main](https://github.com/user-attachments/assets/5e1074c7-2d6e-489e-9f94-d7362310b5a3)


<br>

## 👉 웹사이트 

>  [https://mung-map.netlify.app/](https://mung-map.netlify.app/)

<br>

## 🍀 서비스 아키텍쳐
![service](https://github.com/user-attachments/assets/1ba47223-fcc5-4c29-a837-3c725b06da4c)


<br>

## 🍬 프로젝트 실행

```js
$ npm run dev
```
<br>

## 👉🏻 프로젝트 소개

>  react vite, naver map을 활용한<br>
>  강아지 산책 웹사이트 <br>
<br>

## 📅 프로젝트 기간

기간 : 2024년 07월 22일 ~ 2024년 07월 29일

<br>

## 🚀 트러블 슈팅

<details>
 <summary>NAVER MAP에서 해당 위치 지도에서 이동하기</summary>
 <div markdown="1">       

  <br>
  NAVER MAP에서 해당 공간으로 지역 이동 하는 로직 추가 시 
 panToBounds(user)를 사용하여 지도의 경계의 위도, 경도를 입력해야하는데
 현재의 경도 위도는 naver에서 받아오는 것이 아니라 geolocation받아오므로 
 현재 위치의 지도상의 gtBound를 알기가 어려웠다.
 
```js
     const user = new naver.maps.LatLngBounds(
                      new naver.maps.LatLng(
                        Number(item?.위도) + 0.002,
                        Number(item?.경도) + 0.002
                      ),
                      new naver.maps.LatLng(
                        Number(item?.위도) - 0.002,
                        Number(item?.경도) - 0.002
                      )
                    );
```

위 와 같이 경계의 범위를 직접 지정해주어 이동하도록 진행하였다.
 
 </div>
 </details>

 
