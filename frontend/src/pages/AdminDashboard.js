import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  if (user && user.role === "admin") {
    fetchProducts();
  }
}, [user]);


  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products?all=true");
    setProducts(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/products/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();
  };

  if (!user || user.role !== "admin") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "50px auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Admin Dashboard</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Status: {p.status}</p>

          {p.status === "pending" && (
            <>
              <button
                onClick={() => updateStatus(p._id, "approved")}
                style={{
                  marginRight: "10px",
                  background: "#10b981",
                  border: "none",
                  padding: "6px 12px",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(p._id, "rejected")}
                style={{
                  background: "#ef4444",
                  border: "none",
                  padding: "6px 12px",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
