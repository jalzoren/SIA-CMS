   $(document).ready(function() {
        $("#nav-container").load("./components/nav.html", function() {
            $('.hamburger').on('click', function(e) {
                e.preventDefault();
                const $navMenu = $('.nav-menu');
                const isOpen = $(this).attr('aria-expanded') === 'true';
                
                $(this).attr('aria-expanded', !isOpen);
                $navMenu.toggleClass('open');
                $('.hamburger-icon').text(isOpen ? '☰' : '✕');
            });

            $('.dropdown > a').on('click', function(e) {
                if ($(window).width() <= 768) {
                    e.preventDefault();
                    const $dropdown = $(this).parent('.dropdown');
                    const isActive = $dropdown.hasClass('active');

                    $('.dropdown').removeClass('active');
                    $('.dropdown-content').slideUp(200);
                    $('.dropdown > a').attr('aria-expanded', 'false');

                    if (!isActive) {
                        $dropdown.addClass('active');
                        $(this).next('.dropdown-content').slideDown(200);
                        $(this).attr('aria-expanded', 'true');
                    }
                }
            });

            $(document).on('click', function(e) {
                if ($(window).width() <= 768 && !$(e.target).closest('.hamburger').length && !$(e.target).closest('.nav-menu').length) {
                    $('.nav-menu').removeClass('open');
                    $('.hamburger').attr('aria-expanded', 'false');
                    $('.hamburger-icon').text('☰');
                    $('.dropdown').removeClass('active');
                    $('.dropdown-content').slideUp(200);
                    $('.dropdown > a').attr('aria-expanded', 'false');
                }
            });

            $(window).on('resize', function() {
                if ($(window).width() > 768) {
                    $('.nav-menu').removeClass('open');
                    $('.hamburger').attr('aria-expanded', 'false');
                    $('.hamburger-icon').text('☰');
                    $('.dropdown').removeClass('active');
                    $('.dropdown-content').hide();
                    $('.dropdown > a').attr('aria-expanded', 'false');
                }
            });

            const path = window.location.pathname.toLowerCase();
            if (path === '/' || path.endsWith('/index.html')) {
                $('#nav-home').addClass('active');
            } else if (path.includes('book.html')) {
                $('#nav-book').addClass('active');
            }
        });

        $("#footer-container").load("./components/footer.html");

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
    });

    $(document).ready(function() {
    // Existing nav logic
    const path = window.location.pathname.toLowerCase();
    if (path === '/' || path.endsWith('/index.html')) {
        $('#nav-home').addClass('active');
        $('#book-appointment').addClass('active'); // Make button active on homepage
    }


        $(document).ready(function() {
            let currentSlide = 0;
            const $slides = $('.carousel-item');
            const totalSlides = $slides.length;

            function moveSlide(direction) {
                currentSlide += direction;

                if (currentSlide >= totalSlides) {
                    currentSlide = 0;
                } else if (currentSlide < 0) {
                    currentSlide = totalSlides - 1;
                }

                $('#carousel').css('transform', `translateX(-${currentSlide * 100}%)`);
            }

            $('.prev').click(function() {
                moveSlide(-1);
            });

            $('.next').click(function() {
                moveSlide(1);
            });
        });

});