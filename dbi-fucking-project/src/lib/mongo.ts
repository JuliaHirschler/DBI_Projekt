import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("schueler");

export async function getSchueler() {
  await client.connect();
  return await db.collection("schueler").find().toArray();
}

export async function getNachrichten() {
  await client.connect();
  return await db.collection("nachricht").find().toArray();
}
