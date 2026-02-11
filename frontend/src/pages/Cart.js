import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "right" }}>
            Total: ₹ {getTotal()}
          </h3>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "10px 20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
