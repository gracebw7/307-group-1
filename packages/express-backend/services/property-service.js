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

function getProps() {
  return propertyModel.find();
}

function findPropertyById(id) {
  return propertyModel.findById(id);
}

async function removePropReview(id, rev_id) {
  console.log("Removing Property Review");
  findPropertyById(id)
    .then((prop) => {
      const revId = new mongoose.Types.ObjectId(rev_id);
      if (prop["reviews"].includes(revId)) {
        prop["reviews"].splice(
          prop["reviews"].findIndex(revId),
          1
        );
      } else {
        throw new Error("Review id not in property");
      }
    })
    .catch(console.log((error) => console.error(error)));
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
  findPropertyById(id)
    .then((prop) => {
      prop.reviews.push(review_id);
      return prop.save();
    })
    .catch(console.log((error) => console.error(error)));
}

/*
  const property = findPropertyById(id);
  console.log(`Property found ${property}`);
  if (property.reviews == undefined) {
    property.reviews = [review_id];
  } else {
    property.reviews.push(review_id);
  }
  const promise = property.save();
  return promise;
  */

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
