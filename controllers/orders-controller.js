const HttpError = require("../models/http-error");
const Orders = require("../models/orderItems");
const { validationResult } = require("express-validator");

const showAllOrdersByUser = async (req, res, next) => {
    const userId = req.params.userId;
    let orderItems;
    try {
        orderItems = await Orders.find({ user: userId });
      } catch (err) {
        const error = new HttpError(
          "Something went wrong, could not find any orders",
          500
        );
        return next(error);
      }
      if (!orderItems) {
        const error = new HttpError(
          "Could not find any orders for the provided userId",
          404
        );
        return next(error);
      }
      res.json({ orders: orderItems });
}

exports.showAllOrdersByUser = showAllOrdersByUser;