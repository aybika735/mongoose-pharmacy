const { Router } = require("express");
const { clientscontroller } = require("../controllers/clients.controllers");
const router = Router();

router.post("/clients", clientscontroller.createClient);
router.delete("/clients/:id", clientscontroller.deleteClientById);
router.patch("/clients/:id", clientscontroller.changeClientById);
router.get("/clients", clientscontroller.getClients);
router.get("/medicines", clientscontroller.getMedicines);
router.get("/medicines/category/:id", clientscontroller.getMedicineByCategory);
router.get("/medicines/:id", clientscontroller.getMedicineById);
router.patch("/add/:id/:idMedicine", clientscontroller.addMedicineToBasket);
router.patch(
  "/deleted/:id/:idMedicine",
  clientscontroller.removeMedicineToBasket
);
router.patch("/clear/:id", clientscontroller.clearBasket);
router.patch("/topup/:id", clientscontroller.topUpTheCard);
router.patch("/buyproducts/:id", clientscontroller.buyProductsinBasket);

module.exports = router;
