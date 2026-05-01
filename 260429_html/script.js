(function () {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("drawer-overlay");
  const nav = document.getElementById("primary-nav");

  if (!header || !toggle || !overlay) return;

  function setOpen(open) {
    header.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("drawer-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    overlay.setAttribute("aria-hidden", String(!open));
  }

  function closeMenu() {
    setOpen(false);
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-menu-open"));
  });

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("is-menu-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          closeMenu();
        }
      });
    });
  }

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 769px)").matches) {
      closeMenu();
    }
  });
})();
