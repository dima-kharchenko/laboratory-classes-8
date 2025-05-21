const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  const { name } = request.body;

  const product = await Product.findByName(name);
  if (!product) {
    return response.status(STATUS_CODE.NOT_FOUND).json({ error: "Product not found." });
  }
  await Cart.add(product);

  response.status(STATUS_CODE.OK);
};

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};
