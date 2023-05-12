/* eslint-disable no-console */
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

import { mongoConnect } from "../../src/middlewares/mongodb";
import News from "../../src/models/News";
import Role from "../../src/models/Role";
import Training from "../../src/models/Training";
import User from "../../src/models/User";

const basePath = path.join(__dirname, "../../");

dotenv.config({ path: basePath + "/.env" });

// Connect to DB

// Read JSON files
const roles = JSON.parse(
  readFileSync(`${basePath}/public/fixtures/roles.json`, "utf-8")
);

const users = JSON.parse(
  readFileSync(`${basePath}/public/fixtures/users.json`, "utf-8")
);

const news = JSON.parse(
  readFileSync(`${basePath}/public/fixtures/news.json`, "utf-8")
);

const trainings = JSON.parse(
  readFileSync(`${basePath}/public/fixtures/trainings.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await mongoConnect();
    await Role.create(roles);
    await User.create(users);
    await News.create(news);
    await Training.create(trainings);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await mongoConnect();
    await Role.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
