const Basket = require("../models/Basket.model");
const mongoose = require("mongoose");

module.exports.basketscontroller = {
  createBasket: async function (req, res) {
    try {
      await Basket.create({
        client: req.body.client,
        shop: req.body.shop,
        totalprice: req.body.totalprice,
        card: req.body.card,
      });
      res.json("Корзина добавлена");
    } catch (error) {
      console.log(error.toString());
    }
  },
  deleteBasketById: async function (req, res) {
    try {
      const basket = await Basket.findByIdAndRemove(req.params.id);
      res.json("Корзина удалена");
    } catch (error) {
      console.log(error.toString());
    }
  },
  changeBasketById: async function (req, res) {
    try {
      const basket = await Basket.findByIdAndUpdate(req.params.id, {
        client: req.body.client,
        totalprice: req.body.totalprice,
        card: req.body.card,
      });
      res.json("Корзина изменена");
    } catch (error) {
      console.log(error.toString());
    }
  },
  getBaskets: async function (req, res) {
    try {
      const baskets = await Basket.find();
      res.json(baskets);
    } catch (error) {
      console.log(error.toString());
    }
  },
};
