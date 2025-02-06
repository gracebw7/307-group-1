import mongoose from "mongoose";
import propertyModel from "../models/property.js";

mongoose.set("debug", true);

/*
mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
*/

function getProperties() {
  return propertyModel.find();
}

function findPropertyById(id) {
  return propertyModel.findById(id);
}

function addProperty(property) {
  const propertyToAdd = new propertyModel(property);
  const promise = propertyToAdd.save();
  return promise;
}

function deletePropertyById(id) {
  return propertyModel.findByIdAndDelete(id);
}

function addReview(id, review_id) {
  const property = findPropertyById(id);
  property.reviews.push(review_id);
  const promise = property.save();
  return promise;
}

export default {
  getProperties,
  findPropertyById,
  addProperty,
  deletePropertyById
};
