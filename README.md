# Mealplanner

Ein einfacher Wochenplaner mit Kochbuch, Einkaufsliste und KI-Rezeptgenerator.

## Voraussetzungen

- [Node.js](https://nodejs.org/) installiert
- Ein OpenAI API Key fuer den KI-Rezeptgenerator

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
3. In `.env` den Wert fuer `OPENAI_API_KEY` setzen.

## Projekt starten

```bash
npm start
```

Danach ist die App unter [http://localhost:4173](http://localhost:4173) erreichbar.

## Hinweise

- Der kleine Node-Server liefert die Dateien aus und uebernimmt den OpenAI-API-Aufruf.
- Eigene Rezepte und Wochenplaene werden aktuell nur im Browser per `localStorage` gespeichert.
- Die Datei `.env` darf nicht ins Repository hochgeladen werden.
