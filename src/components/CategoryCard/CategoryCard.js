import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardText, CardTitle } from "reactstrap";

import "./CategoryCard.scss";

export const CategoryCard = ({ item: categoryName, imgSrc = null }) => {
  const navigate = useNavigate();

  return (
    <Card key={categoryName}>
      <CardImg
        alt="category"
        src={
          imgSrc ??
          "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
        }
        top
        width="100%"
        height="300px"
      />
      <CardImgOverlay>
        <h6
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/products")}
        >
          Discover now
        </h6>
        <CardTitle tag="h5">{categoryName}</CardTitle>
        <CardText>
          <small className="text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            deserunt.
          </small>
        </CardText>
      </CardImgOverlay>
    </Card>
  );
};
