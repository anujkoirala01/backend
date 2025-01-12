import { config } from "dotenv";

config();

export let email = process.env.EMAIL;

export let password = process.env.PASSWORD;

export let secretKey = process.env.SECRET_KEY;

export let port = process.env.PORT || 4000;

export let url = process.env.DB_URL;
