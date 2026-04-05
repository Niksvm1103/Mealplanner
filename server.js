const rootDir = __dirname;
const http = require("http");
const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

loadDotEnv();

const port = Number(process.env.PORT || 4173);
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const dataDir = path.join(rootDir, "data");
const dbPath = path.join(dataDir, "mahlzeit.db");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon"
};

const recipeSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    category: { type: "string" },
    time: { type: "string" },
    servings: { type: "string" },
    description: { type: "string" },
    nutrition: {
      type: "object",
      additionalProperties: false,
      properties: {
        kcal: { type: "string" },
        fat: { type: "string" },
        carbs: { type: "string" },
        protein: { type: "string" }
      },
      required: ["kcal", "fat", "carbs", "protein"]
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          item: { type: "string" },
          category: { type: "string" }
        },
        required: ["item", "category"]
      }
    },
    steps: {
      type: "array",
      items: { type: "string" }
    },
    tags: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: [
    "title",
    "category",
    "time",
    "servings",
    "description",
    "nutrition",
    "ingredients",
    "steps",
    "tags"
  ]
};

const database = createDatabase();
const selectStateStatement = database.prepare("SELECT value FROM app_state WHERE key = ?");
const upsertStateStatement = database.prepare(`
  INSERT INTO app_state (key, value, updated_at)
  VALUES (@key, @value, @updatedAt)
  ON CONFLICT(key) DO UPDATE SET
    value = excluded.value,
    updated_at = excluded.updated_at
`);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/api/state") {
      handleGetState(res);
      return;
    }

    if (req.method === "PUT" && req.url === "/api/state") {
      await handlePutState(req, res);
      return;
    }

    if (req.method === "POST" && req.url === "/api/generate-recipe") {
      await handleGenerateRecipe(req, res);
      return;
    }

    if (req.url.startsWith("/api/")) {
      sendJson(res, 405, { error: "Methode nicht erlaubt." });
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Methode nicht erlaubt." });
      return;
    }

    serveStaticFile(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unbekannter Serverfehler." });
  }
});

server.listen(port, () => {
  console.log(`Mahlzeit server running on http://localhost:${port}`);
});

async function handleGenerateRecipe(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    sendJson(res, 500, {
      error: "OPENAI_API_KEY fehlt. Lege eine .env mit deinem API-Key an oder setze die Umgebungsvariable."
    });
    return;
  }

  const body = await readJsonBody(req);
  const prompt = String(body.prompt || "").trim();
  const servings = String(body.servings || "2 Personen").trim();
  const style = String(body.style || "").trim();

  if (!prompt) {
    sendJson(res, 400, { error: "Bitte gib Vorgaben für das Rezept an." });
    return;
  }

  const userPrompt = [
    `Erstelle ein deutsches Rezept für folgenden Wunsch: ${prompt}.`,
    `Portionen: ${servings}.`,
    style ? `Zusatzwunsch/Stil: ${style}.` : "",
    "Gib realistische Nährwerte pro Portion aus.",
    "Ordne Zutaten passenden Einkaufs-Kategorien zu wie Gemüse, Obst, Fleisch und Fisch, Milchprodukte, Konserven, Trockenwaren, Öle und Saucen, Gewürze oder Sonstiges.",
    "Zeit im Format '30 Min'.",
    "Servings im Format '2 Personen'.",
    "Schreibe alles auf Deutsch."
  ]
    .filter(Boolean)
    .join("\n");

  const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "Du bist ein hilfreicher Kochassistent. Erstelle nur alltagstaugliche Rezepte und halte dich streng an das vorgegebene JSON-Schema."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: userPrompt
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "meal_plan_recipe",
          schema: recipeSchema,
          strict: true
        }
      }
    })
  });

  const payload = await openAiResponse.json();

  if (!openAiResponse.ok) {
    const message = payload.error?.message || "OpenAI-Antwort fehlgeschlagen.";
    sendJson(res, openAiResponse.status, { error: message });
    return;
  }

  const outputText = extractOutputText(payload);
  if (!outputText) {
    sendJson(res, 502, { error: "Die KI hat kein lesbares Rezept zurückgegeben." });
    return;
  }

  let recipe;
  try {
    recipe = JSON.parse(outputText);
  } catch (error) {
    sendJson(res, 502, { error: "Die KI-Antwort konnte nicht als Rezept gelesen werden." });
    return;
  }

  sendJson(res, 200, { recipe });
}

function handleGetState(res) {
  const savedState = readPersistedState();
  sendJson(res, 200, { state: savedState });
}

async function handlePutState(req, res) {
  const body = await readJsonBody(req);
  const nextState = body?.state;

  if (!nextState || typeof nextState !== "object" || Array.isArray(nextState)) {
    sendJson(res, 400, { error: "Der App-State muss als Objekt gesendet werden." });
    return;
  }

  writePersistedState(nextState);
  sendJson(res, 200, { ok: true });
}

function serveStaticFile(req, res) {
  const requestPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    sendJson(res, 403, { error: "Zugriff verweigert." });
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(res, 404, { error: "Datei nicht gefunden." });
        return;
      }

      sendJson(res, 500, { error: "Datei konnte nicht geladen werden." });
      return;
    }

    const extension = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream"
    });
    res.end(content);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error("Request-Body ist kein gültiges JSON."));
      }
    });

    req.on("error", () => {
      reject(new Error("Request-Body konnte nicht gelesen werden."));
    });
  });
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const firstOutput = payload.output?.[0];
  const firstContent = firstOutput?.content?.find((entry) => typeof entry.text === "string");
  return firstContent?.text || "";
}

function createDatabase() {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  return db;
}

function readPersistedState() {
  const row = selectStateStatement.get("default");
  if (!row?.value) {
    return null;
  }

  try {
    return JSON.parse(row.value);
  } catch (error) {
    throw new Error("Der gespeicherte App-State in SQLite ist ungültig.");
  }
}

function writePersistedState(state) {
  upsertStateStatement.run({
    key: "default",
    value: JSON.stringify(state),
    updatedAt: new Date().toISOString()
  });
}

function loadDotEnv() {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    value = value.replace(/^"(.*)"$/, "$1");

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  });
}
