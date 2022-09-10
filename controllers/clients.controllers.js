const Client = require("../models/Client.model");

const Medicine = require("../models/Medicine.model");

const Basket = require("../models/Basket.model");
const mongoose = require("mongoose");

module.exports.clientscontroller = {
  createClient: async function (req, res) {
    try {
      await Client.create({
        name: req.body.name,
      });
      res.json("Клиент добавлен");
    } catch (error) {
      console.log(error.toString());
    }
  },

  deleteClientById: async function (req, res) {
    try {
      const client = await Client.findByIdAndRemove(req.params.id);
      res.json("Клиент удален");
    } catch (error) {
      console.log(error.toString());
    }
  },
  changeClientById: async function (req, res) {
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
      res.json("Клиент изменен");
    } catch (error) {
      console.log(error.toString());
    }
  },
  getClients: async function (req, res) {
    try {
      const clients = await Client.find();
      res.json(clients);
    } catch (error) {
      console.log(error.toString());
    }
  },
  // просматривать все лекарства

  getMedicines: async function (req, res) {
    try {
      const medicines = await Medicine.find().populate("category");
      res.json(medicines);
    } catch (error) {
      console.log(error.toString());
    }
  },
  // просматривать все лекарства по определенной категории
  getMedicineByCategory: async function (req, res) {
    try {
      const medicine = await Medicine.find({ category: req.params.id });
      res.json(medicine);
    } catch (error) {
      console.log(error.toString());
    }
  },
  // просматривать определенное лекарство
  getMedicineById: async function (req, res) {
    try {
      const medicine = await Medicine.findById(req.params.id);
      res.json(medicine);
    } catch (error) {
      console.log(error.toString());
    }
  },

  // добавлять определенное лекарство в корзину
  addMedicineToBasket: async function (req, res) {
    const medicines = await Medicine.findByIdAndUpdate(req.params.idMedicine);
    const basket = await Basket.findByIdAndUpdate(req.params.id);

    try {
      if (medicines.onprescription === false) {
        const result = await Basket.findByIdAndUpdate(req.params.id, {
          $push: { shop: req.body.shop },
          totalprice: medicines.price + basket.totalprice,
        });
        res.json(result);
      } else {
        res.json("Лекарство можно добавить только по назаначению врача");
      }
    } catch (error) {
      console.log(error.toString());
    }
  },

  //     удалять лекарство из корзины

  removeMedicineToBasket: async function (req, res) {
    const medicines = await Medicine.findByIdAndUpdate(req.params.idMedicine);
    const basket = await Basket.findByIdAndUpdate(req.params.id);
    try {
      const shop = await Basket.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { shop: req.body.shop },
          totalprice: basket.totalprice - medicines.price,
        },
        { new: true }
      );
      res.json(shop);
    } catch (err) {
      console.log(err);
    }
  },

  // очищать корзину
  clearBasket: async function (req, res) {
    try {
      const clear = await Basket.findByIdAndUpdate(req.params.id, {
        shop: [],
        totalprice: 0,
      });
      res.json(clear);
    } catch (err) {
      console.log(err);
    }
  },
  // Пополнить карту
  topUpTheCard: async function (req, res) {
    const basket = await Basket.findByIdAndUpdate(req.params.id);
    try {
      await Basket.findByIdAndUpdate(req.params.id, {
        card: req.body.card + basket.card,
      });
      res.json(`кошелек пополнен на сумму ${req.body.card} рублей`);
    } catch (err) {
      console.log(err);
    }
  },

  // Сделать покупку
  buyProductsinBasket: async function (req, res) {
    const basket = await Basket.findByIdAndUpdate(req.params.id);
    try {
      if (basket.totalprice <= basket.card) {
        const result = await Basket.findByIdAndUpdate(req.params.id, {
          shop: [],
          totalprice: 0,
          card: basket.card - basket.totalprice,
        });
        res.json("Покупка совершена успешно");
      } else {
        res.json("У вас недостаточно средств на счету, пополните кошёлек");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
