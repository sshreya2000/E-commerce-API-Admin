import mongoose from "mongoose";
// product schema to perform operations to database
export const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});
