import React, { useState } from "react";
import Product from "./Product";
import ProductsData from "../Data/ProductsData";
import Filter from "./Filter";

const ProductList = () => {
  const products = ProductsData;

  const [filters, setFilters] = useState({
    company: "",
    category: "",
    availability: "",
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
  });

  const filteredProducts = products.filter((product) => {
    return (
      (filters.company === "" || product.company === filters.company) &&
      (filters.category === "" || product.category === filters.category) &&
      (filters.availability === "" ||
        product.availability === filters.availability) &&
      (filters.minPrice === 0 || product.price >= filters.minPrice) &&
      (filters.maxPrice === Infinity || product.price <= filters.maxPrice) &&
      (filters.rating === 0 || product.rating >= filters.rating)
    );
  });

  return (
    <div>
      <Filter filters={filters} setFilters={setFilters} />
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
