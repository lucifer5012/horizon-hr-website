  // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 150,
        });

        // Initialize Partners Looping Slider
        const partnersSlider = new Swiper('.partners-slider-loop', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 60, /* Logos ke beech ka gap */
            speed: 5000, /* Speed badha di hai */
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, /* Hover par rukega */
            },
            freeMode: true,
            allowTouchMove: true, /* Drag enable kiya */
        });