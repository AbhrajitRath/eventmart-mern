const express = require("express");
const router = express.Router();

const { addProduct, getProducts, updateStatus } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addProduct);
router.get("/", getProducts);
router.put("/:id", protect, updateStatus);

module.exports = router;
