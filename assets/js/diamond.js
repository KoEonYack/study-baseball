/**
 * 클릭형 포지션 다이어그램.
 *
 * HTML에 있는 SVG의 [data-pos] 노드를 눌러 설명 패널을 바꾼다.
 * SVG 자체는 HTML에 두었기 때문에 이 파일이 없어도 그림은 보인다.
 */

const POSITIONS = {
  1: {
    num: "1",
    name: "투수",
    en: "Pitcher",
    role: "타자에게 공을 던지는 사람. 경기의 시작과 끝을 사실상 이 사람이 쥐고 있다.",
    watch: "투구 수를 전광판에서 확인해 보세요. 100개 언저리가 되면 교체가 가까워진 신호입니다.",
    tip: "선발 투수는 보통 5~6이닝을 던지고 내려갑니다. 그 뒤로는 불펜 투수들이 이어 던집니다.",
  },
  2: {
    num: "2",
    name: "포수",
    en: "Catcher",
    role: "홈플레이트 뒤에 앉아 투수의 공을 받는다. 어떤 공을 던질지 사인을 내는 사령탑 역할도 한다.",
    watch: "투수에게 손가락으로 사인을 보내고, 주자가 도루하면 2루로 공을 던집니다.",
    tip: "유일하게 다른 방향을 보고 앉아 있는 선수라 찾기 쉽습니다. 보호 장비를 온몸에 두르고 있습니다.",
  },
  3: {
    num: "3",
    name: "1루수",
    en: "First baseman",
    role: "1루를 지킨다. 다른 야수가 던진 공을 받아 타자 주자를 아웃시키는 일이 가장 많다.",
    watch: "땅볼이 나오면 1루수가 베이스를 밟은 채 공을 기다리는 장면을 자주 보게 됩니다.",
    tip: "키가 크고 글러브가 큰 선수가 많습니다. 낮게 오는 송구를 퍼 올려 잡는 능력이 중요합니다.",
  },
  4: {
    num: "4",
    name: "2루수",
    en: "Second baseman",
    role: "1루와 2루 사이를 지킨다. 유격수와 짝을 이뤄 병살 플레이를 만든다.",
    watch: "주자가 1루에 있을 때 땅볼이 나오면 2루수와 유격수의 호흡을 지켜보세요.",
    tip: "2루수는 이름과 달리 2루 베이스 바로 위가 아니라 1·2루 사이에 서 있습니다.",
  },
  5: {
    num: "5",
    name: "3루수",
    en: "Third baseman",
    role: "3루를 지킨다. 타구가 가장 세게 날아오는 자리라 '핫 코너'라고 부른다.",
    watch: "강한 타구를 몸으로 막아내고 1루로 길게 던지는 장면이 3루수의 하이라이트입니다.",
    tip: "반응 속도와 어깨 힘이 함께 필요한 자리입니다.",
  },
  6: {
    num: "6",
    name: "유격수",
    en: "Shortstop",
    role: "2루와 3루 사이를 지킨다. 수비 범위가 가장 넓어 팀에서 수비를 제일 잘하는 선수를 둔다.",
    watch: "좌우로 크게 움직여 공을 잡아내고 곧바로 1루로 던지는 장면을 보게 됩니다.",
    tip: "영어 이름 Shortstop은 '짧게 끊는 사람'이라는 뜻입니다. 내야를 통과하려는 타구를 끊어냅니다.",
  },
  7: {
    num: "7",
    name: "좌익수",
    en: "Left fielder",
    role: "외야 왼쪽을 지킨다. 3루 쪽으로 날아오는 뜬공과 빠지는 타구를 처리한다.",
    watch: "공이 담장 쪽으로 날아가면 좌익수가 뒤로 달려가 잡는지 보세요.",
    tip: "오른손 타자가 힘껏 당겨 친 공이 이쪽으로 자주 옵니다.",
  },
  8: {
    num: "8",
    name: "중견수",
    en: "Center fielder",
    role: "외야 한가운데를 지킨다. 외야에서 담당 면적이 가장 넓어 발이 빠른 선수가 맡는다.",
    watch: "좌익수·우익수와 겹치는 공은 대개 중견수가 우선권을 갖고 부릅니다.",
    tip: "TV 중계 화면에서 투수 뒤로 멀리 보이는 선수가 중견수입니다.",
  },
  9: {
    num: "9",
    name: "우익수",
    en: "Right fielder",
    role: "외야 오른쪽을 지킨다. 3루까지 공을 던져야 할 일이 많아 어깨가 강한 선수를 둔다.",
    watch: "우익수가 잡은 뜬공에 3루 주자가 홈으로 뛰어드는 '희생플라이' 승부를 지켜보세요.",
    tip: "홈까지 거리가 가장 먼 자리라 송구 능력이 특히 중요합니다.",
  },
};

function setUp(root) {
  const panel = root.querySelector("[data-diamond-panel]");
  const nodes = Array.from(root.querySelectorAll("[data-pos]"));
  if (!panel || nodes.length === 0) return;

  const show = (key) => {
    const info = POSITIONS[key];
    if (!info) return;

    nodes.forEach((node) => {
      const isActive = node.dataset.pos === key;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    panel.innerHTML = `
      <h3>${info.name} <span class="badge badge--brand">${info.num}번</span></h3>
      <p>${info.role}</p>
      <dl>
        <dt>경기장에서 볼 것</dt>
        <dd>${info.watch}</dd>
        <dt>알아두면 좋은 점</dt>
        <dd>${info.tip}</dd>
      </dl>
      <p class="term__desc" style="margin-top:var(--sp-4)">영어로는 ${info.en}. 기록지에서는 ${info.num}번으로 적습니다.</p>
    `;
  };

  nodes.forEach((node) => {
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.setAttribute("aria-pressed", "false");

    const key = node.dataset.pos;
    const info = POSITIONS[key];
    if (info) {
      node.setAttribute("aria-label", `${info.name} 설명 보기`);
    }

    node.addEventListener("click", () => show(key));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        show(key);
      }
    });
  });

  // 포지션 번호 순서대로 넘겨보는 버튼
  root.querySelectorAll("[data-diamond-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const active = nodes.find((node) => node.classList.contains("is-active"));
      const index = active ? nodes.indexOf(active) : -1;
      const step = Number(button.dataset.diamondStep);
      const next = (index + step + nodes.length) % nodes.length;
      show(nodes[next].dataset.pos);
    });
  });

  show("1");
}

document.querySelectorAll("[data-diamond]").forEach(setUp);
