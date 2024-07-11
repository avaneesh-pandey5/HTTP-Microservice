import React from "react";
import Product from "./Product";
import ProductList from "../Data/ProductList";

const ProductsList = () => {
  const products = ProductList;

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
