# study-baseball

야구를 처음 보는 사람을 위한 인터랙티브 학습 사이트.

2026년 8월 22일(토) 잠실야구장 두산 베어스 vs 롯데 자이언츠 경기를 스스로 즐길 수 있는
상태가 되는 것을 목표로 만들었다.

**배포 주소:** https://koeonyack.github.io/study-baseball/

## 구성

| 페이지 | 내용 |
|---|---|
| `index.html` | 홈. 3분 요약과 학습 경로, 경기까지 남은 시간 |
| `rules.html` | 야구 기초 규칙. 포지션 다이어그램, 볼카운트·주자 시뮬레이터, 전광판 읽기 |
| `kbo.html` | KBO 리그 구조와 10개 구단 |
| `lotte.html` | 롯데 자이언츠 역사와 응원 문화 |
| `jamsil.html` | 8월 22일 직관 실전 가이드. 준비물 체크리스트 포함 |

## 기술

빌드 도구도 프레임워크도 외부 JS 라이브러리도 쓰지 않는다. 순수 HTML/CSS/JS다.
`<script type="module">`로 파일만 나눠 두었다.

```
assets/css/     base.css(토큰·레이아웃) + components.css
assets/js/      기능별 모듈. 각자 담당 DOM 루트가 없으면 아무 것도 하지 않는다
assets/data/    teams.js, quiz-data.js — 콘텐츠는 여기만 고치면 된다
```

GitHub Pages 프로젝트 페이지라서 base path가 `/study-baseball/`다.
**모든 경로는 상대 경로로 써야 한다.**

## 로컬에서 보기

ES 모듈을 쓰기 때문에 `file://`로 열면 동작하지 않는다. 간단한 정적 서버를 띄운다.

```bash
python3 -m http.server 4173
```

## 콘텐츠 방침

선수 명단, 팀 순위, 시즌 기록처럼 자주 바뀌는 정보는 싣지 않는다. 시즌 중에는 며칠 만에
낡기 때문이다. 규칙, 구단의 연고지와 홈구장, 우승 이력, 응원 문화처럼 잘 변하지 않는 것만
다루고 최신 정보는 공식 채널로 링크한다.

우승 이력과 구단 정보는 2025년 시즌까지 확정된 기록 기준이다.
구단 로고, 엠블럼, 선수 사진, 응원가 가사는 저작권 문제로 쓰지 않았다.

## 배포

`main` 브랜치 root 배포. GitHub 저장소 Settings → Pages → Deploy from a branch → `main` / `(root)`.
`.nojekyll`이 있어 Jekyll 처리를 건너뛴다.
