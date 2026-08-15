/**
 * 공통 내비게이션 동작.
 * - 현재 페이지 링크에 aria-current 표시
 * - 모바일 메뉴 토글
 * - 상단 읽기 진행바
 *
 * 이 파일이 실패해도 헤더 마크업 자체는 HTML에 있으므로 문서를 계속 읽을 수 있다.
 */

function currentFile() {
  const last = window.location.pathname.split("/").pop();
  return last === "" ? "index.html" : last;
}

function markActiveLink() {
  const here = currentFile();
  document.querySelectorAll("[data-nav] a[href]").forEach((link) => {
    const target = link.getAttribute("href").split("/").pop().split("#")[0];
    if (target === here) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function setUpMobileToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // 링크를 누르면 메뉴를 닫는다
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setUpProgressBar() {
  const bar = document.querySelector("[data-progress]");
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

markActiveLink();
setUpMobileToggle();
setUpProgressBar();
