import React, { useState, useEffect } from "react";
import SchuelerForm from "./SchuelerForm"; // Das Formular-Component
import BeziehungenGraph from "./BeziehungenGraph"; // Graph-Visualisierung

function App() {
  const [beziehungen, setBeziehungen] = useState([]);
  const [nachrichten, setNachrichten] = useState([]);

  // Beziehungen aus Neo4j laden
  useEffect(() => {
    fetch("/api/beziehungen")
      .then((res) => res.json())
      .then(setBeziehungen)
      .catch((err) => console.error("Fehler beim Laden der Beziehungen:", err));
  }, []);

  // Nachrichten aus MongoDB laden (optional, falls du eine Liste anzeigen willst)
  useEffect(() => {
    fetch("/api/schueler")
      .then((res) => res.json())
      .then(setNachrichten)
      .catch((err) => console.error("Fehler beim Laden der Nachrichten:", err));
  }, []);

  // Handler für das Formular
  const handleFormSubmit = (data) => {
    fetch("/api/schueler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((newEntry) => {
        setNachrichten((prev) => [...prev, newEntry]);
        // Optional: Beziehungen neu laden, falls sich etwas geändert hat
        fetch("/api/beziehungen")
          .then((res) => res.json())
          .then(setBeziehungen);
      })
      .catch((err) => alert("Fehler beim Speichern!"));
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Schüler-DB</h1>
      <SchuelerForm onSubmit={handleFormSubmit} />
      <h2>Nachrichten</h2>
      <ul>
        {nachrichten.map((eintrag) => (
          <li key={eintrag._id}>
            <b>{eintrag.user}</b> ({eintrag.lehrer}): {eintrag.nachricht}
          </li>
        ))}
      </ul>
      <h2>Beziehungen</h2>
      <BeziehungenGraph daten={beziehungen} />
    </div>
  );
}

export default App;
