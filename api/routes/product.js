const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/product");
const verifyAuth = require("../middlewares/verify-authorization");

router.post("/", verifyAuth, productsControllers.createProduct);
router.get("/", productsControllers.getAllProducts);
router.get("/:productId", verifyAuth, productsControllers.getProduct);
router.patch("/:productId", verifyAuth, productsControllers.updateProduct);
router.delete("/:productId", verifyAuth, productsControllers.deleteProduct);

module.exports = router;
