import clientPromise from '../lib/mongo'
import {MongoClient, ObjectId} from "mongodb";

const db = await clientPromise;

export function getSchueler(): Promise<SchuelerDTO[] | undefined> {
    let schueler = db.collection('Schueler').find({}) as SchuelerDTO[];
    if (!schueler) {
        return undefined;
    }else{
        return schueler;
    }
}

/*
Speichert eine neue Nachricht
return: liefert json in diesem Format zurück:
{
  acknowledged: true,
  insertedCount: 2,
  insertedIds: {
    '0': new ObjectId('65a1b2c3d4e5f6789012345a'),
    '1': new ObjectId('65a1b2c3d4e5f6789012345b')
  }
 Also einfach checken ob acknowledged true ist dann passt das schon
 */
export function createMessage(senderId: string, receiverId: string, messageText: string){
    const message = {
        senderId: new ObjectId(senderId),
        receiverId: new ObjectId(receiverId),
        message: messageText,
        timestamp: new Date(),
    }
    return db.Nachrichten.insertOne(message);
}

/*
Liefert alle Nachrichten die an einen Schueler gesendet wurden zurück
 */
export default function getMessages(schuelerId: string){
    return db.Nachrichten.find({receiverId: schuelerId});
}
