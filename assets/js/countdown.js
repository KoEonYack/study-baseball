/**
 * 경기일까지 남은 시간 카운터.
 *
 * 대상 요소에 data-countdown="2026-08-22T19:00:00+09:00" 형태로 목표 시각을 준다.
 * 내부 구조는 이 모듈이 직접 만들어 넣는다.
 */

const UNITS = [
  { key: "days", label: "일" },
  { key: "hours", label: "시간" },
  { key: "minutes", label: "분" },
  { key: "seconds", label: "초" },
];

function breakDown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function render(root, target) {
  const clock = document.createElement("div");
  clock.className = "dday__clock";

  const cells = {};
  UNITS.forEach(({ key, label }) => {
    const unit = document.createElement("div");
    unit.className = "dday__unit";

    const num = document.createElement("span");
    num.className = "dday__num";
    num.textContent = "--";

    const cap = document.createElement("span");
    cap.className = "dday__cap";
    cap.textContent = label;

    unit.append(num, cap);
    clock.append(unit);
    cells[key] = num;
  });

  root.append(clock);

  const status = document.createElement("p");
  status.className = "dday__meta";
  status.setAttribute("aria-live", "polite");
  root.append(status);

  const tick = () => {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
      clock.hidden = true;
      status.textContent = "경기 시간입니다. 즐거운 직관 되세요.";
      return false;
    }

    const parts = breakDown(diff);
    UNITS.forEach(({ key }) => {
      cells[key].textContent = String(parts[key]).padStart(2, "0");
    });
    status.textContent = `경기까지 D-${parts.days === 0 ? "DAY" : parts.days}`;
    return true;
  };

  if (tick()) {
    const timer = window.setInterval(() => {
      if (!tick()) window.clearInterval(timer);
    }, 1000);
  }
}

document.querySelectorAll("[data-countdown]").forEach((root) => {
  const target = new Date(root.dataset.countdown);
  if (Number.isNaN(target.getTime())) return;
  render(root, target);
});
