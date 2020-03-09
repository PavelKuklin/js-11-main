import SliderCarusel from './newSlider';

function newSlider() {

  const carousel = new SliderCarusel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    slidesToShow: 4,
    infinity: true,
    responsive: [{
      breackpoint: 1024,
      slideToShow: 3,
    },
    {
      breackpoint: 768,
      slideToShow: 2,
    },
    {
      breackpoint: 576,
      slideToShow: 1,
    },
    ]
  });

  carousel.init();
}

export default newSlider; 