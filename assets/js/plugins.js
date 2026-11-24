document.addEventListener('DOMContentLoaded', () => {
  // 1. Ініціалізація Typed.js у Hero-секції
  const typedTarget = document.querySelector('#typed-device');
  if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('#typed-device', {
      strings: [
        'ноутбуків',
        'відеокарт',
        'ігрових ПК',
        'комп’ютерів',
        'моніторів'
      ],
      typeSpeed: 65,
      backSpeed: 40,
      backDelay: 1800,
      startDelay: 200,
      loop: true,
      smartBackspace: false // Повністю стирає і заново друкує кожне слово
    });
  }

  // 2. Ініціалізація Swiper.js для секції відгуків
  const swiperContainer = document.querySelector('.testimonials-swiper');
  if (swiperContainer && typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      initialSlide: 0, // Гарантований старт з першого відгуку
      rewind: true,    // Плавне повернення на початок замість проблемного loop при 5 слайдах
      grabCursor: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
  }

  // 3. Ініціалізація Fancybox для галереї виконаних робіт
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox="repair-gallery"]', {
      Thumbs: {
        autoStart: false
      },
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: [],
          right: ['iterateZoom', 'slideshow', 'fullscreen', 'close']
        }
      }
    });
  }
});