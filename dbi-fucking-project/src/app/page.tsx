import Head from "next/head";
import {getSchueler} from "../../Services/MongoDBClient";
import MessageForm from "@/components/MessageForm";
import {SchuelerDTO} from "@/DTO/SchuelerDTO";
import {typeOf} from "uri-js/dist/esnext/util";

const schueler = await getSchueler()

export default function Home() {

    if(typeOf(schueler) != "undefined") {
        return (
            <>
                <Head>
                    <title>DBI Projekt</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta charSet="utf-8"/>
                </Head>

                <main>
                    <MessageForm schueler={schueler}></MessageForm>
                </main>

                <footer></footer>
            </>
        );
    }
}
