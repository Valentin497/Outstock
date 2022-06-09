import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Spinner } from "reactstrap";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import Product from "../../components/Product/Product";
import {
  fetchAllProducts,
  fetchCategories,
} from "../../services/products.service";

import "./Products.scss";

export function Products() {
  const [selectedCategoryIdx, setCategoryIdx] = useState(-1);

  const [searchString, setSearchString] = useState("");

  const [categories, setCategories] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const [shownProducts, setShownProducts] = useState([]);

  const handleCategoryClick = (idx) => {
    if (allProducts.length === 0) return;
    setCategoryIdx(idx === selectedCategoryIdx ? -1 : idx);
  };

  const handleSearchStringChanged = (str) => {
    if (allProducts.length === 0) return;
    setSearchString(str);
  };

  const initialMountRef = useRef(true);

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchAllProducts().then((products) => {
      setAllProducts(products);
      setShownProducts(products);
    });
  }, []);

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
    } else {
      let finalProducts = [...allProducts];

      if (selectedCategoryIdx !== -1) {
        finalProducts = finalProducts.filter(
          (p) => p.category === categories[selectedCategoryIdx]
        );
      }

      if (searchString) {
        finalProducts = finalProducts.filter((p) =>
          p.title.toUpperCase().includes(searchString.toUpperCase())
        );
      }

      setShownProducts(finalProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryIdx, searchString]);

  return (
    <div className="products-content d-flex flex-row flex-wrap justify-content-center align-items-start">
      {/* Categories filter */}
      <div className="pe-5">
        <h5 className="mb-4">Product Categories</h5>

        {categories.length > 0 ? (
          categories.map((c, i) => (
            <p
              key={c}
              className={`
              text-start
              category-item
              ${i === selectedCategoryIdx ? "category-active" : "text-muted"}
            `}
              onClick={() => handleCategoryClick(i)}
            >
              {c}
            </p>
          ))
        ) : (
          <Spinner />
        )}
      </div>

      {/* Searchbar + catalog */}
      <div style={{ flex: 1 }}>
        <form className="form-inline">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="h-100 input-group-text" id="basic-addon1">
                <FaSearch />
              </span>
            </div>
            <input
              value={searchString}
              onChange={(e) => handleSearchStringChanged(e.target.value)}
              type="text"
              className="form-control form-lw"
              placeholder="Search products.."
              aria-label="products"
              aria-describedby="basic-addon1"
            />
            {searchString !== "" && (
              <div className="h-100 input-group-text">
                <Button close onClick={() => handleSearchStringChanged("")} />
              </div>
            )}
          </div>
        </form>

        {allProducts.length > 0 ? (
          <div className="mt-5 d-flex gap-4 justify-content-start align-items-center flex-wrap products-container">
            {shownProducts.length > 0 ? (
              shownProducts.map((tp) => (
                <Product product={tp} key={`p_${tp.id}`} />
              ))
            ) : (
              <p style={{ height: "700px" }} className="text-muted">
                😞 No product matches the filters
              </p>
            )}
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-start"
            style={{ height: "800px" }}
          >
            <CustomSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
