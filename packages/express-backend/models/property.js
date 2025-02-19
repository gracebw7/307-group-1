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
    }
  },
  { collection: "property_list" }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
