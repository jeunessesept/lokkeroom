import { dbConnect } from "./db/dbConnect.mjs";
import pg from 'pg';
import  express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { promisify } from 'util';
import { appendFile } from "fs";
import { pool } from "./db/dbPool.mjs";

dbConnect();

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));





app.listen(3001, () => {
    console.log("app is runing");
  });
  