(function () {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("drawer-overlay");
  const nav = document.getElementById("primary-nav");

  if (header && toggle && overlay) {
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
  }
})();

(function () {
  const root = document.getElementById("activity-carousel");
  if (!root) return;

  const viewport = root.querySelector(".activity-carousel__viewport");
  const track = root.querySelector(".activity-carousel__track");
  const slides = track ? track.querySelectorAll(".activity-card") : [];
  const prevBtn = root.querySelector(".activity-carousel__arrow--prev");
  const nextBtn = root.querySelector(".activity-carousel__arrow--next");
  const dots = root.querySelectorAll(".activity-carousel__dot");

  if (!viewport || !track || slides.length === 0) return;

  let index = 0;
  const total = slides.length;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function goTo(i) {
    index = ((i % total) + total) % total;
    update();
  }

  function update() {
    const slide = slides[index];
    if (!slide) return;

    let x = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
    const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
    x = clamp(x, 0, maxScroll);

    track.style.transform = "translateX(" + -x + "px)";

    slides.forEach(function (s, i) {
      s.classList.toggle("is-active", i === index);
    });

    dots.forEach(function (d, i) {
      var on = i === index;
      d.classList.toggle("is-active", on);
      d.setAttribute("aria-selected", String(on));
      d.setAttribute("tabindex", on ? "0" : "-1");
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
    });
  });

  window.addEventListener("resize", function () {
    update();
  });

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(function () {
      update();
    }).observe(viewport);
  }

  update();
})();
