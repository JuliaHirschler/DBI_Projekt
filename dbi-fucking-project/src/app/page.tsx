import Head from "next/head";
import {getSchueler} from "../../Services/MongoDBClient";


export default function Home() {
    const schueler = getSchueler()

    return (
    <>
      <Head>
        <title>DBI Projekt</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="utf-8" />
      </Head>

        <main>
            {schueler}
        </main>

        <footer></footer>
    </>
  );
}
