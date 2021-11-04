const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/product");

router.post("/", productsControllers.createProduct);
router.get("/", productsControllers.getAllProducts);
router.get("/:productId", productsControllers.getProduct);
router.patch("/:productId", productsControllers.updateProduct);
router.delete("/:productId", productsControllers.deleteProduct);

module.exports = router;
