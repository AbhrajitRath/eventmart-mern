const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    vendor: req.user.id
  });

  res.json(product);
};

exports.getProducts = async (req, res) => {
  if (req.query.all === "true") {
    const products = await Product.find();
    return res.json(products);
  }

  const products = await Product.find({ status: "approved" });
  res.json(products);
};



exports.updateStatus = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(product);
};
