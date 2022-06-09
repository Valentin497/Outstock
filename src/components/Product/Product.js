import React, { useEffect, useState } from "react";
import {
  addToWishlist,
  productInWishlist,
  removeFromWishlist,
} from "../../services/wishlist.service";

import "./Product.scss";

export default function Product({ product }) {
  // TODO: Ask service if it is or not
  const [inWishlist, setInWishlist] = useState(null);

  useEffect(() => {
    setInWishlist(productInWishlist(product.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  const toggleWishlistState = () => {
    setInWishlist((prevInWishList) => {
      if (prevInWishList) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }

      return !prevInWishList;
    });
  };

  return (
    <div className="basis20" key={`p-${product.id}`}>
      <div className="card fixed-width-card">
        <img
          height="100%"
          width="auto"
          className="card-img-top img-thumbnail"
          src={product.image}
          alt="trending-product"
        />
        <div className="card-body">
          <h5 className="mb-3 card-title text-muted">{product.title}</h5>
          <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
            <span className="card-text">${product.price}</span>
            {inWishlist === false && (
              <button
                type="button"
                className="card-text btn btn-link"
                onClick={() => toggleWishlistState()}
              >
                Add to wishlist
              </button>
            )}

            {inWishlist === true && (
              <button
                type="button"
                className="card-text btn btn-danger"
                onClick={() => toggleWishlistState()}
              >
                Remove from wishlist
              </button>
            )}
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">{product.category}</small>
        </div>
      </div>
    </div>
  );
}
