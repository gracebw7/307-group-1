import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../models/user.js";

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
  await User.deleteMany({});
});

describe("User Model", () => {
  it("should create and save a user successfully", async () => {
    const userData = {
      username: "testUser",
      password: "securePassword123"
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBe(userData.password);
  });

  it("should fail to create a user without a username", async () => {
    const userData = { password: "securePassword123" };
    const userWithoutUsername = new User(userData);

    await expect(userWithoutUsername.save()).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });

  it("should fail to create a user without a password", async () => {
    const userData = { username: "testUser" };
    const userWithoutPassword = new User(userData);

    await expect(userWithoutPassword.save()).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });

  it("should enforce unique usernames", async () => {
    const userData = {
      username: "uniqueUser",
      password: "password123"
    };
    await new User(userData).save();

    const duplicateUser = new User(userData);
    await expect(duplicateUser.save()).rejects.toThrow();
  });
});
