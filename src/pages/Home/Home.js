import React, { useEffect, useState } from "react";
import { CardGroup } from "reactstrap";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import Product from "../../components/Product/Product";
import { ControlledProductCarousel } from "../../components/ProductCarousel/ProductCarousel";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import {
  fetchCarouselProducts,
  fetchCategories,
  fetchTrendingProducts,
} from "../../services/products.service";

import "./Home.scss";

/////////////////////////////////////////////////////////////////////////////////

export function Home() {
  const [loadedStatus, setLoadedStatus] = useState({
    carousel: false,
    categories: false,
    trending: false,
  });

  const [carouselItems, setCarouselItems] = useState([]);

  const [categories, setCategories] = useState([]);

  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    console.log("called");
    setLoadedStatus({
      carousel: carouselItems && carouselItems.length > 0,
      categories: categories && categories.length > 0,
      trending: trendingProducts && trendingProducts.length > 0,
    });
  }, [carouselItems, categories, trendingProducts]);

  useEffect(() => {
    fetchCarouselProducts().then((products) => {
      setCarouselItems(
        products.map((p) => ({
          altText: "product-showcase",
          caption: p.title,
          description: p.description,
          key: p.id,
          src: p.image,
        }))
      );
    });

    fetchCategories().then((categories) => {
      setCategories(categories);
    });

    fetchTrendingProducts().then((trending) => {
      setTrendingProducts(trending);
    });
  }, []);

  return (
    <div className="mt-4">
      <section>
        {loadedStatus.carousel ? (
          <ControlledProductCarousel items={carouselItems} />
        ) : (
          <CustomSpinner />
        )}
      </section>

      <section className="mt-5">
        <SectionHeader title="Browse categories" />
        {loadedStatus.categories ? (
          <CardGroup className="card-group-categories">
            {categories &&
              categories.map((c) => <CategoryCard item={c} key={c} />)}
          </CardGroup>
        ) : (
          <CustomSpinner />
        )}
      </section>

      <section className="mt-5">
        <SectionHeader title="Trending now" />
        {loadedStatus.trending ? (
          <div className="d-flex gap-4 justify-content-center align-items-center flex-wrap">
            {trendingProducts &&
              trendingProducts.map((tp) => (
                <Product product={tp} key={tp.title} />
              ))}
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-start"
            style={{ height: "400px" }}
          >
            <CustomSpinner />
          </div>
        )}
      </section>
    </div>
  );
}
