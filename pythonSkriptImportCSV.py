import os
import pandas as pd
from pymongo import MongoClient

# ==== KONFIGURATION ====
csv_verzeichnis = "./CSV-Import-Files-Schuldb/"  # roher String (r"") vermeidet \-Fehler
mongo_url = "mongodb://root:example@localhost:27017/"
datenbank_name = "schueler"

# ==== Verbindung zu MongoDB ====
client = MongoClient(mongo_url)
db = client[datenbank_name]

# ==== Verzeichnis prüfen ====
if not os.path.isdir(csv_verzeichnis):
    print(f"❌ Ordner nicht gefunden: {csv_verzeichnis}")
    exit(1)

# ==== Durch CSV-Dateien iterieren ====
anzahl_gesamt = 0
for dateiname in os.listdir(csv_verzeichnis):
    pfad_zur_datei = os.path.join(csv_verzeichnis, dateiname)

    if not os.path.isfile(pfad_zur_datei):
        continue  # Vermeide Unterordner oder andere Dateien

    if not dateiname.lower().endswith(".csv"):
        continue

    print(f"📥 Importiere Datei: {pfad_zur_datei}")

    try:
        df = pd.read_csv(pfad_zur_datei, encoding='latin1', sep=';')
    except Exception as e:
        print(f"⚠️ Fehler beim Lesen von {dateiname}: {e}")
        continue

    collection_name = os.path.splitext(dateiname)[0]
    collection = db[collection_name]

    try:
        records = df.to_dict(orient="records")
        if records:
            collection.insert_many(records)
            print(f"✅ {len(records)} Dokumente in Collection '{collection_name}' eingefügt.\n")
            anzahl_gesamt += len(records)
        else:
            print(f"⚠️ Datei '{dateiname}' ist leer – keine Daten importiert.\n")
    except Exception as e:
        print(f"❌ Fehler beim Importieren in MongoDB: {e}\n")

print(f"🎉 Insgesamt importierte Datensätze: {anzahl_gesamt}")
