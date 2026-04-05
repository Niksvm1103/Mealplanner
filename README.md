# Mealplanner

Ein einfacher Wochenplaner mit Kochbuch, Einkaufsliste und KI-Rezeptgenerator.

## Voraussetzungen

- [Node.js](https://nodejs.org/) installiert
- Ein OpenAI API Key für den KI-Rezeptgenerator

## Lokale Einrichtung

1. Repository klonen:
   ```bash
   git clone git@github.com:Niksvm1103/Mealplanner.git
   cd Mealplanner
   ```
2. `.env.example` nach `.env` kopieren und den OpenAI-Key eintragen:
   ```bash
   cp .env.example .env
   ```
3. In `.env` den Wert für `OPENAI_API_KEY` setzen.

## Projekt starten

```bash
npm start
```

Danach ist die App unter [http://localhost:4173](http://localhost:4173) erreichbar.

## Hinweise

- Der kleine Node-Server liefert die Dateien aus und übernimmt den OpenAI-API-Aufruf.
- Eigene Rezepte, Wochenplaene und Einkaufsauswahl werden jetzt serverseitig in `data/mahlzeit.db` per SQLite gespeichert.
- Vorhandene Browser-Daten werden beim ersten Laden automatisch in die SQLite-Datenbank uebernommen.
- Die Datei `.env` darf nicht ins Repository hochgeladen werden.
