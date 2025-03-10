import mongoose from "mongoose";
import reviewModel from "../models/review.js";

mongoose.set("debug", true);

// Fetch all reviews
async function getReviews() {
  try {
    return await reviewModel.find();
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw new Error("Error fetching reviews");
  }
}

// Fetch review by ID
async function getReviewById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid review ID");
    }
    const review = await reviewModel.findById(id);
    if (!review) {
      throw new Error("Review not found");
    }
    return review;
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    throw error;
  }
}

// Add a new review
async function addReview(review, property_id) {
  if (!property_id) {
    throw new Error("Property ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(property_id)) {
    throw new Error("Invalid property ID");
  }
  const reviewToAdd = new reviewModel(review);
  // Use the 'new' operator when converting property_id
  reviewToAdd.property = new mongoose.Types.ObjectId(
    property_id
  );

  try {
    const savedReview = await reviewToAdd.save();
    return savedReview;
  } catch (error) {
    console.error("Error adding review:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      throw error; // Rethrow the validation error to be caught in the test
    } else {
      throw new Error("Error saving review");
    }
  }
}

// Delete review by ID
async function deleteReviewById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid review ID");
    }
    const deletedReview =
      await reviewModel.findByIdAndDelete(id);
    if (!deletedReview) {
      throw new Error("Review not found for deletion");
    }
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review by ID:", error);
    throw error;
  }
}

export default {
  getReviewById,
  addReview,
  deleteReviewById,
  getReviews
};
