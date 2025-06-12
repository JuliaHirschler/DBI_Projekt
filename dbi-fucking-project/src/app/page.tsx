import { getSchueler, getNachrichten } from "@/lib/mongo";
import ClientUI from "./ClientUI";

export default async function Page() {
  const schueler = await getSchueler();
  const nachrichten = await getNachrichten();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Datenportal</h1>
      <ClientUI schueler={schueler} nachrichten={nachrichten} />
    </main>
  );
}
