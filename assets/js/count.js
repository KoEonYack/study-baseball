/**
 * 볼카운트 시뮬레이터.
 *
 * 버튼을 눌러 공 하나하나를 진행시키면서 삼진과 볼넷이 어떻게 만들어지는지 본다.
 * 아웃은 한 이닝(3아웃)까지 누적되고, 3아웃이 되면 공수교대를 알린 뒤 초기화한다.
 */

const ZONE = { x: 45, y: 30, w: 110, h: 130 };

/** 스트라이크존 안/밖의 좌표를 하나 고른다 */
function pickSpot(inZone) {
  if (inZone) {
    return {
      x: ZONE.x + 12 + Math.random() * (ZONE.w - 24),
      y: ZONE.y + 12 + Math.random() * (ZONE.h - 24),
    };
  }
  const side = Math.floor(Math.random() * 4);
  const pad = 16 + Math.random() * 20;
  if (side === 0) return { x: ZONE.x - pad, y: ZONE.y + Math.random() * ZONE.h };
  if (side === 1) return { x: ZONE.x + ZONE.w + pad, y: ZONE.y + Math.random() * ZONE.h };
  if (side === 2) return { x: ZONE.x + Math.random() * ZONE.w, y: ZONE.y - pad };
  return { x: ZONE.x + Math.random() * ZONE.w, y: ZONE.y + ZONE.h + pad };
}

function setUp(root) {
  const lamps = {
    ball: Array.from(root.querySelectorAll('.lamp[data-kind="ball"]')),
    strike: Array.from(root.querySelectorAll('.lamp[data-kind="strike"]')),
    out: Array.from(root.querySelectorAll('.lamp[data-kind="out"]')),
  };
  const log = root.querySelector("[data-count-log]");
  const pitch = root.querySelector("[data-count-pitch]");
  if (!log) return;

  const state = { balls: 0, strikes: 0, outs: 0 };

  const paint = () => {
    Object.entries(lamps).forEach(([kind, list]) => {
      const value = kind === "ball" ? state.balls : kind === "strike" ? state.strikes : state.outs;
      list.forEach((lamp, index) => lamp.classList.toggle("is-on", index < value));
    });
  };

  const say = (html) => {
    log.innerHTML = html;
  };

  const movePitch = (inZone) => {
    if (!pitch) return;
    const spot = pickSpot(inZone);
    pitch.setAttribute("cx", spot.x.toFixed(1));
    pitch.setAttribute("cy", spot.y.toFixed(1));
    pitch.classList.add("is-shown");
  };

  const nextBatter = (message) => {
    state.balls = 0;
    state.strikes = 0;
    if (state.outs >= 3) {
      state.outs = 0;
      paint();
      say(`${message} <strong>3아웃이 되어 공수교대입니다.</strong> 이제 우리 팀이 수비로 나갑니다.`);
      return;
    }
    paint();
    say(message);
  };

  const actions = {
    strike: () => {
      movePitch(true);
      state.strikes += 1;
      if (state.strikes >= 3) {
        state.outs += 1;
        nextBatter("스트라이크! <strong>삼진 아웃</strong>입니다. 스트라이크 3개면 타자는 물러납니다.");
        return;
      }
      paint();
      say(`스트라이크존을 통과했습니다. 스트라이크 <strong>${state.strikes}</strong>개.`);
    },

    ball: () => {
      movePitch(false);
      state.balls += 1;
      if (state.balls >= 4) {
        nextBatter("<strong>볼넷</strong>입니다. 타자는 공을 치지 않고 걸어서 1루로 나갑니다.");
        return;
      }
      paint();
      say(`스트라이크존을 벗어났습니다. 볼 <strong>${state.balls}</strong>개.`);
    },

    swing: () => {
      movePitch(Math.random() > 0.4);
      state.strikes += 1;
      if (state.strikes >= 3) {
        state.outs += 1;
        nextBatter("헛스윙 <strong>삼진 아웃</strong>. 배트를 휘둘렀는데 맞지 않으면 존 밖의 공이어도 스트라이크입니다.");
        return;
      }
      paint();
      say(`헛스윙입니다. 배트가 나갔는데 맞지 않으면 스트라이크입니다. 스트라이크 <strong>${state.strikes}</strong>개.`);
    },

    foul: () => {
      movePitch(Math.random() > 0.5);
      if (state.strikes < 2) {
        state.strikes += 1;
        paint();
        say(`파울입니다. 파울도 스트라이크로 셉니다. 스트라이크 <strong>${state.strikes}</strong>개.`);
        return;
      }
      paint();
      say("파울입니다. 다만 <strong>2스트라이크에서는 파울로 삼진이 되지 않습니다.</strong> 타자는 계속 버틸 수 있습니다.");
    },

    inplay: () => {
      movePitch(Math.random() > 0.3);
      const roll = Math.random();
      if (roll < 0.32) {
        nextBatter("공을 쳐서 <strong>안타</strong>가 됐습니다. 타자는 1루에 살아 나갑니다.");
        return;
      }
      state.outs += 1;
      nextBatter(
        roll < 0.66
          ? "친 공이 뜬공이 되어 수비가 잡았습니다. <strong>아웃</strong>입니다."
          : "땅볼을 잡아 1루로 던졌습니다. <strong>아웃</strong>입니다."
      );
    },

    reset: () => {
      state.balls = 0;
      state.strikes = 0;
      state.outs = 0;
      if (pitch) pitch.classList.remove("is-shown");
      paint();
      say("처음부터 다시 시작합니다. 아래 버튼을 눌러 공을 하나씩 진행해 보세요.");
    },
  };

  root.querySelectorAll("[data-count-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = actions[button.dataset.countAction];
      if (action) action();
    });
  });

  paint();
}

document.querySelectorAll("[data-count-sim]").forEach(setUp);
