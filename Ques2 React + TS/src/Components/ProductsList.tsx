import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import Filter from "./Filter";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: "",
    category: "",
    availability: "",
    minPrice: 1,
    maxPrice: 1000000,
    rating: 1,
    productLimit: 10, // Default number of products to display
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (filters.category) {
        const response = await fetch(
          `http://localhost:3000/categories/${filters.category}/products?top=${filters.productLimit}&maxPrice=${filters.maxPrice}&minPrice=${filters.minPrice}`
        );
        const data = await response.json();
        setProducts(data);
        applyFilters();
      } else {
        setProducts([]);
        applyFilters();
      }
    };

    fetchProducts();
  }, [filters.category]);

  const applyFilters = () => {
    let newFilteredProducts = products.filter((product) => {
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

    // Apply product limit
    newFilteredProducts = newFilteredProducts.slice(0, filters.productLimit);

    setFilteredProducts(newFilteredProducts);
  };

  const handleProductClick = (category, id) => {
    navigate(`category/${category}/product/${id}`);
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
          <div
            key={index}
            onClick={() =>
              handleProductClick(product.category, product.productId)
            }
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// import React, { useState, useEffect } from "react";
// import Product from "./Product";
// import Filter from "./Filter";
// import { useNavigate } from "react-router-dom";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     company: "",
//     category: "",
//     availability: "",
//     minPrice: 0,
//     maxPrice: Infinity,
//     rating: 0,
//   });
//   const navigate = useNavigate();
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (filters.category) {
//         const response = await fetch(
//           `http://localhost:3000/categories/${filters.category}/products/top=${}`
//         );
//         const data = await response.json();
//         setProducts(data);
//         setFilteredProducts(data);
//       } else {
//         setProducts([]);
//         setFilteredProducts([]);
//       }
//     };

//     fetchProducts();
//   }, [filters.category]);

//   const applyFilters = () => {
//     const newFilteredProducts = products.filter((product: any) => {
//       return (
//         (filters.company === "" || product.company === filters.company) &&
//         (filters.category === "" || product.category === filters.category) &&
//         (filters.availability === "" ||
//           product.availability === filters.availability) &&
//         (filters.minPrice === 0 || product.price >= filters.minPrice) &&
//         (filters.maxPrice === Infinity || product.price <= filters.maxPrice) &&
//         (filters.rating === 0 || product.rating >= filters.rating)
//       );
//     });
//     setFilteredProducts(newFilteredProducts);
//   };
//   const handleProductClick = (id: number) => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <div>
//       <Filter
//         filters={filters}
//         setFilters={setFilters}
//         applyFilters={applyFilters}
//       />
//       <div className="space-y-4">
//         {filteredProducts.map((product, index) => (
//           <div key={index} onClick={() => handleProductClick(product.id)}>
//             <Product product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
