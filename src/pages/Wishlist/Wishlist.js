import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Table } from "reactstrap";
import {
  addWishlistListener,
  getWishlist,
  removeFromWishlist,
  removeWishlistListener,
} from "../../services/wishlist.service";

import "./Wishlist.scss";

import wishlistImgSrc from "../../assets/images/wishlist.jpg";

export function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(Object.values(getWishlist()));

    function handleWishlistChange() {
      setItems(Object.values(getWishlist()));
    }

    addWishlistListener(handleWishlistChange);

    return () => removeWishlistListener(handleWishlistChange);
  }, []);

  const removeItem = (item) => {
    removeFromWishlist(item.id);
  };

  return (
    <div className="w-100">
      <div className="card my-4 text-white border-0 rounded-0">
        <img
          className="card-img m-auto img-fluid"
          alt="wishlist"
          src={wishlistImgSrc}
        />
        <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
          <h1 class="card-title w-100 text-center">Wishlist</h1>
          <p class="card-text">
            <NavLink to="/" className="inline-link">
              Home
            </NavLink>{" "}
            / Wishlist
          </p>
        </div>
      </div>
      <div className="container-fluid px-5">
        {items.length > 0 && (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((it, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <th>{it.title}</th>
                  <th>${it.price}</th>
                  <th>
                    <Button
                      type="button"
                      color="danger"
                      onClick={() => removeItem(it)}
                    >
                      Remove
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {items.length === 0 && (
          <div
            className="w-100 text-center d-flex flex-column justify-content-center"
            style={{ minHeight: "300px" }}
          >
            <h3>Your wishlist is empty</h3>
            <p>
              Visit the <NavLink to="/products">catalog</NavLink> to add
              products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
