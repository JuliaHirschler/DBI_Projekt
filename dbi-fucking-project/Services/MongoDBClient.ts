import  {getDatabase} from '../lib/mongo'
import {ObjectId} from "mongodb";
import {SchuelerDTO} from "../src/DTO/SchuelerDTO";
const db = await getDatabase("schueler");

/*
Liefert ein Array SchulerDTO[] zurück
SchulerDTO enthält:
_id
S_Vorname
S_Zuname
S_Nr
 */
export async function getSchueler(): Promise<SchuelerDTO[] | undefined> {
    const schueler = await db.collection('Schueler').find({}).toArray();

    if (!schueler) {
        return Promise.resolve(undefined);
    }else{
        const data: SchuelerDTO[] = schueler.map((schueler) => {
            return new SchuelerDTO(schueler._id.toString(), schueler.S_Nr, schueler.S_Zuname, schueler.S_Vorname)
        });
        return Promise.resolve(data);
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
    return db.collection("nachrichten").insertOne(message);
}

/*
Liefert alle Nachrichten die an einen Schueler gesendet wurden zurück
 */
export default function getMessages(schuelerId: string){
    return db.collection("nachrichten").find({receiverId: schuelerId});
}
