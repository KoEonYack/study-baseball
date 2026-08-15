/**
 * 전광판 읽기 연습.
 *
 * 아래 설명 항목을 누르면 전광판에서 해당하는 칸이 강조된다.
 * 경기장에서 전광판을 봤을 때 어디를 봐야 하는지 눈에 익히는 것이 목적이다.
 */

const HIGHLIGHT = "outline:3px solid var(--brand);outline-offset:-3px;";

function setUp(root) {
  const buttons = Array.from(root.querySelectorAll("[data-sb-key]"));
  const explain = root.querySelector("[data-sb-explain]");
  if (buttons.length === 0) return;

  const clear = () => {
    root.querySelectorAll("[data-sb-cell]").forEach((cell) => {
      cell.style.cssText = "";
    });
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
  };

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const key = button.dataset.sbKey;
      const already = button.getAttribute("aria-pressed") === "true";
      clear();

      if (already) {
        if (explain) explain.textContent = "설명 항목을 누르면 전광판에서 해당하는 칸이 표시됩니다.";
        return;
      }

      button.setAttribute("aria-pressed", "true");
      root.querySelectorAll(`[data-sb-cell="${key}"]`).forEach((cell) => {
        cell.style.cssText = HIGHLIGHT;
      });
      if (explain) explain.textContent = button.dataset.sbExplain || "";
    });
  });
}

document.querySelectorAll("[data-scoreboard]").forEach(setUp);
