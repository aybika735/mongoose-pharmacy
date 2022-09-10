const { Router } = require("express");
const {
  categoriescontroller,
} = require("../controllers/categories.controller");
const router = Router();

router.post("/categories/admin", categoriescontroller.createCategory);

router.delete("/categories/admin:id", categoriescontroller.deleteCategoryById);

router.patch("/categories/admin:id", categoriescontroller.changeCategoryById);
router.get("/categories", categoriescontroller.getCategories);

module.exports = router;
