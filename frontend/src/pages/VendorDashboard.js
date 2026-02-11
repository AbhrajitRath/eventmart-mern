import { Link } from "react-router-dom";

function VendorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "vendor") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Vendor Dashboard</h2>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        }}
      >
        <h3>Welcome, {user.name}</h3>
        <p style={{ marginBottom: "20px" }}>
          Manage your products and add new listings.
        </p>

        <Link
          to="/add-product"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
}

export default VendorDashboard;
