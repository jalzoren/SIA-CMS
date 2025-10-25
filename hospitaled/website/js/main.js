$(document).ready(function () {

    /** ---------------------------
     *  LOAD NAVIGATION COMPONENT
     * --------------------------- */
    $("#nav-container").load("/SIA-CMS/hospitaled/website/components/nav.html", function () {

        // === HAMBURGER MENU TOGGLE ===
        $('.hamburger').on('click', function (e) {
            e.preventDefault();

            const $navMenu = $('.nav-menu');
            const isOpen = $(this).attr('aria-expanded') === 'true';

            $(this).attr('aria-expanded', !isOpen);
            $navMenu.toggleClass('open');
            $('.hamburger-icon').text(isOpen ? '☰' : '✕');
        });

        // === DROPDOWN MENU (MOBILE) ===
        $('.dropdown > a').on('click', function (e) {
            if ($(window).width() <= 768) {
                e.preventDefault();
                const $dropdown = $(this).parent('.dropdown');
                const isActive = $dropdown.hasClass('active');

                // Close all dropdowns first
                $('.dropdown').removeClass('active');
                $('.dropdown-content').slideUp(200);
                $('.dropdown > a').attr('aria-expanded', 'false');

                // Open clicked one if it was not active
                if (!isActive) {
                    $dropdown.addClass('active');
                    $(this).next('.dropdown-content').slideDown(200);
                    $(this).attr('aria-expanded', 'true');
                }
            }
        });

        // === CLICK OUTSIDE TO CLOSE NAV (MOBILE) ===
        $(document).on('click', function (e) {
            if (
                $(window).width() <= 768 &&
                !$(e.target).closest('.hamburger, .nav-menu').length
            ) {
                $('.nav-menu').removeClass('open');
                $('.hamburger').attr('aria-expanded', 'false');
                $('.hamburger-icon').text('☰');
                $('.dropdown').removeClass('active');
                $('.dropdown-content').slideUp(200);
                $('.dropdown > a').attr('aria-expanded', 'false');
            }
        });

        // === RESET MENU WHEN RESIZING TO DESKTOP ===
        $(window).on('resize', function () {
            if ($(window).width() > 768) {
                $('.nav-menu').removeClass('open');
                $('.hamburger').attr('aria-expanded', 'false');
                $('.hamburger-icon').text('☰');
                $('.dropdown').removeClass('active');
                $('.dropdown-content').hide();
                $('.dropdown > a').attr('aria-expanded', 'false');
            }
        });

        // === HIGHLIGHT ACTIVE NAV ITEM ===
        const path = window.location.pathname.toLowerCase();
        if (path === '/' || path.endsWith('/SIA-CMS/hospitaled/website/index.html')) {
            $('#nav-home').addClass('active');
            $('#book-appointment').addClass('active'); // highlight homepage button if needed
        } else if (path.includes('book.html')) {
            $('#nav-book').addClass('active');
        }
    });


    /** ---------------------------
     *  LOAD FOOTER COMPONENT
     * --------------------------- */
    $("#footer-container").load("/SIA-CMS/hospitaled/website/components/footer.html");


    /** ---------------------------
     *  HERO CAROUSEL (FADE OR SLIDE)
     * --------------------------- */
    let currentSlide = 0;
    const $slides = $('.main-hero .carousel-item');
    const slideCount = $slides.length;

    function showSlide(index) {
        $slides.removeClass('active').eq(index).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }

    $('.main-hero .hero-nav.next').on('click', nextSlide);
    $('.main-hero .hero-nav.prev').on('click', prevSlide);

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);



    $(document).ready(function () {
  // Accordion setup
  $("#faq-accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    active: false,
    animate: 250,
  });


  // Mobile nav toggle
  $(".hamburger").on("click", function () {
    $(".nav-menu").toggleClass("open");
  });

  // Simple hero carousel rotation
  let index = 0;
  const items = $("#hero-carousel .carousel-item");
  setInterval(() => {
    items.removeClass("active").eq(index).addClass("active");
    index = (index + 1) % items.length;
    $("#hero-carousel").css("transform", `translateX(-${index * 100}%)`);
  }, 5000);
});



    
});
