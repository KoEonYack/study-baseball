/**
 * KBO 10개 구단 카드 그리드.
 *
 * 카드를 누르면 아래 상세 영역이 바뀐다. 데이터는 data/teams.js가 단일 출처다.
 */

import { TEAMS, MATCHUP } from "../data/teams.js";

/** 우승 이력을 사람이 읽는 문장으로 */
function titlesText(team) {
  if (team.titles.length === 0) return "아직 없음";
  return `${team.titles.length}회 (${team.titles.join(", ")})`;
}

function detailMarkup(team) {
  const tags = [];
  if (team.id === MATCHUP.away) tags.push('<span class="badge badge--brand">우리 팀</span>');
  if (team.id === MATCHUP.home) tags.push('<span class="badge badge--navy">8/22 상대</span>');

  return `
    <h3>${team.name} ${tags.join(" ")}</h3>
    <dl>
      <dt>연고지</dt><dd>${team.city}</dd>
      <dt>홈구장</dt><dd>${team.stadium}</dd>
      <dt>창단</dt><dd>${team.founded}년${team.legacy ? ` (전신: ${team.legacy})` : ""}</dd>
      <dt>한국시리즈 우승</dt><dd>${titlesText(team)}</dd>
      <dt>별명</dt><dd>${team.nickname}</dd>
    </dl>
    <p>${team.note}</p>
  `;
}

function setUp(root) {
  const grid = root.querySelector("[data-team-grid]");
  const detail = root.querySelector("[data-team-detail]");
  if (!grid || !detail) return;

  const cards = TEAMS.map((team) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "team-card";
    card.style.setProperty("--team-color", team.color);
    card.setAttribute("aria-pressed", "false");
    card.innerHTML = `
      <span class="team-card__name">${team.name}</span>
      <span class="team-card__home">${team.city} · ${team.stadium}</span>
    `;

    card.addEventListener("click", () => {
      cards.forEach((other) => {
        other.classList.remove("is-active");
        other.setAttribute("aria-pressed", "false");
      });
      card.classList.add("is-active");
      card.setAttribute("aria-pressed", "true");

      detail.style.setProperty("--team-color", team.color);
      detail.innerHTML = detailMarkup(team);
    });

    grid.append(card);
    return card;
  });

  // 처음엔 롯데를 펼쳐 둔다
  const first = cards[TEAMS.findIndex((team) => team.id === MATCHUP.away)] || cards[0];
  first.click();
}

document.querySelectorAll("[data-teams]").forEach(setUp);
