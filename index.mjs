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
import { register, getUsers, login, createlobby } from "./queries/queries.mjs"

dbConnect();

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())



app.get('/api/users', getUsers)


app.post('/api/register', register)

app.post('/api/login', login)

app.post('/api/users/:user_id', createlobby)

app.listen(3001, () => {
    console.log("app is runing");
  });
  