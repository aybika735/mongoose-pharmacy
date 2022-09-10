const { Router } = require("express");
const { medicinescontroller } = require("../controllers/medicines.controller");
const router = Router();

router.post("/medicines/admin", medicinescontroller.createMedicine);

router.delete("/medicines/admin/:id", medicinescontroller.deleteMedicinesById);

router.patch("/medicines/admin/:id", medicinescontroller.changeMedicineById);

module.exports = router;
