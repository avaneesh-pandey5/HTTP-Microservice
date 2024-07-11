import React, { useState } from "react";
import Product from "./Product";
import ProductsData from "../Data/ProductsData";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const products = ProductsData;
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    company: "",
    category: "",
    availability: "",
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  const applyFilters = () => {
    const newFilteredProducts = products.filter((product) => {
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
    setFilteredProducts(newFilteredProducts);
  };
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Filter
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <div key={index} onClick={() => handleProductClick(product.id)}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
