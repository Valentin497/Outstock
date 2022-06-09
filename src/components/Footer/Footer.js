import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className="p-5 mt-5 d-flex flex-row justify-content-between align-items-center flex-wrap bg-dark">
      <div className="container sitemap-section" style={{ flex: 1 }}>
        <NavLink to="/">Home</NavLink>
        {" - "}
        <NavLink to="/products">Products</NavLink>
        <p className="mt-3 text-muted">Outstock Inc. © 2022</p>
      </div>

      <div
        className="container d-flex justify-content-end gap media-section"
        style={{ flex: 1 }}
      >
        <div className="p-3 card bg-secondary rounded-0 fc">
          <FaFacebookF />
        </div>
        <div className="p-3 card bg-secondary rounded-0 fc">
          <FaInstagram />
        </div>
        <div className="p-3 card bg-secondary rounded-0 fc">
          <FaTwitter />
        </div>
        <div className="p-3 card bg-secondary rounded-0 fc">
          <FaLinkedinIn />
        </div>
      </div>
    </div>
  );
}
