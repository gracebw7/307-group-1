import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "./models/user.js";
import mongoose, { Schema } from "mongoose";

const creds = [];

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(pwd, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          console.log("Token:", token);
          res.status(201).send({ token: token });
          creds.push({ username, hashedPassword });
          saveUserToDatabase(username, hashedPassword);
        });
      });
  }
}

function saveUserToDatabase(username, password) {
  const { MONGO_CONNECTION_STRING } = process.env;

  mongoose.set("debug", true);
  mongoose
    .connect(MONGO_CONNECTION_STRING + "users")
    .catch((error) => console.log(error));

  var testUser = new UserSchema({
    username: username,
    password: password
  });

  testUser.save();
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export async function loginUser(req, res) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    return res
      .status(400)
      .send("Bad request: Invalid input data.");
  }

  try {
    // Find user in the database
    const retrievedUser = await UserSchema.findOne({
      username
    }).exec();

    if (!retrievedUser) {
      return res
        .status(401)
        .send("Unauthorized: User not found.");
    }

    bcrypt
      .hash("aa", 10)
      .then((hash) => console.log("Test Hash:", hash));

    // Compare password with hashed password in DB
    const matched = await bcrypt.compare(
      pwd,
      retrievedUser.password
    );
    console.log(pwd);
    console.log(retrievedUser.password);
    console.log(matched);
    if (matched) {
      const token = await generateAccessToken(username);
      return res.status(200).send({
        token: token
      });
    } else {
      return res
        .status(401)
        .send("Unauthorized: Incorrect password.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}
