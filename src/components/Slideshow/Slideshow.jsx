import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Slideshow.css';
import carousel1 from '../../img/carousel1.jpg';
import carousel2 from '../../img/carousel2.jpg';
import carousel3 from '../../img/carousel3.jpg';

function Slideshow() {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} className="Carousel">
      <div>
        <img src={carousel1} alt="carousel" height="200px" />
      </div>
      <div>
        <img src={carousel2} alt="carousel" height="200px" />
      </div>
      <div>
        <img src={carousel3} alt="carousel" height="200px" />
      </div>
    </Carousel>
  );
}

export default Slideshow;
