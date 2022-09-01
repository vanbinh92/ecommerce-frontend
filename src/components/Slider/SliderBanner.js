import React, { useEffect, useState } from "react";
import slides from "./dataSlider";
import style from "./Slider.module.css";

function SliderBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide < slides.length - 1 ? currentSlide + 1 : 0
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  function switchIndex(index) {
    setCurrentSlide(index);
  }
  return (
    <>
      <div className={`${style.container}`}>
        <div className={style.carousel}>
          <div className={style["carousel-inner"]}>
            {slides.length > 0
              ? slides.map((slide, index) => {
                  return (
                    <div
                      className={style["carousel-item"]}
                      style={{
                        transform: `translateX(${-currentSlide * 100}%)`,
                      }}
                      key={index}
                    >
                      <img src={slide} alt="slider" />
                    </div>
                  );
                })
              : null}
          </div>
          <div className={style["carousel-indicators"]}>
            {slides.length > 0
              ? slides.map((_, index) => {
                  return (
                    <button
                      key={index}
                      className={`${style["carousel-indicator-item"]} ${
                        currentSlide === index ? style.active : ""
                      }`}
                      onClick={() => {
                        switchIndex(index);
                      }}
                    ></button>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderBanner;
