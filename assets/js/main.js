/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * ========================================================
 * Game Inventory Gallery Modal Logic
 * ========================================================
 */
document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll('.game-gallery-btn');
  const mainImg = document.getElementById('gameMainImg');
  const title = document.getElementById('gameModalTitle');
  const thumbContainer = document.getElementById('gameThumbnails');

  if (triggers.length > 0 && mainImg && title && thumbContainer) {
    triggers.forEach(btn => {
      btn.addEventListener('click', function () {
        const imagesStr = this.getAttribute('data-images');
        if (!imagesStr) return;

        const images = imagesStr.split(',');
        title.innerText = this.getAttribute('data-title');

        // โหลดรูปแรกลงจอใหญ่
        mainImg.style.opacity = 0;
        mainImg.src = images[0];
        setTimeout(() => mainImg.style.opacity = 1, 50);

        // ล้างช่องสล็อตเก่าทิ้ง
        thumbContainer.innerHTML = '';

        // สร้างช่องสล็อตใหม่ตามจำนวนรูป
        images.forEach((src, index) => {
          const slot = document.createElement('div');
          slot.className = 'inventory-slot' + (index === 0 ? ' active-slot' : '');

          const thumb = document.createElement('img');
          thumb.src = src;
          slot.appendChild(thumb);

          // เมื่อกดที่ช่องสล็อต
          slot.onclick = function () {
            // เปลี่ยนรูปหลักให้มีจังหวะกระพริบนิดๆ
            mainImg.style.opacity = 0;
            setTimeout(() => {
              mainImg.src = src;
              mainImg.style.opacity = 1;
            }, 150);

            // เปลี่ยนขอบเรืองแสงมาที่สล็อตที่เลือก
            document.querySelectorAll('.inventory-slot').forEach(t => t.classList.remove('active-slot'));
            this.classList.add('active-slot');
          };
          thumbContainer.appendChild(slot);
        });

        // เปิดหน้าต่าง Modal
        const modal = new bootstrap.Modal(document.getElementById('gameGalleryModal'));
        modal.show();
      });
    });
  }
});

/**
 * ========================================================
 * Mobile Module FAB & Auto Merge Animation (Fold Once)
 * ========================================================
 */
document.addEventListener("DOMContentLoaded", function () {
  const fab = document.getElementById('mobile-module-fab');

  // เพิ่มตัวแปรเช็กว่า "พับไปแล้วหรือยัง"
  let hasFolded = false;

  // ตรวจจับการเลื่อนจอ (Scroll)
  window.addEventListener('scroll', () => {
    // ถ้าเป็นหน้าจอคอมพิวเตอร์ (>= 768px) ให้รีเซ็ตค่ากลับเป็นปกติ
    if (window.innerWidth >= 768) {
      document.body.classList.remove('mobile-hide-pills');
      if (fab) fab.classList.remove('show');
      hasFolded = false; // เผื่อเขายืดหดจอ
      return;
    }

    // ถ้าพับไปแล้ว ก็ไม่ต้องทำอะไรต่อ จบปิ๊ง!
    if (hasFolded) return;

    // หาหัวข้อ (Header) ฝั่งที่กำลังเปิดใช้งานอยู่
    const activeHeader = document.querySelector('.tab-pane.active .module-header-title');

    if (activeHeader) {
      const headerRect = activeHeader.getBoundingClientRect();

      // ถ้าเลื่อนจนหัวข้อทะลุขอบจอด้านบนไปแล้ว (น้อยกว่า 50px)
      if (headerRect.bottom < 50) {
        document.body.classList.add('mobile-hide-pills'); // ซ่อนเมนูเดิม (เริ่มแอนิเมชัน)
        if (fab) fab.classList.add('show'); // โชว์ปุ่มกลม
        hasFolded = true; // บันทึกไว้ว่า "พับเรียบร้อยแล้วจ้า" จะได้ไม่กางอีก
      }
      // ลบคำสั่ง else ทิ้งไปเลย เพราะเราจะไม่ให้มันกางออกแล้ว
    }
  });

  // =======================================================
  // โค้ดส่วนที่เหลือ (เวลากดปุ่ม FAB ให้ก๊อปปี้เมนู) ปล่อยไว้เหมือนเดิมครับ
  // =======================================================
  if (fab) {
    fab.addEventListener('click', () => {
      const activePillsContainer = document.querySelector('.tab-pane.active .custom-pills');
      const offcanvasBody = document.getElementById('mobileModuleMenuBody');

      if (activePillsContainer && offcanvasBody) {
        offcanvasBody.innerHTML = ''; // ล้างข้อมูลเก่าออกก่อน

        // โคลนเมนูชุดเดิมมา
        const clonedPills = activePillsContainer.cloneNode(true);
        clonedPills.removeAttribute('id');

        const originalBtns = activePillsContainer.querySelectorAll('.nav-link');
        const clonedBtns = clonedPills.querySelectorAll('.nav-link');

        clonedBtns.forEach((btn, index) => {
          btn.removeAttribute('id');
          btn.removeAttribute('data-bs-target');

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            originalBtns[index].click();

            // ปิดแผงเมนูมือถือ
            const offcanvasEl = document.getElementById('mobileModuleMenu');
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
            bsOffcanvas.hide();

            // เลื่อนจอกลับมาให้เห็นแกลเลอรี่
            setTimeout(() => {
              const activeHeader = document.querySelector('.tab-pane.active .module-header-title');
              if (activeHeader) {
                const y = activeHeader.getBoundingClientRect().top + window.scrollY - 20;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }, 300);
          });
        });

        offcanvasBody.appendChild(clonedPills);
      }
    });
  }

  // เผื่อผู้ใช้กดสลับ Role 
  document.querySelectorAll('.role-animated-btn').forEach(btn => {
    btn.addEventListener('shown.bs.tab', () => {
      hasFolded = false; // รีเซ็ตใหม่เมื่อสลับแท็บ เพื่อให้มันเช็กตำแหน่งใหม่
      document.body.classList.remove('mobile-hide-pills');
      if (fab) fab.classList.remove('show');
      window.dispatchEvent(new Event('scroll'));
    });
  });
});