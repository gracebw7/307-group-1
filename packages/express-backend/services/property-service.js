import mongoose from "mongoose";
import propertyModel from "../models/property.js";

mongoose.set("debug", true);

function getProps() {
  return propertyModel.find();
}

function findPropertyById(id) {
  return propertyModel.findById(id);
}

async function removePropReview(id, rev_id) {
  console.log("Removing Property Review");
  try {
    const prop = await findPropertyById(id);
    const reviewIndex = prop.reviews.findIndex(
      (rev) => rev.toString() === rev_id.toString()
    );

    if (reviewIndex !== -1) {
      prop.reviews.splice(reviewIndex, 1);
      const updatedProperty = await prop.save();
      return updatedProperty;
    } else {
      throw new Error("Review id not in property");
    }
  } catch (error) {
    console.error("Error removing review:", error);
  }
}

function addProperty(property) {
  const propertyToAdd = new propertyModel(property);
  const promise = propertyToAdd.save();
  return promise;
}

function deletePropertyById(id) {
  return propertyModel.findByIdAndDelete(id);
}

async function addPropertyReview(id, review_id) {
  try {
    const prop = await findPropertyById(id);
    prop.reviews.push(review_id);
    const updatedProperty = await prop.save();
    return updatedProperty;
  } catch (error) {
    console.error("Error adding review:", error);
  }
}

function getPropertyReviewsById(id) {
  const property = findPropertyById(id);
}

export default {
  getProps,
  findPropertyById,
  addProperty,
  deletePropertyById,
  addPropertyReview,
  deletePropertyById,
  removePropReview
};
