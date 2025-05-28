#IST WICHTIG! IST SEEEEEEEEHR WICHTIG!!!!
#WICHTIG: Bitte Dateipfade überarbeiten, dass sie bei Endbenutzer, der das Projekt zum Schluss überarbeiten soll, richtig sind.
import os
import pandas as pd
from pymongo import MongoClient

csv_verzeichnis = "C:\Users\benja\Downloads\CSV-Import-Files-Schuldb(3)"
mongo_url = "mongodb://localhost:27017/"
datenbank_name = "schueler"

client = MongoClient(mongo_url)
db = client[datenbank_name]

for dateiname in os.listdir(csv_verzeichnis):
    if dateiname.endswith(".csv"):
        pfad_zur_datei = os.path.join(csv_verzeichnis, dateiname)
        print(f"Importiere Datei: {pfad_zur_datei}")

        # CSV in DataFrame laden
        try:
            df = pd.read_csv(pfad_zur_datei)
        except Exception as e:
            print(f"Fehler beim Lesen von {dateiname}: {e}")
            continue

        # Daten in MongoDB einfügen
        collection_name = os.path.splitext(dateiname)[0]
        collection = db[collection_name]

        try:
            records = df.to_dict(orient="records")
            if records:
                collection.insert_many(records)
                print(f"→ {len(records)} Dokumente in Collection '{collection_name}' eingefügt.")
            else:
                print(f"→ Datei '{dateiname}' ist leer – keine Daten importiert.")
        except Exception as e:
            print(f"Fehler beim Importieren in MongoDB: {e}")