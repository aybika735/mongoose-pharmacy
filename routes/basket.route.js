const { Router } = require("express");
const { basketscontroller } = require("../controllers/basket.controller");
const router = Router();

router.post("/basket", basketscontroller.createBasket);

router.delete("/basket/:id", basketscontroller.deleteBasketById);

router.patch("/basket/:id", basketscontroller.changeBasketById);
router.get("/basket", basketscontroller.getBaskets);

module.exports = router;
