const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewars");
const ctrl = require("../../controllers/products");
//GET /api/products
router.get("/", authenticate, ctrl.getAll);

router.get("/:productsId", ctrl.getById);

router.post("/", authenticate, ctrl.addItem);

router.put("/:productsId", ctrl.updateItem);

router.delete("/:productsId", ctrl.deleteItem);

router.patch("/:productsId/active", ctrl.updateActiveItem);

module.exports = router;
