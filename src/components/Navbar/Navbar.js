import React, { useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";
import {
  addWishlistListener,
  getWishlist,
  removeWishlistListener,
} from "../../services/wishlist.service";

import "./Navbar.scss";

export default function AppNavbar() {
  const isMobile = useMediaPredicate("(max-width: 768px)");

  const [wishlistItemCount, setWishlistCount] = useState(null);

  useEffect(() => {
    function handleWishlistChange(wishlistLength) {
      setWishlistCount(wishlistLength);
    }

    setWishlistCount(Object.keys(getWishlist()).length);

    addWishlistListener(handleWishlistChange);

    return () => removeWishlistListener(handleWishlistChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navbar className="border-bottom navbar-custom" expand="md" light>
      {!isMobile && (
        <>
          <Nav>
            <NavItem>
              <NavLink className="nav-first" tag={RRNavLink} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/products">
                Products
              </NavLink>
            </NavItem>
          </Nav>

          <NavbarBrand href="/">
            <h2>
              Outstock<small className="text-muted">™</small>
            </h2>
          </NavbarBrand>

          <Nav>
            <NavItem>
              {wishlistItemCount !== null && (
                <NavLink className="nav-last" tag={RRNavLink} to="/wishlist">
                  Wishlist ({wishlistItemCount})
                </NavLink>
              )}

              {wishlistItemCount === null && <Spinner size="sm" />}
            </NavItem>
          </Nav>
        </>
      )}

      {isMobile && (
        <>
          <NavbarBrand href="/" className="w-100 text-center">
            <h2>
              Outstock<small className="text-muted">™</small>
            </h2>
          </NavbarBrand>
          <Nav className="w-100 d-flex flex-row">
            <NavItem>
              <NavLink className="nav-first" tag={RRNavLink} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/products">
                Products
              </NavLink>
            </NavItem>
            <NavItem className="text-end" style={{ flex: 1 }}>
              {wishlistItemCount !== null && (
                <NavLink className="nav-last" tag={RRNavLink} to="/wishlist">
                  Wishlist ({wishlistItemCount})
                </NavLink>
              )}

              {wishlistItemCount === null && <Spinner size="sm" />}
            </NavItem>
          </Nav>
        </>
      )}
    </Navbar>
  );
}
