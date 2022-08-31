[과제 진행 기간] 2022.08.29 - 2022.08.31
<br />
[간략하게 만들어 본 과제 디자인] [링크](https://www.figma.com/file/x3ofRiQOa5P6RvGzc8kgyA/factoryunicorn-codingtest?node-id=0%3A1)
<br />
<br />

## 👕 구현 내용

라벨 제작에 대한 문의를 받고, 받은 문의 내용을 관리할 수 있는 시스템입니다.
<br />

**라벨 제작에 대한 문의 화면**
![untitled0](https://user-images.githubusercontent.com/92494452/187631732-83766bd2-7b08-42a2-86f3-8111a57511a7.gif)
<br />

**문의 내용을 관리하는 화면**
![untitled1](https://user-images.githubusercontent.com/92494452/187631739-f100e757-59c3-400a-b7da-7e475c8aee69.gif)
<br />

## 👗 설치 및 실행 방법

```jsx
git clone https://github.com/onmidnightblue/factoryunicorn.git
cd factoryunicorn
npm i
npm start
```
<br />

## 🩳 구현 사항 목록

*는 필수를 뜻합니다.

### 고객

- 라벨 타입*
    - 메인 라벨 (재질: 직조/실크, 형태: 양접이/반접이)
    - 케어 라벨 (재질: 실크, 부착 위치: 자유 작성)
    - 포인트 라벨 (재질: 직조/실크, 배경 색상: 자유 작성)
- 라벨 크기*
    - 가로x세로(cm)
- 수량*
    - 기본 1000장, 500장 단위
- 요청 사항

### 업체

- 휴대폰 번호로 사용자의 정보를 조회
- 전체 문의를 확인하고, 각각의 상세 정보를 조회

### API

<details>
<summary>API 목록</summary>
<br />
baseURL : https://asia-northeast3-fu-webapp.cloudfunctions.net/api/codingTest
<br />

### 유저정보 저장
    
```jsx
[post] /saveUser

parameter
- accessKey
- phone

{ accessKey: accessKey, userInfo: { ...userInfo, phone: "010-1234-1234" }}
```
<br />

### 문의정보 저장

```jsx
[post] /saveInquiry

parameter
- accessKey
- userInfo
- inquiryInfo

{ accessKey: accessKey, userInfo: { ...userInfo, phone: "010-1234-1234" }, inquiryInfo: { ...inquiryInfo }}
```
<br />

### 유저정보 조회

```jsx
[get] /getUser?accessKey=${accessKey}&phone=${phone}

parameter
- accessKey
- phone

```
<br />

### 문의정보 단일 조회

```jsx
[get] /getSingleInquiry?accessKey=${accessKey}&uid=${uid}

parameter
- accessKey
- uid
```
<br />

### 문의정보 전체 조회

```jsx
[get] /getEntireInquiry?accessKey=${accessKey}

parameter
- accessKey
```
</details>
<br />

## 👚 사용한 프레임워크 및 라이브러리

- react
- react-router-dom
- styled-componenets
- axios
<br />

## 🥼 폴더 구조

```jsx
├─assets
│  └─images
├─components
│  ├─Admins
│  ├─commonUI
│  └─Users
├─hooks
├─pages
└─utils
```

- assets : 사용한 이미지와 색상 변수들이 위치합니다.
- components
    - admins : 사용자의 정보나 문의 리스트를 확인할 수 있는 컴포넌트들이 위치합니다.
    - commonUI : 공통으로 사용할 수 있는 헤더나 input, radio, modal 컴포넌트가 위치합니다.
    - Users : 사용자가 폼을 작성할 수 있는 컴포넌트가 위치합니다.
- hooks : 커스텀 훅이 위치합니다. 여기에서는 http 통신을 위한 커스텀 훅이 자리하고 있습니다.
- pages : 페이지를 구분하기 위한 컴포넌트로 구성했습니다.
- utils : 유효성을 검증하기 위한 함수들과 현재 시간을 출력하기 위한 함수가 들어 있습니다.
<br />

## 🛍️ 과제 진행 시 고민한 부분

- 라벨의 타입에 따라 받는 데이터가 달랐기 때문에 UI 부분에서 조금 고민을 했었습니다.
결과적으로는 탭의 형태로 구현했습니다.
- admin 페이지로 바로 연결되는 링크를 걸까... 고민했으나 우선 path만 설정해두었습니다.
  ```
  http://localhost:3000/admin
  ```
  위 경로로 admin 페이지에 진입할 수 있습니다.
<br />

## 👞 한계점 및 개선 사항

- [ ]  고객에게 입력을 받는 인풋들을 useRef가 아닌 useState로 변경합니다.
  - 예를 들면, 라벨 수량을 입력하는 부분에서 1000장 이하로 입력할 수 없도록 조건문을 추가하고, 500의 배수가 아닌 경우 고객에게 즉시 안내를 할 수 있습니다.
  - 입력이 진행중일 때 해당하는 유효성 검증에 대해 고객에게 안내할 수 있어 더 좋은 사용자 경험을 제공할 수 있습니다.
- [ ]  http 요청을 전송할 때 loading이나 error 상태를 전역으로 관리합니다.
  - loading spinner나 error UI 컴포넌트를 언제든지 호출해 사용자에게 보여줄 수 있습니다.
