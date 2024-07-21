import { productSchema } from "../model/product.schema.js";
import mongoose from "mongoose";
import { ApplicationError } from "../../../errorHandler/errorHandler.middleware.js";
import { ObjectId } from "mongodb";

// model for the product using product schema class
const ProductModel = mongoose.model("product", productSchema);
export default class ProductRepository {
  // to add product to database
  async add(name, quantity) {
    try {
      const newProduct = new ProductModel({ name, quantity });
      await newProduct.save();
      return newProduct;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError(500, "Something went wrong");
      }
    }
  }

  // get all data from database
  async getAll() {
    try {
      return ProductModel.find({});
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError(500, "Something went wrong");
      }
    }
  }

  // delete product from database by ID
  async deleteProduct(id) {
    try {
      const ans = await ProductModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return ans;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError(500, "Something went wrong");
      }
    }
  }

  // update product in database by id
  async update(id, number) {
    try {
      const ans = await ProductModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { quantity: number } }
      );
      if (ans != null)
        return await ProductModel.findOne({ _id: new ObjectId(id) });
      else return null;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError(500, "Something went wrong");
      }
    }
  }
}
