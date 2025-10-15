$(document).ready(function() {
            const carousel = $('#carousel');
            const buttons = $('#navButtons button');
            const cardWidth = 340; // Width of card (300px) + gap (20px) + padding effect
            const cardsPerGroup = 4;
            const totalGroups = Math.ceil(12 / cardsPerGroup); // 12 cards / 4 per group = 3 groups

            buttons.each(function(index) {
                $(this).on('click', function() {
                    const scrollTo = index * cardWidth * cardsPerGroup;
                    carousel.animate({
                        scrollLeft: scrollTo
                    }, 500); // Smooth scroll over 500ms
                    buttons.removeClass('active');
                    $(this).addClass('active');
                });
            });

            // Optional: Auto-update active button based on scroll position
            carousel.on('scroll', function() {
                const scrollPosition = carousel.scrollLeft();
                const activeIndex = Math.floor(scrollPosition / (cardWidth * cardsPerGroup));
                buttons.removeClass('active');
                if (activeIndex < totalGroups) {
                    buttons.eq(activeIndex).addClass('active');
                }
            });

            // Set initial active button
            buttons.eq(0).addClass('active');
        });