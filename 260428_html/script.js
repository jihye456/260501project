(function () {
    const toggleBtn = document.querySelector(".menu-toggle");
    const overlay = document.querySelector("[data-drawer-overlay]");
    const drawer = document.getElementById("mobileDrawer");
    const closeBtn = document.querySelector(".drawer-close");

    if (!toggleBtn || !overlay || !drawer || !closeBtn) return;

    const focusableSelector = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    function isOpen() {
        return document.body.classList.contains("drawer-open");
    }

    function setAria(open) {
        toggleBtn.setAttribute("aria-expanded", String(open));
        drawer.setAttribute("aria-hidden", String(!open));
        toggleBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    }

    function openDrawer() {
        if (isOpen()) return;
        document.body.classList.add("drawer-open");
        setAria(true);
        const first = drawer.querySelector(focusableSelector);
        if (first) first.focus();
    }

    function closeDrawer() {
        if (!isOpen()) return;
        document.body.classList.remove("drawer-open");
        setAria(false);
        toggleBtn.focus();
    }

    toggleBtn.addEventListener("click", () => {
        if (isOpen()) closeDrawer();
        else openDrawer();
    });

    overlay.addEventListener("click", closeDrawer);
    closeBtn.addEventListener("click", closeDrawer);

    drawer.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.tagName === "A") closeDrawer();
    });

    document.addEventListener("keydown", (e) => {
        if (!isOpen()) return;
        if (e.key === "Escape") {
            e.preventDefault();
            closeDrawer();
            return;
        }

        if (e.key !== "Tab") return;
        const items = Array.from(drawer.querySelectorAll(focusableSelector)).filter(
            (el) => el.offsetParent !== null
        );
        if (items.length === 0) return;

        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
            if (active === first || !drawer.contains(active)) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (active === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
})();

(function () {
    const el = document.querySelector(".hero .swiper");
    if (!el || typeof window.Swiper !== "function") return;

    // eslint-disable-next-line no-new
    new window.Swiper(el, {
        loop: true,
        speed: 650,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".hero .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".hero .swiper-button-next",
            prevEl: ".hero .swiper-button-prev",
        },
    });
})();

(function () {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
