import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import reviewModel from "../../models/review.js";
import reviewService from "../../services/review-service.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await reviewModel.deleteMany({});
});

describe("Review Service", () => {
  describe("getReviews", () => {
    it("should return an empty array if no reviews exist", async () => {
      const reviews = await reviewService.getReviews();
      expect(reviews).toEqual([]);
    });

    it("should return reviews if they exist", async () => {
      const review = new reviewModel({
        body: "Great property",
        rating: 5
      });
      review.property = new mongoose.Types.ObjectId();
      await review.save();

      const reviews = await reviewService.getReviews();
      expect(reviews.length).toBe(1);
      expect(reviews[0].body).toBe("Great property");
    });
  });

  describe("getReviewById", () => {
    it("should throw an error if id is invalid", async () => {
      await expect(
        reviewService.getReviewById("invalid-id")
      ).rejects.toThrow("Invalid review ID");
    });

    it("should throw an error if review not found", async () => {
      const validId =
        new mongoose.Types.ObjectId().toHexString();
      await expect(
        reviewService.getReviewById(validId)
      ).rejects.toThrow("Review not found");
    });

    it("should return the review if found", async () => {
      const review = new reviewModel({
        body: "Amazing stay",
        rating: 5
      });
      review.property = new mongoose.Types.ObjectId();
      const savedReview = await review.save();

      const foundReview = await reviewService.getReviewById(
        savedReview._id.toHexString()
      );
      expect(foundReview.body).toBe("Amazing stay");
    });
  });

  describe("addReview", () => {
    it("should throw an error if property ID is not provided", async () => {
      const reviewData = { body: "Nice place", rating: 4 };
      await expect(
        reviewService.addReview(reviewData, null)
      ).rejects.toThrow("Property ID is required");
    });

    it("should throw an error if property ID is invalid", async () => {
      const reviewData = { body: "Nice place", rating: 4 };
      await expect(
        reviewService.addReview(reviewData, "invalid-id")
      ).rejects.toThrow("Invalid property ID");
    });

    it("should throw a validation error if review is missing required fields", async () => {
      const reviewData = { rating: 4 };
      const validPropertyId =
        new mongoose.Types.ObjectId().toHexString();
      await expect(
        reviewService.addReview(reviewData, validPropertyId)
      ).rejects.toThrow(mongoose.Error.ValidationError);
    });

    it("should successfully add a review", async () => {
      const reviewData = { body: "Great location", rating: 5 };
      const validPropertyId =
        new mongoose.Types.ObjectId().toHexString();
      const savedReview = await reviewService.addReview(
        reviewData,
        validPropertyId
      );
      expect(savedReview.body).toBe("Great location");
      expect(savedReview.property.toHexString()).toBe(
        validPropertyId
      );
    });
  });

  describe("deleteReviewById", () => {
    it("should throw an error if id is invalid", async () => {
      await expect(
        reviewService.deleteReviewById("invalid-id")
      ).rejects.toThrow("Invalid review ID");
    });

    it("should throw an error if review not found for deletion", async () => {
      const validId =
        new mongoose.Types.ObjectId().toHexString();
      await expect(
        reviewService.deleteReviewById(validId)
      ).rejects.toThrow("Review not found for deletion");
    });

    it("should successfully delete a review", async () => {
      const review = new reviewModel({
        body: "Not good",
        rating: 2
      });
      review.property = new mongoose.Types.ObjectId();
      const savedReview = await review.save();

      const deletedReview =
        await reviewService.deleteReviewById(
          savedReview._id.toHexString()
        );
      expect(deletedReview._id.toString()).toBe(
        savedReview._id.toString()
      );

      const found = await reviewModel.findById(savedReview._id);
      expect(found).toBeNull();
    });
  });
});
