import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
  },

  name: {
    type: String,
  },

  price: {
    type: Number,
  },

  imageurl: {
    type: String,
  },

  desc: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;