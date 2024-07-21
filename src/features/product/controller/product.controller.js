import ProductRepository from "../repository/product.repository.js";

export default class ProductController {
  // product repository object using constructor
  constructor() {
    this.productRepository = new ProductRepository();
  }
  // to add product
  async addProduct(req, res) {
    try {
      const { name, quantity } = req.body;
      const createdRecord = await this.productRepository.add(name, quantity);
      if (createdRecord != null)
        res.status(201).json({ data: { product: createdRecord } });
      else res.status(400).send("Something went wrong with database");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }

  //to get all products
  async getProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      if (products.length > 0)
        res.status(200).json({ data: { products: products } });
      else res.status(400).send("Products not found");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }

  // to delete Product by Id
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const ans = await this.productRepository.deleteProduct(id);
      if (ans != null)
        res.status(200).json({ data: { message: "product deleted" } });
      else res.status(400).send("Product not found");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }

  // to update product by id
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const number = req.query.number;
      const ans = await this.productRepository.update(id, number);
      if (ans != null)
        res.status(200).json({
          data: { product: ans },
          message: "updated successfully",
        });
      else res.status(400).send("Product not found");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }
}
