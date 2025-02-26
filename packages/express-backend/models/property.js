import mongoose, { Schema } from "mongoose";

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
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review"
    },
    averageRating: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      default: []
    }
  },
  { collection: "property_list" }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
