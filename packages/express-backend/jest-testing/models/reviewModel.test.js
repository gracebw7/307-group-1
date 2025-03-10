import mongoose from "mongoose";
import Review from "../../models/review";
import { MongoMemoryServer } from "mongodb-memory-server";
import Property from "../../models/property";
import { a, body } from "framer-motion/client";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Review Model", () => {
  let testProperty;
  beforeEach(async () => {
    testProperty = new Property({
      name: "Mustang Village",
      address: "1 Mustang Drive",
      tags: ["Apartment", "Pet friendly"]
    });
    await testProperty.save();
  });
  it("should create a new review with required fields", async () => {
    const reviewData = {
      property: testProperty._id,
      author: "John Doe",
      rating: 5,
      tags: ["Spacious", "Clean"],
      body: "Great place to live!"
    };
    const review = new Review(reviewData);
    const savedReview = await review.save();
    expect(savedReview._id).toBeDefined();
    expect(savedReview.property).toEqual(testProperty._id);
    expect(savedReview.author).toBe(reviewData.author);
    expect(savedReview.rating).toBe(reviewData.rating);
    expect(savedReview.tags).toEqual(reviewData.tags);
    expect(savedReview.body).toBe(reviewData.body);
  });

  it("should require a property ID", async () => {
    const reviewData = {
      author: "John Doe",
      rating: 5,
      body: "Great place to live!"
    };
    try {
      const review = new Review(reviewData);
      await review.save();
    } catch (err) {
      expect(err).toBeInstanceOf(
        mongoose.Error.ValidationError
      );
      expect(err.errors.property).toBeDefined();
    }
  });
  it("should require a rating", async () => {
    const reviewData = {
      property: testProperty._id,
      author: "John Doe",
      body: "Great place to live!"
    };
    try {
      const review = new Review(reviewData);
      await review.save();
    } catch (err) {
      expect(err).toBeInstanceOf(
        mongoose.Error.ValidationError
      );
      expect(err.errors.rating).toBeDefined();
    }
  });
  it("should require a body", async () => {
    const reviewData = {
      property: testProperty._id,
      rating: 5,
      author: "John Doe"
    };
    try {
      const review = new Review(reviewData);
      await review.save();
    } catch (err) {
      expect(err).toBeInstanceOf(
        mongoose.Error.ValidationError
      );
      expect(err.errors.body).toBeDefined();
    }
  });
  it("should default to an empty array of tags", async () => {
    const reviewData = {
      property: testProperty._id,
      rating: 5,
      body: "Great place to live!",
      author: "John Doe"
    };
    const review = new Review(reviewData);
    const savedReview = await review.save();
    expect(savedReview.tags).toEqual([]);
  });
});
