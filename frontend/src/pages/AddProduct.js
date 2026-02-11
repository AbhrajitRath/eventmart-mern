import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product submitted for admin approval");

      // Clear form
      setForm({
        name: "",
        description: "",
        price: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  // Protect page for vendors only
  if (!user || user.role !== "vendor") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>Only vendors can add products.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
