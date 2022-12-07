import bcrypt, { hash } from "bcrypt";
import JWT from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv";
import { pool } from "../db/dbPool.mjs";
dotenv.config()

import { dbConnect } from "../db/dbConnect.mjs";

const sign = promisify(JWT.sign);
const verify = promisify(JWT.verify);

dbConnect();

export const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username)
    return res.status(400).send({ error: "invalid request" });

  try {
    const secretPassword = await bcrypt.hash(password, 5);

    await pool.query(
      `insert into users (username, email, password) values ($1, $2, $3)`,
      [username, email, secretPassword]
    );
    return res.send({ info: "user succesfully added" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "invalid request" });

  const query = await pool.query(
    "select username, id, email, password from users where email =$1",
    [email]
  );

  if (query.rowCount === 0) {
    return res.status(404).send({ error: "user do not exists" });
  }

  const result = query.rows[0];
  const match = await bcrypt.compare(password, result.password);

  if (match) {
    try {
        const token = await sign(
          { email },
          `${process.env.JWT_SECRET}`,
          {
            algorithm: "HS512",
            expiresIn: "15000h",
          }
        );
    
        return res.send({ token });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Cannot generate token" });
      }
    
  } else {
    return res.status(403).send({ error: "wrong password" });
  }
};

export const createlobby = async (req, res) => {
    const admin_id = parseInt(req.params);
    console.log(Number.isNaN(admin_id))
    const { lobbyname } = req.body
    await pool.query('insert into lobby (lobbyname, admin_id)  values ($1, $2)', [
        lobbyname,
        admin_id
    ],
    (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
       
      }

    );
    
}
