import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
} from "reactstrap";

import "./ProductCarousel.scss";

export const ControlledProductCarousel = ({ items }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const [inAnimation, setInAnimation] = useState(false);

  const navigate = useNavigate();

  const goToPrevious = () => {
    if (inAnimation) return;
    setActiveIdx(activeIdx + 1 === items.length ? 0 : activeIdx + 1);
  };

  const goToNext = () => {
    if (inAnimation) return;
    setActiveIdx(activeIdx - 1 < 0 ? items.length - 1 : activeIdx - 1);
  };

  const goToProductsPage = () => {
    navigate("/products");
  };

  return (
    <>
      <h6 className="mt-1 mobile-only text-center">
        {items[activeIdx].caption}
      </h6>
      <p className="mobile-only text-center text-muted">
        {items[activeIdx].description}
      </p>
      <Carousel activeIndex={activeIdx} previous={goToPrevious} next={goToNext}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIdx}
          onClickHandler={(newIndex) => {
            if (inAnimation) return;
            setActiveIdx(newIndex);
          }}
        />

        {items.map((i) => (
          <CarouselItem
            key={i.key}
            onExited={() => setInAnimation(false)}
            onExiting={() => setInAnimation(true)}
          >
            <img
              src={i.src}
              className="d-block img-fluid"
              alt={items.altText}
            />
            <div className="carousel-caption d-none d-md-block ml-auto mr-auto">
              <h5>{i.caption}</h5>
              <p>{i.description}</p>
              <Button color="secondary" onClick={() => goToProductsPage()}>
                Discover now
              </Button>
            </div>
          </CarouselItem>
        ))}

        <CarouselControl
          directionText="Prev"
          direction="prev"
          onClickHandler={goToPrevious}
        />
        <CarouselControl
          directionText="Next"
          direction="next"
          onClickHandler={goToNext}
        />
      </Carousel>
    </>
  );
};
