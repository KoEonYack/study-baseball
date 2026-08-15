/**
 * 주자 진루 시뮬레이터.
 *
 * 타격 결과 버튼을 누르면 주자가 어떻게 움직이고 언제 점수가 나는지 보여준다.
 * 실제 경기에서는 주자의 발과 수비 상황에 따라 한 베이스 더 가기도 하지만,
 * 여기서는 규칙을 익히는 것이 목적이라 가장 기본이 되는 진루만 다룬다.
 */

function setUp(root) {
  const baseNodes = {
    1: root.querySelector('[data-base="1"]'),
    2: root.querySelector('[data-base="2"]'),
    3: root.querySelector('[data-base="3"]'),
  };
  const scoreEl = root.querySelector("[data-baserun-score]");
  const outEl = root.querySelector("[data-baserun-outs]");
  const log = root.querySelector("[data-baserun-log]");
  if (!log) return;

  // bases[1..3] = 해당 루에 주자가 있는지
  const state = { bases: { 1: false, 2: false, 3: false }, score: 0, outs: 0 };

  const paint = () => {
    Object.entries(baseNodes).forEach(([key, node]) => {
      if (node) node.classList.toggle("is-occupied", state.bases[key]);
    });
    if (scoreEl) scoreEl.textContent = String(state.score);
    if (outEl) outEl.textContent = String(state.outs);
  };

  const say = (html) => {
    log.innerHTML = html;
  };

  /** 모든 주자를 n루씩 밀고, 홈을 넘어간 주자 수를 득점으로 돌려준다 */
  const advance = (n) => {
    let runs = 0;
    const next = { 1: false, 2: false, 3: false };
    for (let base = 3; base >= 1; base -= 1) {
      if (!state.bases[base]) continue;
      const to = base + n;
      if (to >= 4) runs += 1;
      else next[to] = true;
    }
    state.bases = next;
    return runs;
  };

  const scoreText = (runs) =>
    runs > 0 ? ` <strong>${runs}점</strong>이 났습니다.` : " 아직 득점은 없습니다.";

  const checkInning = () => {
    if (state.outs < 3) return false;
    state.bases = { 1: false, 2: false, 3: false };
    state.outs = 0;
    paint();
    return true;
  };

  const actions = {
    single: () => {
      const runs = advance(1);
      state.score += runs;
      state.bases[1] = true;
      paint();
      say(`<strong>안타</strong>입니다. 타자가 1루에 서고 앞선 주자들이 한 베이스씩 갑니다.${scoreText(runs)}`);
    },

    double: () => {
      const runs = advance(2);
      state.score += runs;
      state.bases[2] = true;
      paint();
      say(`<strong>2루타</strong>입니다. 타자가 단숨에 2루까지 갔습니다.${scoreText(runs)}`);
    },

    triple: () => {
      const runs = advance(3);
      state.score += runs;
      state.bases[3] = true;
      paint();
      say(`<strong>3루타</strong>입니다. 흔치 않은 장면이라 나오면 관중석이 뒤집힙니다.${scoreText(runs)}`);
    },

    homerun: () => {
      const runs = advance(4) + 1;
      state.score += runs;
      paint();
      say(
        runs === 4
          ? `<strong>만루 홈런!</strong> 주자 세 명과 타자까지 모두 홈을 밟아 한 번에 4점입니다.`
          : `<strong>홈런</strong>입니다. 타자를 포함해 ${runs}점이 한꺼번에 났습니다. 담장을 넘기면 모두가 여유롭게 홈까지 걸어옵니다.`
      );
    },

    walk: () => {
      // 볼넷은 뒤가 꽉 찬 경우에만 앞 주자를 밀어낸다
      let runs = 0;
      if (state.bases[1] && state.bases[2] && state.bases[3]) {
        runs = 1;
      } else if (state.bases[1] && state.bases[2]) {
        state.bases[3] = true;
      } else if (state.bases[1]) {
        state.bases[2] = true;
      }
      state.bases[1] = true;
      state.score += runs;
      paint();
      say(
        runs > 0
          ? "<strong>밀어내기 볼넷</strong>입니다. 베이스가 꽉 차 있어서 3루 주자가 떠밀려 홈을 밟았습니다. 1점."
          : "<strong>볼넷</strong>입니다. 타자는 공을 치지 않고 1루로 걸어 나갑니다. 뒤가 막힌 주자만 한 칸씩 밀립니다."
      );
    },

    sacfly: () => {
      state.outs += 1;

      // 뜬공을 잡은 것이 3아웃이면 그 순간 이닝이 끝난다.
      // 3루 주자는 공을 잡은 뒤에야 출발할 수 있으므로 점수가 나지 않는다.
      if (state.outs >= 3) {
        checkInning();
        say(
          "뜬공 <strong>아웃</strong>. 이 아웃이 3아웃이라 이닝이 바로 끝났습니다. 3루에 주자가 있었더라도 <strong>점수는 나지 않습니다.</strong> 희생플라이는 아웃이 2개 미만일 때만 성립합니다."
        );
        return;
      }

      if (state.bases[3]) {
        state.bases[3] = false;
        state.score += 1;
        paint();
        say(
          "<strong>희생플라이</strong>입니다. 타자는 아웃됐지만 3루 주자가 공이 잡힌 뒤 출발해 홈을 밟았습니다. 아웃 하나를 내주고 1점을 바꾼 셈입니다."
        );
        return;
      }

      paint();
      say("뜬공 <strong>아웃</strong>입니다. 3루에 주자가 있었다면 희생플라이로 1점이 났을 상황입니다.");
    },

    out: () => {
      state.outs += 1;
      paint();
      const over = checkInning();
      say(
        over
          ? "<strong>아웃</strong>. 3아웃이 되어 이닝이 끝났습니다. 주자는 모두 사라지고 공수가 바뀝니다."
          : `<strong>아웃</strong>입니다. 아웃 ${state.outs}개. 3개가 되면 공격이 끝납니다.`
      );
    },

    reset: () => {
      state.bases = { 1: false, 2: false, 3: false };
      state.score = 0;
      state.outs = 0;
      paint();
      say("처음부터 다시 시작합니다. 버튼을 눌러 주자를 움직여 보세요.");
    },
  };

  root.querySelectorAll("[data-baserun-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = actions[button.dataset.baserunAction];
      if (action) action();
    });
  });

  paint();
}

document.querySelectorAll("[data-baserun]").forEach(setUp);
