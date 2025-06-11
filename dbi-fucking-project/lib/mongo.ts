import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {}

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let client
let clientPromise
if (uri){
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export async function getDatabase(dbName: string): Promise<Db> {
    const client = await clientPromise;
    return client.db(dbName);
}

export default clientPromise