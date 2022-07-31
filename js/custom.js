const swiper = new Swiper('.mySwiper', {
    // Default parameters
    slidesPerView: 5,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      // when window width is >= 1440px
      1440: {
        slidesPerView: 5,
        spaceBetween: 10
      }
    }
  })