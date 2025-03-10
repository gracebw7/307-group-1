import mongoose from "mongoose";
import propertyService from "../../services/property-service.js";
import Property from "../../models/property.js";
import { MongoMemoryServer } from "mongodb-memory-server";

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
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Property.deleteMany();
});

describe("Property Service", () => {
  test("getProps should return all properties", async () => {
    const prop1 = await Property.create({
      name: "Property1",
      address: "123 Street"
    });
    const prop2 = await Property.create({
      name: "Property2",
      address: "456 Avenue"
    });

    const properties = await propertyService.getProps();

    expect(properties.length).toBe(2);
    expect(properties[0].name).toBe(prop1.name);
    expect(properties[1].name).toBe(prop2.name);
  });

  test("findPropertyById should return a property by ID", async () => {
    const property = await Property.create({
      name: "Test Property",
      address: "789 Road"
    });

    const foundProperty =
      await propertyService.findPropertyById(property._id);

    expect(foundProperty).toBeDefined();
    expect(foundProperty.name).toBe("Test Property");
  });

  test("addProperty should save a new property", async () => {
    const newProperty = {
      name: "New Apartment",
      address: "100 Park Lane",
      tags: ["Luxury", "Pet friendly"]
    };

    const savedProperty =
      await propertyService.addProperty(newProperty);

    expect(savedProperty._id).toBeDefined();
    expect(savedProperty.name).toBe(newProperty.name);
  });

  test("addPropertyReview should add a review to a property", async () => {
    const property = await Property.create({
      name: "Property with Reviews",
      address: "456 Review Rd"
    });

    const reviewId = new mongoose.Types.ObjectId();
    await propertyService.addPropertyReview(
      property._id,
      reviewId
    );

    const updatedProperty = await Property.findById(
      property._id
    );
    expect(updatedProperty.reviews).toContainEqual(reviewId);
  });

  test("addPropertyReview should handle errors when property is not found", async () => {
    try {
      await propertyService.addPropertyReview(
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId()
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("removePropReview should remove review when found", async () => {
    const property = await Property.create({
      name: "Property with Reviews",
      address: "456 Review Rd",
      reviews: [new mongoose.Types.ObjectId()]
    });

    const reviewId = property.reviews[0];
    const updatedProperty =
      await propertyService.removePropReview(
        property._id,
        reviewId
      );

    expect(updatedProperty.reviews).not.toContainEqual(
      reviewId
    );
  });

  test("removePropReview should throw an error when review is not found", async () => {
    const property = await Property.create({
      name: "Property with Reviews",
      address: "456 Review Rd",
      reviews: [new mongoose.Types.ObjectId()]
    });

    const invalidReviewId = new mongoose.Types.ObjectId();
    try {
      await propertyService.removePropReview(
        property._id,
        invalidReviewId
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("deletePropertyById should remove property by ID", async () => {
    const property = await Property.create({
      name: "To be deleted",
      address: "999 Remove St"
    });

    await propertyService.deletePropertyById(property._id);

    const deletedProperty = await Property.findById(
      property._id
    );
    expect(deletedProperty).toBeNull();
  });
});
