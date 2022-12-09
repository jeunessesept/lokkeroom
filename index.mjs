import { dbConnect } from "./db/dbConnect.mjs";
import pg from "pg";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { promisify } from "util";
import { appendFile } from "fs";

import { register, getUsers, login, createlobby } from "./queries/queries.mjs";
import { jwtAuthentification } from "./jwt/jwtauth.mjs";
dbConnect();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(jwtAuthentification)

app.get("/api/users", getUsers);

app.post("/api/register", register);

app.post("/api/login", login);

app.post("/api/users", jwtAuthentification, createlobby);

app.listen(3001, () => {
  console.log("app is runing");
});
