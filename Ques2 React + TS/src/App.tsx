import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductsList";
import ProductDetail from "./Components/ProductDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route
          path="/category/:category/product/:productId"
          element={<ProductDetail />}
        />
      </Routes>
    </Router>
  );
};

export default App;
