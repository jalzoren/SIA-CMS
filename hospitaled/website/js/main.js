$(document).ready(function () {
  /** ---------------------------
   *  LOAD NAVIGATION COMPONENT
   * --------------------------- */
  $("#nav-container").load(
    "/SIA-CMS/hospitaled/website/components/nav.html",
    function () {
      /** ---------------------------
       *  HAMBURGER MENU TOGGLE
       * --------------------------- */
      $(".hamburger").on("click", function (e) {
        e.preventDefault();

        const $navMenu = $(".nav-menu");
        const isOpen = $(this).attr("aria-expanded") === "true";

        $(this).attr("aria-expanded", !isOpen);
        $navMenu.toggleClass("open");
        $(".hamburger-icon").text(isOpen ? "☰" : "✕");
      });

      /** ---------------------------
       *  DROPDOWN MENU (MOBILE)
       * --------------------------- */
      $(".dropdown > a").on("click", function (e) {
        if ($(window).width() <= 768) {
          e.preventDefault();
          const $dropdown = $(this).parent(".dropdown");
          const isActive = $dropdown.hasClass("active");

          $(".dropdown").removeClass("active");
          $(".dropdown-content").slideUp(200);
          $(".dropdown > a").attr("aria-expanded", "false");

          if (!isActive) {
            $dropdown.addClass("active");
            $(this).next(".dropdown-content").slideDown(200);
            $(this).attr("aria-expanded", "true");
          }
        }
      });

      /** ---------------------------
       *  CLICK OUTSIDE TO CLOSE NAV (MOBILE)
       * --------------------------- */
      $(document).on("click", function (e) {
        if (
          $(window).width() <= 768 &&
          !$(e.target).closest(".hamburger, .nav-menu").length
        ) {
          $(".nav-menu").removeClass("open");
          $(".hamburger").attr("aria-expanded", "false");
          $(".hamburger-icon").text("☰");
          $(".dropdown").removeClass("active");
          $(".dropdown-content").slideUp(200);
          $(".dropdown > a").attr("aria-expanded", "false");
        }
      });

      /** ---------------------------
       *  RESET MENU WHEN RESIZED TO DESKTOP
       * --------------------------- */
      $(window).on("resize", function () {
        if ($(window).width() > 768) {
          $(".nav-menu").removeClass("open");
          $(".hamburger").attr("aria-expanded", "false");
          $(".hamburger-icon").text("☰");
          $(".dropdown").removeClass("active");
          $(".dropdown-content").hide();
          $(".dropdown > a").attr("aria-expanded", "false");
        }
      });

      /** ---------------------------
       *  HIGHLIGHT ACTIVE NAV ITEM
       * --------------------------- */
      const path = window.location.pathname.toLowerCase();

      // Remove all active states first
      $(".nav-menu a").removeClass("active");
      $(".dropdown").removeClass("active");

      if (
        path.endsWith("index.html") ||
        path === "/" ||
        path.endsWith("/website/")
      ) {
        $("#nav-home").addClass("active");
      } else if (path.includes("services.html")) {
        $("a[href*='services.html']").addClass("active");
      } else if (path.includes("doctors.html")) {
        $("a[href*='doctors.html']").addClass("active");
      } else if (path.includes("news.html")) {
        // Highlight News section
        $("#newsDropdownBtn, #newsLink").addClass("active");
        $("#newsDropdownBtn").parent(".dropdown").addClass("active");
        $("#newsDropdownBtn").next(".dropdown-content").show();
      } else if (path.includes("announcement.html")) {
        // Highlight Announcements section
        $("#newsDropdownBtn, #announcementLink").addClass("active");
        $("#newsDropdownBtn").parent(".dropdown").addClass("active");
        $("#newsDropdownBtn").next(".dropdown-content").show();
      } else if (path.includes("careers.html")) {
        $("a[href*='careers.html']").addClass("active");
      } else if (path.includes("about.html")) {
        $("a[href*='about.html']").addClass("active");
      } else if (path.includes("contact.html")) {
        $("a[href*='contact.html']").addClass("active");
      } else if (path.includes("book.html")) {
        $("#nav-book").addClass("active");
      }
    }
  );

  /** ---------------------------
   *  LOAD FOOTER COMPONENT
   * --------------------------- */
  $("#footer-container").load(
    "/SIA-CMS/hospitaled/website/components/footer.html"
  );

  /** ---------------------------
   *  HERO CAROUSEL
   * --------------------------- */
  let currentSlide = 0;
  const $slides = $(".main-hero .carousel-item");
  const slideCount = $slides.length;

  function showSlide(index) {
    $slides.removeClass("active").eq(index).addClass("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }

  $(".main-hero .hero-nav.next").on("click", nextSlide);
  $(".main-hero .hero-nav.prev").on("click", function () {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  });

  showSlide(currentSlide);
  setInterval(nextSlide, 5000);

  /** ---------------------------
   *  FAQ ACCORDION (IF PRESENT)
   * --------------------------- */
  if ($("#faq-accordion").length) {
    $("#faq-accordion").accordion({
      heightStyle: "content",
      collapsible: true,
      active: false,
      animate: 250,
    });
  }
});
