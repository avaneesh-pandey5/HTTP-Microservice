import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState([]);
  const { category, productId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:3000/categories/${category}/products/${productId}`
      );
      const data = await response.json();
      setProductDetail(data);
    };

    fetchProducts();
  }, []);
  console.log(productDetail);

  if (!productDetail) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{productDetail.productDetailName}</h2>
      <p>Price: ${productDetail.price}</p>
      <p>Rating: {productDetail.rating}</p>
      <p>Discount: {productDetail.discount}%</p>
      <p>Availability: {productDetail.availability}</p>
      <button
        className={`mt-2 px-4 py-2 text-white rounded ${
          productDetail.availability === "out-of-stock"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500"
        }`}
        disabled={productDetail.availability === "out-of-stock"}
      >
        {productDetail.availability === "out-of-stock"
          ? "Out of Stock"
          : "Buy Now"}
      </button>
    </div>
  );
};

export default ProductDetail;
