// import files

import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from "body-parser";
import definition from "./swagger.json" assert { type: "json" };
import errorHandlerMiddleware from "./src/errorHandler/errorHandler.middleware.js";
import { connectToMongooseMongoDB } from "./src/config/mongoConfig.js";
import ProductRouter from "./src/features/product/routes/product.routes.js";

// create server
const app = express();

// to parse req bod to post correctly
app.use(bodyParser.json());

// for all requests related to product, redirect to product routes.
// localhost:4000/api/products
app.use("/products", ProductRouter);

app.use("/api-docs", swagger.serve, swagger.setup(definition));
// default request handler
app.get("/", (req, res) => {
  res.send("Welcome to ecommerce app");
});
// error Handler
app.use(errorHandlerMiddleware);
// server port
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
  connectToMongooseMongoDB();
});
