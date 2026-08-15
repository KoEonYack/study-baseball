/**
 * 직관 준비물 체크리스트.
 *
 * 체크 상태를 localStorage에 저장해 경기 당일 다시 열어도 남아 있게 한다.
 * 저장이 막힌 환경(사생활 보호 모드 등)에서도 체크 자체는 정상 동작해야 하므로
 * 저장 실패는 조용히 넘긴다.
 */

const STORAGE_PREFIX = "study-baseball:checklist:";

function readSaved(key) {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_PREFIX + key) || "[]");
  } catch {
    return [];
  }
}

function writeSaved(key, values) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(values));
  } catch {
    // 저장할 수 없는 환경이면 이번 세션 동안만 유지된다
  }
}

function setUp(root) {
  const key = root.dataset.checklist;
  const boxes = Array.from(root.querySelectorAll('input[type="checkbox"][value]'));
  if (boxes.length === 0) return;

  const status = document.querySelector(`[data-checklist-status="${key}"]`);
  const resetButton = document.querySelector(`[data-checklist-reset="${key}"]`);

  const saved = new Set(readSaved(key));
  boxes.forEach((box) => {
    box.checked = saved.has(box.value);
  });

  const sync = () => {
    const checked = boxes.filter((box) => box.checked);
    writeSaved(key, checked.map((box) => box.value));

    if (status) {
      const done = checked.length;
      status.textContent =
        done === boxes.length
          ? `${done} / ${boxes.length} — 준비 끝났습니다. 즐거운 직관 되세요.`
          : `${done} / ${boxes.length} 챙김`;
    }
  };

  boxes.forEach((box) => box.addEventListener("change", sync));

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      boxes.forEach((box) => {
        box.checked = false;
      });
      sync();
    });
  }

  sync();
}

document.querySelectorAll("[data-checklist]").forEach(setUp);
