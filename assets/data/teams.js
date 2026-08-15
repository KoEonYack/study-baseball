/**
 * KBO 리그 10개 구단 데이터.
 *
 * 여기 담는 값은 잘 바뀌지 않는 사실만 둔다. 선수 명단·시즌 순위·기록은
 * 금방 낡으므로 넣지 않는다.
 *
 * titles  : 한국시리즈 우승 연도 (2025년까지 확정된 기록)
 * legacy  : 전신 구단 이름이 달랐던 경우 표기
 * color   : 카드 구분용 표시색. 공식 컬러 코드가 아니다.
 */
export const TEAMS = [
  {
    id: "lotte",
    name: "롯데 자이언츠",
    city: "부산",
    stadium: "사직야구장",
    founded: 1982,
    color: "#d00f31",
    titles: [1984, 1992],
    nickname: "부산 갈매기 · 거인",
    note: "우리가 응원할 팀. 1982년 프로야구 원년부터 지금까지 이름도 연고지도 한 번도 바꾸지 않았다. 관중 열기가 리그에서 손꼽혀 부산을 '구도(球都)'라고 부른다.",
  },
  {
    id: "doosan",
    name: "두산 베어스",
    city: "서울",
    stadium: "잠실야구장",
    founded: 1982,
    legacy: "OB 베어스",
    color: "#131230",
    titles: [1982, 1995, 2001, 2015, 2016, 2019],
    nickname: "곰",
    note: "8월 22일 경기의 홈팀이자 우리 상대. 프로야구 원년 우승팀이며 창단 당시 이름은 OB 베어스였다. 잠실야구장을 LG 트윈스와 함께 쓴다.",
  },
  {
    id: "lg",
    name: "LG 트윈스",
    city: "서울",
    stadium: "잠실야구장",
    founded: 1990,
    legacy: "MBC 청룡",
    color: "#c30452",
    titles: [1990, 1994, 2023, 2025],
    nickname: "쌍둥이",
    note: "MBC 청룡을 인수해 출범했다. 두산과 같은 구장을 쓰기 때문에 두 팀의 맞대결은 아무도 이동하지 않는 '잠실 라이벌전'이 된다.",
  },
  {
    id: "kia",
    name: "KIA 타이거즈",
    city: "광주",
    stadium: "광주기아챔피언스필드",
    founded: 1982,
    legacy: "해태 타이거즈",
    color: "#ea0029",
    titles: [1983, 1986, 1987, 1988, 1989, 1991, 1993, 1996, 1997, 2009, 2017, 2024],
    nickname: "호랑이",
    note: "해태 타이거즈 시절을 포함해 한국시리즈 최다 우승(12회) 구단이다. 한국시리즈에 올라가서 진 적이 한 번도 없다.",
  },
  {
    id: "samsung",
    name: "삼성 라이온즈",
    city: "대구",
    stadium: "대구삼성라이온즈파크",
    founded: 1982,
    color: "#074ca1",
    titles: [1985, 2002, 2005, 2006, 2011, 2012, 2013, 2014],
    nickname: "사자",
    note: "원년부터 구단 이름이 한 번도 바뀌지 않은 팀. 2011년부터 2014년까지 4년 연속 정규시즌과 한국시리즈를 모두 제패했다.",
  },
  {
    id: "hanwha",
    name: "한화 이글스",
    city: "대전",
    stadium: "대전 한화생명 볼파크",
    founded: 1986,
    legacy: "빙그레 이글스",
    color: "#fc4e00",
    titles: [1999],
    nickname: "독수리",
    note: "빙그레 이글스로 출발했다. 긴 부진에도 팬들이 떠나지 않아 '보살팬'이라는 별명이 붙었다.",
  },
  {
    id: "ssg",
    name: "SSG 랜더스",
    city: "인천",
    stadium: "인천SSG랜더스필드",
    founded: 2000,
    legacy: "SK 와이번스",
    color: "#ce0e2d",
    titles: [2007, 2008, 2010, 2018, 2022],
    nickname: "랜더스",
    note: "SK 와이번스를 인수해 2021년 SSG 랜더스로 이름을 바꿨다. 2022년에는 개막부터 끝까지 단 하루도 1위를 놓치지 않는 '와이어 투 와이어' 우승을 했다.",
  },
  {
    id: "nc",
    name: "NC 다이노스",
    city: "창원",
    stadium: "창원NC파크",
    founded: 2011,
    color: "#315288",
    titles: [2020],
    nickname: "공룡",
    note: "9번째 구단으로 창단해 2013년부터 1군에 참가했다. 롯데와는 같은 경상남도 연고라 맞대결이 '낙동강 더비'로 불린다.",
  },
  {
    id: "kt",
    name: "KT 위즈",
    city: "수원",
    stadium: "수원KT위즈파크",
    founded: 2013,
    color: "#000000",
    titles: [2021],
    nickname: "마법사",
    note: "가장 늦게 합류한 10번째 구단. 2015년 1군 진입 후 6년 만에 첫 우승을 차지했다.",
  },
  {
    id: "kiwoom",
    name: "키움 히어로즈",
    city: "서울",
    stadium: "고척스카이돔",
    founded: 2008,
    legacy: "우리·넥센 히어로즈",
    color: "#570514",
    titles: [],
    nickname: "영웅",
    note: "국내 유일의 돔구장을 홈으로 쓴다. 비가 와도 경기가 취소되지 않는 유일한 구장이다. 아직 한국시리즈 우승은 없다.",
  },
];

/** 8월 22일 경기에 등장하는 두 팀 */
export const MATCHUP = {
  home: "doosan",
  away: "lotte",
};
