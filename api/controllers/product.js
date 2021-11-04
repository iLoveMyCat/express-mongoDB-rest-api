const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((product) => {
      const response = {
        _id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        Request: {
          type: "GET",
          URL: `http://localhost:3000/products/${product._id}`,
        },
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select("name price _id imageURL")
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            _id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            imageURL: product.imageURL,
            Request: {
              type: "GET",
              URL: `http://localhost:3000/products/${product._id}`,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .then((product) => {
      res.status(200).json({
        message: `succesfully served '${product.name}', id: ${product._id}`,
        product: product,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};
exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByIdAndUpdate(productId, { $set: req.body }, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message:
          result.deletedCount > 0
            ? `succesfully deleted product with an id of: ${id}`
            : `Succefully recieved DELETE request, but, ${id} is not found.`,
        deletedCount: result.deletedCount,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err.code || err.message || err,
      });
    });
};
