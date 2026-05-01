(function () {
    if (typeof fullpage === 'undefined') return;

    function syncSectionTextAnim(destination) {
        var sections = document.querySelectorAll('#fullpage .section');
        var el = destination && destination.item ? destination.item : document.querySelector('#fullpage .section.active');
        if (!el) el = document.querySelector('#fullpage .section');
        sections.forEach(function (sec) {
            sec.classList.toggle('fp-animate', !!(el && sec === el));
        });
    }

    var api = new fullpage('#fullpage', {
        anchors: ['company', 'product', 'online', 'community', 'footer'],
        menu: '#header-menu',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['회사소개', '제품소개', '온라인', '커뮤니티', '푸터'],
        showActiveTooltip: false,
        scrollingSpeed: 700,
        autoScrolling: true,
        scrollHorizontally: false,
        credits: { enabled: true },
        afterRender: function () {
            requestAnimationFrame(function () {
                syncSectionTextAnim(null);
            });
        },
        afterLoad: function (_origin, destination) {
            syncSectionTextAnim(destination);
        },
    });

    var topBtn = document.getElementById('footer-top-btn');
    if (topBtn) {
        topBtn.addEventListener('click', function () {
            var dest = api && typeof api.moveTo === 'function' ? api : typeof fullpage_api !== 'undefined' ? fullpage_api : null;
            if (dest && typeof dest.moveTo === 'function') {
                dest.moveTo(1);
            } else {
                window.location.hash = 'company';
            }
        });
    }
})();
