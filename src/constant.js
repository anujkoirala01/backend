import { config } from "dotenv";

config();

export let email = process.env.EMAIL;

export let password = process.env.PASSWORD;

export let secretKey = process.env.SECRET_KEY;
