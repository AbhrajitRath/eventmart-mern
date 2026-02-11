import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...existingCart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Product added to cart");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        Available Products
      </h2>

      <div className="products">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>₹ {p.price}</strong></p>

            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
