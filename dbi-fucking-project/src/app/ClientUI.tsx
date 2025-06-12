"use client";

import { useState } from "react";

export default function ClientUI({ schueler, nachrichten }: any) {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const selectedName = schueler.find((s: any) => s._id === selectedUser)?.name;
  const userNachrichten = nachrichten.filter((n: any) => n.userId === selectedUser);

  return (
    <div style={{ marginTop: "2rem" }}>
      <label style={{ fontWeight: "bold" }}>Schüler auswählen:</label>
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        style={{ marginLeft: "1rem", padding: "0.5rem" }}
      >
        <option value="">-- Auswahl --</option>
        {schueler.map((s: any) => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      {selectedUser && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Nachrichten für {selectedName}</h2>
          {userNachrichten.length > 0 ? (
            <ul>
              {userNachrichten.map((n: any) => (
                <li key={n._id}>
                  <strong>{n.datum}:</strong> {n.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>Keine Nachrichten gefunden.</p>
          )}
        </div>
      )}
    </div>
  );
}
