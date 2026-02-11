const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    products: req.body.products,
    totalAmount: req.body.totalAmount
  });

  res.json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("products.product");

  res.json(orders);
};
