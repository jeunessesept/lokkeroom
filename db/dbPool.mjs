import pg from "pg"
import dotenv from 'dotenv'
dotenv.config()

export const pool = new pg.Pool({
    user : `${process.env.PG_USER}`,
    host : 'localhost',
    port : 5432,
    database : `${process.env.PG_DB}`,
    password : `${process.env.PG_PASSWORD}`
})

