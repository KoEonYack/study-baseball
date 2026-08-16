/**
 * 선수단 페이지 동작.
 *
 * - 야구장 그림 위 포지션을 눌러 그 자리에 나오는 선수를 본다
 * - 전체 명단을 등번호순으로 렌더링한다
 *
 * 포지션 번호는 rules.html에서 익힌 것과 같은 번호를 쓴다.
 */

import { LINEUP, DH, ROSTER, KEY_NUMBERS, TEAM_STATUS } from "../data/roster.js";

/* ---------- 포지션별 라인업 ---------- */

function setUpLineup(root) {
  const panel = root.querySelector("[data-lineup-panel]");
  const nodes = Array.from(root.querySelectorAll("[data-lineup-pos]"));
  if (!panel || nodes.length === 0) return;

  const byNum = new Map(LINEUP.map((entry) => [entry.num, entry]));

  const show = (key) => {
    const entry = key === "dh" ? DH : byNum.get(key);
    if (!entry) return;

    nodes.forEach((node) => {
      const active = node.dataset.lineupPos === key;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-pressed", String(active));
    });

    const names = entry.players
      .map((name) => `<li><strong>${name}</strong></li>`)
      .join("");

    panel.innerHTML = `
      <h3>${entry.pos} ${entry.num ? `<span class="badge badge--brand">${entry.num}번 자리</span>` : '<span class="badge badge--navy">수비 없음</span>'}</h3>
      <ul class="name-list">${names}</ul>
      <p>${entry.desc}</p>
      ${entry.watch ? `<dl><dt>경기장에서 볼 것</dt><dd>${entry.watch}</dd></dl>` : ""}
    `;
  };

  nodes.forEach((node) => {
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.setAttribute("aria-pressed", "false");

    const key = node.dataset.lineupPos;
    const entry = key === "dh" ? DH : byNum.get(key);
    if (entry) node.setAttribute("aria-label", `${entry.pos} 선수 보기`);

    node.addEventListener("click", () => show(key));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        show(key);
      }
    });
  });

  // 그림 위에 선수 이름을 얹는다
  root.querySelectorAll("[data-lineup-name]").forEach((label) => {
    const entry = byNum.get(label.dataset.lineupName);
    if (!entry) return;
    label.textContent = entry.players.length > 1 ? `${entry.players[0]} 외` : entry.players[0];
  });

  show("8");
}

/* ---------- 전체 명단 ---------- */

function setUpRoster(root) {
  Object.entries(ROSTER).forEach(([group, players]) => {
    const target = root.querySelector(`[data-roster="${group}"]`);
    if (!target) return;

    players
      .slice()
      .sort((a, b) => a[0] - b[0])
      .forEach(([number, name]) => {
        const item = document.createElement("li");
        item.className = "roster-item";
        if (KEY_NUMBERS.has(name)) item.classList.add("is-key");
        item.innerHTML = `<span class="roster-item__no">${number}</span><span>${name}</span>`;
        target.append(item);
      });

    const count = target.closest("[data-roster-group]")?.querySelector("[data-roster-count]");
    if (count) count.textContent = `${players.length}명`;
  });
}

/* ---------- 팀 성적 ---------- */

function setUpStatus(root) {
  const map = {
    manager: TEAM_STATUS.manager,
    rank: `${TEAM_STATUS.rank}위`,
    record: `${TEAM_STATUS.wins}승 ${TEAM_STATUS.draws}무 ${TEAM_STATUS.losses}패`,
    winRate: TEAM_STATUS.winRate,
    asOf: TEAM_STATUS.asOf,
    played: `${TEAM_STATUS.played}경기`,
  };
  Object.entries(map).forEach(([key, value]) => {
    root.querySelectorAll(`[data-status="${key}"]`).forEach((el) => {
      el.textContent = value;
    });
  });
}

document.querySelectorAll("[data-lineup]").forEach(setUpLineup);
document.querySelectorAll("[data-roster-root]").forEach(setUpRoster);
setUpStatus(document);
