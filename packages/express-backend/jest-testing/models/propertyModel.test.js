import mongoose from "mongoose";
import Property from "../../models/property";
import { MongoMemoryServer } from "mongodb-memory-server";

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

describe("Property Model", () => {
  it("should create a new property with required fields", async () => {
    const propertyData = {
      name: "Mustang Village",
      address: "1 Mustang Drive",
      tags: ["Apartment", "Pet friendly"]
    };
    const property = new Property(propertyData);
    const savedProperty = await property.save();
    expect(savedProperty._id).toBeDefined();
    expect(savedProperty.name).toBe(propertyData.name);
    expect(savedProperty.address).toBe(propertyData.address);
    expect(savedProperty.tags).toEqual(propertyData.tags);
    expect(savedProperty.averageRating).toBe(0); // Default value
  });
  it("should require a property name", async () => {
    const propertyData = {
      address: "1 Mustang Drive",
      tags: ["Apartment", "Pet friendly"]
    };
    try {
      const property = new Property(propertyData);
      await property.save();
    } catch (err) {
      expect(err).toBeInstanceOf(
        mongoose.Error.ValidationError
      );
      expect(err.errors.name).toBeDefined();
    }
  });
  it("should default to an empty array of tags", async () => {
    const propertyData = {
      name: "Mustang Village",
      address: "1 Mustang Drive"
    };
    const property = new Property(propertyData);
    const savedProperty = await property.save();
    expect(savedProperty.tags).toEqual([]);
  });
});
