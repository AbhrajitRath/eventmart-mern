import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <Link to="/">EventMart</Link>
      </div>

      <div>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>

        {/* Vendor link */}
        {user && user.role === "vendor" && (
          <Link to="/add-product">Add Product</Link>
        )}

        {/* Admin link */}
        {user && user.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
