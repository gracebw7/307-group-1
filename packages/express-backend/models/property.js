import mongoose, { Schema } from "mongoose";
import Review from "../models/review.js";

const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    manager: {
      type: String,
      trim: true
    },
    tags: {
      type: [String]
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review"
    }
  },
  { collection: "property_list" }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
