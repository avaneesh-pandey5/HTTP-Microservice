import React from "react";

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-lg">
      <h2 className="text-xl font-bold">{product.productName}</h2>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
      <button
        className={`mt-2 px-4 py-2 text-white rounded ${
          product.availability === "out-of-stock"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500"
        }`}
        disabled={product.availability === "out-of-stock"}
      >
        {product.availability === "out-of-stock" ? "Out of Stock" : "Buy Now"}
      </button>
    </div>
  );
};

export default Product;
