# 야구 초심자 학습 사이트 설계

- 작성일: 2026-08-15
- 저장소: `KoEonYack/study-baseball`
- 배포 URL: https://koeonyack.github.io/study-baseball/

## 목적

야구를 전혀 모르는 사람이 **2026년 8월 22일(토) 19:00 잠실야구장 두산 베어스 vs 롯데 자이언츠**
경기를 혼자서도 즐길 수 있는 상태로 만드는 것. 롯데 자이언츠 팬 입문을 전제로 한다.

성공 기준: 경기장에서 전광판을 보고 지금 무슨 상황인지 스스로 말할 수 있다.

## 제약

- 빌드 도구·프레임워크·외부 JS 라이브러리 없음. 순수 HTML/CSS/JS만 사용한다.
- GitHub Pages 프로젝트 페이지이므로 base path가 `/study-baseball/`다.
  모든 링크와 자원 경로는 **상대 경로**로 쓴다.
- 구단 로고·엠블럼·선수 사진 등 저작권 자산은 사용하지 않는다. 색상과 텍스트, 자체 제작 SVG만 쓴다.
- 모바일 우선. 경기 당일 현장에서 휴대폰으로 열어볼 것을 가정한다.

## 콘텐츠 정확도 방침

**현역 선수 명단·시즌 순위·기록은 싣지 않는다.** 시즌 진행 중에는 금방 낡고, 틀린 정보를
외우면 손해다. 대신 다음처럼 잘 변하지 않는 사실만 다룬다.

- 경기 규칙, 포지션, 기록 용어의 정의
- 구단의 연고지·홈구장·창단연도·한국시리즈 우승 이력
- 응원 문화, 영구결번, 은퇴한 레전드
- 경기장 접근 동선과 관람 절차

최신 정보가 필요한 지점(라인업, 순위, 티켓)은 KBO 공식 사이트와 구단 채널로 링크한다.

## 파일 구조

```
index.html            홈. 학습 경로 안내와 D-day
rules.html            야구 기초 규칙 (사이트의 중심)
kbo.html              KBO 리그와 10개 구단
lotte.html            롯데 자이언츠 입문
jamsil.html           8/22 잠실 직관 실전 가이드
assets/css/base.css         디자인 토큰, 리셋, 레이아웃, 헤더/푸터
assets/css/components.css   카드, 다이어그램, 퀴즈, 아코디언 등 컴포넌트
assets/js/nav.js            현재 페이지 표시, 모바일 메뉴, 읽기 진행바
assets/js/countdown.js      경기일 D-day 카운터
assets/js/diamond.js        클릭형 포지션 다이어그램
assets/js/count.js          볼카운트 시뮬레이터
assets/js/baserun.js        주자 진루 시뮬레이터
assets/js/scoreboard.js     전광판 읽기 연습
assets/js/quiz.js           퀴즈 엔진
assets/js/checklist.js      직관 준비물 체크리스트 (localStorage)
assets/data/teams.js        10개 구단 데이터
assets/data/quiz-data.js    페이지별 문제 은행
.nojekyll                   Jekyll 처리 우회
```

콘텐츠(데이터)와 동작(로직)을 분리해 나중에 내용만 고칠 수 있게 한다.
헤더·푸터 마크업은 각 HTML에 직접 둔다. JS가 하나 실패해도 문서를 계속 읽을 수 있어야 한다.

## 모듈 경계

각 JS 모듈은 담당 DOM 루트 하나를 받아 그 안에서만 동작한다. 모듈 간 직접 호출은 없다.

| 모듈 | 하는 일 | 붙는 지점 | 의존 |
|---|---|---|---|
| `nav.js` | 활성 링크 표시, 모바일 메뉴 토글, 진행바 | `[data-nav]` | 없음 |
| `countdown.js` | 경기일까지 남은 시간 갱신 | `[data-countdown]` | 없음 |
| `diamond.js` | 포지션 선택 → 설명 패널 갱신 | `[data-diamond]` | 없음 |
| `count.js` | 볼·스트라이크 누적, 삼진/볼넷 판정 | `[data-count-sim]` | 없음 |
| `baserun.js` | 타격 결과 → 주자 이동·득점 계산 | `[data-baserun]` | 없음 |
| `scoreboard.js` | 전광판 항목 설명 토글 | `[data-scoreboard]` | 없음 |
| `quiz.js` | 문항 렌더링, 채점, 해설 | `[data-quiz]` | `quiz-data.js` |
| `checklist.js` | 체크 상태 저장·복원 | `[data-checklist]` | 없음 |

해당 루트가 없는 페이지에서는 모듈이 조용히 아무 것도 하지 않는다.

## 디자인

롯데 자이언츠 컬러를 기반으로 한 팔레트(네이비 `#041E42`, 레드 `#D00F31`)에 중립 회색조를 더한다.
`prefers-color-scheme`로 다크 모드에 대응한다. 폰트는 시스템 한글 폰트 스택을 우선하고
Pretendard를 CDN으로 얹되, 실패해도 레이아웃이 깨지지 않게 한다.

## 배포

`main` 브랜치 root 배포. 작업은 `dev/init`에서 하고 main 병합은 **스쿼시 머지**로 한다.
push와 병합은 사용자 확인 후 진행한다.

## 검증

브라우저로 각 페이지를 실제로 열어 인터랙션 동작과 콘솔 에러 유무를 확인한다.
모바일 뷰포트(375px)에서도 레이아웃을 확인한다.
