const Medicine = require("../models/Medicine.model");

module.exports.medicinescontroller = {
  createMedicine: async function (req, res) {
    try {
      await Medicine.create({
        name: req.body.name,
        onprescription: req.body.onprescription,
        price: req.body.price,
        category: req.body.category,
      });
      res.json("Лекарство добавлено");
    } catch (error) {
      console.log(error.toString());
    }
  },

  deleteMedicinesById: async function (req, res) {
    try {
      const medicine = await Medicine.findByIdAndRemove(req.params.id);
      res.json("Лекарство удалено");
    } catch (error) {
      console.log(error.toString());
    }
  },
  changeMedicineById: async function (req, res) {
    try {
      const medicine = await Medicine.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        onprescription: req.body.onprescription,
        price: req.body.price,
        category: req.body.category,
      });
      res.json("Лекарство изменено");
    } catch (error) {
      console.log(error.toString());
    }
  },
};
