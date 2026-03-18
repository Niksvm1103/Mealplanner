const storageKey = "mahlzeit-state-v2";
const versionCounterKey = "mahlzeit-version-counter";
const weekdayNames = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag"
];
const mealSlots = [
  { key: "breakfast", label: "Fruehstueck" },
  { key: "lunch", label: "Mittagessen" },
  { key: "dinner", label: "Abendessen" }
];

const baseRecipes = [
  {
    id: "gnocchi-ofengemuese",
    title: "Ofen-Gnocchi mit Gemuese",
    category: "Vegetarisch",
    time: "30 Min",
    servings: "2 Personen",
    description: "Ein schnelles Blechgericht mit Gnocchi, Paprika, Zucchini und cremigem Feta.",
    ingredients: [
      { item: "500 g Gnocchi", category: "Kuehlregal" },
      { item: "1 rote Paprika", category: "Gemuese" },
      { item: "1 Zucchini", category: "Gemuese" },
      { item: "1 rote Zwiebel", category: "Gemuese" },
      { item: "150 g Cherrytomaten", category: "Gemuese" },
      { item: "1 Block Feta", category: "Milchprodukte" },
      { item: "2 EL Olivenoel", category: "Oele und Saucen" },
      { item: "1 TL Oregano", category: "Gewuerze" },
      { item: "Salz und Pfeffer", category: "Gewuerze" }
    ],
    nutrition: { kcal: 640, fat: "25 g", carbs: "73 g", protein: "21 g" },
    steps: [
      "Backofen auf 200 Grad vorheizen.",
      "Gemuese schneiden und mit Gnocchi, Oel und Gewuerzen auf ein Blech geben.",
      "Feta obenauf setzen und alles 25 Minuten backen.",
      "Vor dem Servieren kurz vermengen."
    ],
    tags: ["Schnell", "Ofengericht"]
  },
  {
    id: "kokos-linsen-curry",
    title: "Kokos-Linsen-Curry",
    category: "Vegan",
    time: "35 Min",
    servings: "4 Personen",
    description: "Samtiges Curry mit roten Linsen, Spinat und Kokosmilch fuer entspannte Abende.",
    ingredients: [
      { item: "250 g rote Linsen", category: "Trockenwaren" },
      { item: "1 Zwiebel", category: "Gemuese" },
      { item: "2 Knoblauchzehen", category: "Gemuese" },
      { item: "1 Stueck Ingwer", category: "Gemuese" },
      { item: "1 EL Currypaste", category: "Oele und Saucen" },
      { item: "1 Dose Kokosmilch", category: "Konserven" },
      { item: "400 ml Gemuesebruehe", category: "Konserven" },
      { item: "150 g Blattspinat", category: "Gemuese" },
      { item: "1 Limette", category: "Obst" }
    ],
    nutrition: { kcal: 510, fat: "22 g", carbs: "54 g", protein: "19 g" },
    steps: [
      "Zwiebel, Knoblauch und Ingwer anschwitzen.",
      "Currypaste und Linsen kurz mitroesten.",
      "Kokosmilch und Bruehe zugeben und 20 Minuten koecheln.",
      "Spinat unterheben und mit Limettensaft abschmecken."
    ],
    tags: ["Meal Prep", "One Pot"]
  },
  {
    id: "zitronen-lachs",
    title: "Zitronen-Lachs mit Kartoffeln",
    category: "Fisch",
    time: "40 Min",
    servings: "2 Personen",
    description: "Ofenkartoffeln mit zartem Lachs und zitroniger Joghurt-Dill-Sauce.",
    ingredients: [
      { item: "2 Lachsfilets", category: "Fleisch und Fisch" },
      { item: "500 g kleine Kartoffeln", category: "Gemuese" },
      { item: "1 Zitrone", category: "Obst" },
      { item: "150 g Joghurt", category: "Milchprodukte" },
      { item: "1 Bund Dill", category: "Gemuese" },
      { item: "1 EL Olivenoel", category: "Oele und Saucen" },
      { item: "Salz und Pfeffer", category: "Gewuerze" }
    ],
    nutrition: { kcal: 590, fat: "28 g", carbs: "34 g", protein: "41 g" },
    steps: [
      "Kartoffeln vorkochen und auf dem Blech knusprig backen.",
      "Lachs wuerzen, danebenlegen und 12 Minuten garen.",
      "Joghurt mit Dill und Zitronensaft verruehren.",
      "Alles gemeinsam anrichten."
    ],
    tags: ["Ofen", "Proteinreich"]
  },
  {
    id: "pasta-pesto-erbsen",
    title: "Pasta mit Pesto und Erbsen",
    category: "Vegetarisch",
    time: "20 Min",
    servings: "2 Personen",
    description: "Eine sehr schnelle Alltags-Pasta mit gruenem Pesto, Erbsen und Parmesan.",
    ingredients: [
      { item: "250 g Pasta", category: "Trockenwaren" },
      { item: "3 EL gruenes Pesto", category: "Oele und Saucen" },
      { item: "150 g TK-Erbsen", category: "Tiefkuehl" },
      { item: "40 g Parmesan", category: "Milchprodukte" },
      { item: "1 Zitrone", category: "Obst" },
      { item: "Salz und Pfeffer", category: "Gewuerze" }
    ],
    nutrition: { kcal: 560, fat: "18 g", carbs: "74 g", protein: "20 g" },
    steps: [
      "Pasta kochen und Erbsen in den letzten Minuten mitgaren.",
      "Mit Pesto, Nudelwasser und Zitronenabrieb vermengen.",
      "Parmesan daruebergeben und servieren."
    ],
    tags: ["Schnell", "Feierabend"]
  },
  {
    id: "tacos-bohnen",
    title: "Bohnen-Tacos mit Avocado",
    category: "Vegetarisch",
    time: "25 Min",
    servings: "3 Personen",
    description: "Knackige Tacos mit wuerziger Bohnenfuellung, Mais und cremiger Avocado.",
    ingredients: [
      { item: "1 Packung Taco-Shells", category: "Trockenwaren" },
      { item: "1 Dose schwarze Bohnen", category: "Konserven" },
      { item: "1 Dose Mais", category: "Konserven" },
      { item: "1 Avocado", category: "Obst" },
      { item: "1 Tomate", category: "Gemuese" },
      { item: "1 rote Zwiebel", category: "Gemuese" },
      { item: "1 TL Kreuzkuemmel", category: "Gewuerze" },
      { item: "1 Limette", category: "Obst" }
    ],
    nutrition: { kcal: 520, fat: "21 g", carbs: "62 g", protein: "16 g" },
    steps: [
      "Bohnen und Mais mit Gewuerzen in der Pfanne erhitzen.",
      "Avocado, Tomate und Zwiebel fein schneiden.",
      "Tacos fuellen und mit Limettensaft servieren."
    ],
    tags: ["Fingerfood", "Schnell"]
  },
  {
    id: "huhn-reis-bowl",
    title: "Huehnchen-Reis-Bowl",
    category: "Gefluegel",
    time: "35 Min",
    servings: "2 Personen",
    description: "Saftiges Huehnchen auf Reis mit Gurke, Karotte und Sesam-Dressing.",
    ingredients: [
      { item: "2 Huehnchenbrustfilets", category: "Fleisch und Fisch" },
      { item: "150 g Reis", category: "Trockenwaren" },
      { item: "1 Gurke", category: "Gemuese" },
      { item: "2 Karotten", category: "Gemuese" },
      { item: "2 EL Sojasauce", category: "Oele und Saucen" },
      { item: "1 EL Sesamoel", category: "Oele und Saucen" },
      { item: "1 TL Honig", category: "Backen und Suesses" },
      { item: "1 EL Sesam", category: "Trockenwaren" }
    ],
    nutrition: { kcal: 610, fat: "19 g", carbs: "49 g", protein: "52 g" },
    steps: [
      "Reis kochen und Huehnchen anbraten.",
      "Gemuese fein hobeln.",
      "Dressing aus Sojasauce, Sesamoel und Honig ruehren.",
      "Alles in Bowls anrichten und mit Sesam toppen."
    ],
    tags: ["Bowl", "Meal Prep"]
  },
  {
    id: "tomatensuppe-toast",
    title: "Tomatensuppe mit Kaesetoast",
    category: "Vegetarisch",
    time: "25 Min",
    servings: "2 Personen",
    description: "Waermende Suppe mit knusprigem Kaesetoast fuer einen unkomplizierten Sonntag.",
    ingredients: [
      { item: "1 Dose gehackte Tomaten", category: "Konserven" },
      { item: "1 Zwiebel", category: "Gemuese" },
      { item: "1 Knoblauchzehe", category: "Gemuese" },
      { item: "300 ml Gemuesebruehe", category: "Konserven" },
      { item: "2 Scheiben Sauerteigbrot", category: "Brot und Backwaren" },
      { item: "80 g Kaese", category: "Milchprodukte" },
      { item: "1 EL Olivenoel", category: "Oele und Saucen" },
      { item: "Basilikum", category: "Gemuese" }
    ],
    nutrition: { kcal: 470, fat: "19 g", carbs: "45 g", protein: "19 g" },
    steps: [
      "Zwiebel und Knoblauch anschwitzen, Tomaten und Bruehe zugeben.",
      "Suppe 15 Minuten koecheln und fein mixen.",
      "Brot mit Kaese ueberbacken und dazu servieren."
    ],
    tags: ["Suppe", "Comfort Food"]
  }
];

const initialWeekTemplate = [
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "gnocchi-ofengemuese", factor: 1 }
  },
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "kokos-linsen-curry", factor: 1 }
  },
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "zitronen-lachs", factor: 1 }
  },
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "pasta-pesto-erbsen", factor: 1 }
  },
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "tacos-bohnen", factor: 1 }
  },
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "huhn-reis-bowl", factor: 1 }
  },
  {
    breakfast: { recipeId: null, factor: 1 },
    lunch: { recipeId: null, factor: 1 },
    dinner: { recipeId: "tomatensuppe-toast", factor: 1 }
  }
];

const categoryOrder = [
  "Gemuese",
  "Obst",
  "Fleisch und Fisch",
  "Milchprodukte",
  "Kuehlregal",
  "Tiefkuehl",
  "Konserven",
  "Trockenwaren",
  "Brot und Backwaren",
  "Oele und Saucen",
  "Gewuerze",
  "Backen und Suesses",
  "Sonstiges"
];

const state = {
  recipes: [...baseRecipes],
  customRecipeIds: [],
  selectedWeekOffset: 0,
  weekPlans: {}
};

function createDefaultWeekAssignments() {
  return initialWeekTemplate.map((entry) => normaliseDayAssignment(entry));
}

function createEmptyWeekAssignments() {
  return weekdayNames.map(() => ({
    breakfast: { recipeId: null, factor: 1, skipShopping: false },
    lunch: { recipeId: null, factor: 1, skipShopping: false },
    dinner: { recipeId: null, factor: 1, skipShopping: false }
  }));
}

function createDefaultSelectedShoppingSlots() {
  return weekdayNames.flatMap((_, index) => mealSlots.map((slot) => getSlotId(index, slot.key)));
}

function formatWeekKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekStartForOffset(offset = 0) {
  const baseStart = getPlanningWeekStart();
  const start = new Date(baseStart);
  start.setDate(baseStart.getDate() + offset * 7);
  return start;
}

function getSelectedWeekStart() {
  return getWeekStartForOffset(state.selectedWeekOffset || 0);
}

function getSelectedWeekKey() {
  return formatWeekKey(getSelectedWeekStart());
}

function getWeekDaysForStart(weekStart) {
  return weekdayNames.map((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return { day, date };
  });
}

function getSelectedWeekDays() {
  return getWeekDaysForStart(getSelectedWeekStart());
}

function createWeekAssignmentsForOffset(offset = state.selectedWeekOffset || 0) {
  return offset === 0 ? createDefaultWeekAssignments() : createEmptyWeekAssignments();
}

function cloneWeekAssignments(assignments) {
  return assignments.map((assignment) => normaliseDayAssignment(structuredClone(assignment)));
}

function cloneShoppingSlots(slotIds) {
  return Array.isArray(slotIds) ? [...slotIds] : createDefaultSelectedShoppingSlots();
}

function ensureWeekPlan(weekKey = getSelectedWeekKey(), offset = state.selectedWeekOffset || 0) {
  if (!state.weekPlans[weekKey]) {
    state.weekPlans[weekKey] = {
      weekAssignments: createWeekAssignmentsForOffset(offset),
      selectedShoppingSlots: createDefaultSelectedShoppingSlots()
    };
  }

  return state.weekPlans[weekKey];
}

function loadState() {
  const saved = window.localStorage.getItem(storageKey);
  const currentWeekStart = getPlanningWeekStart();
  const currentWeekKey = formatWeekKey(currentWeekStart);
  const nextWeekKey = formatWeekKey(getWeekStartForOffset(1));

  if (!saved) {
    ensureWeekPlan();
    return;
  }

  try {
    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed.recipes)) {
      state.recipes = parsed.recipes;
    }

    if (!Array.isArray(parsed.recipes) && Array.isArray(parsed.customRecipes)) {
      parsed.customRecipes.forEach((recipe) => state.recipes.push(recipe));
      state.customRecipeIds = parsed.customRecipes.map((recipe) => recipe.id);
    }

    if (Array.isArray(parsed.customRecipeIds)) {
      state.customRecipeIds = parsed.customRecipeIds;
    }

    if (Number.isInteger(parsed.selectedWeekOffset) && Number(parsed.selectedWeekOffset) >= 0) {
      state.selectedWeekOffset = Number(parsed.selectedWeekOffset);
    }

    if (parsed.weekPlans && typeof parsed.weekPlans === "object") {
      Object.entries(parsed.weekPlans).forEach(([weekKey, weekPlan]) => {
        const assignments = Array.isArray(weekPlan?.weekAssignments) && weekPlan.weekAssignments.length === 7
          ? weekPlan.weekAssignments.map(normaliseDayAssignment)
          : createDefaultWeekAssignments();
        let selectedShoppingSlots = createDefaultSelectedShoppingSlots();

        if (Array.isArray(weekPlan?.selectedShoppingSlots) && weekPlan.selectedShoppingSlots.length > 0) {
          selectedShoppingSlots = weekPlan.selectedShoppingSlots;
        } else if (Array.isArray(weekPlan?.selectedShoppingDays) && weekPlan.selectedShoppingDays.length > 0) {
          selectedShoppingSlots = weekPlan.selectedShoppingDays.flatMap((dayIndex) =>
            mealSlots.map((slot) => getSlotId(dayIndex, slot.key))
          );
        }

        state.weekPlans[weekKey] = {
          weekAssignments: assignments,
          selectedShoppingSlots
        };
      });

      if (!state.weekPlans[currentWeekKey] && state.weekPlans[nextWeekKey]) {
        state.weekPlans[currentWeekKey] = {
          weekAssignments: cloneWeekAssignments(state.weekPlans[nextWeekKey].weekAssignments),
          selectedShoppingSlots: cloneShoppingSlots(state.weekPlans[nextWeekKey].selectedShoppingSlots)
        };
      }
    } else if (Array.isArray(parsed.weekAssignments) && parsed.weekAssignments.length === 7) {
      let selectedShoppingSlots = createDefaultSelectedShoppingSlots();

      if (Array.isArray(parsed.selectedShoppingSlots) && parsed.selectedShoppingSlots.length > 0) {
        selectedShoppingSlots = parsed.selectedShoppingSlots;
      } else if (Array.isArray(parsed.selectedShoppingDays) && parsed.selectedShoppingDays.length > 0) {
        selectedShoppingSlots = parsed.selectedShoppingDays.flatMap((dayIndex) =>
          mealSlots.map((slot) => getSlotId(dayIndex, slot.key))
        );
      }

      state.weekPlans[currentWeekKey] = {
        weekAssignments: parsed.weekAssignments.map(normaliseDayAssignment),
        selectedShoppingSlots
      };

      state.weekPlans[nextWeekKey] = {
        weekAssignments: cloneWeekAssignments(state.weekPlans[currentWeekKey].weekAssignments),
        selectedShoppingSlots: cloneShoppingSlots(state.weekPlans[currentWeekKey].selectedShoppingSlots)
      };
    }
  } catch (error) {
    window.localStorage.removeItem(storageKey);
  }

  ensureWeekPlan();
}

function saveState() {
  window.localStorage.setItem(
    storageKey,
    JSON.stringify({
      recipes: state.recipes,
      customRecipeIds: state.customRecipeIds,
      selectedWeekOffset: state.selectedWeekOffset,
      weekPlans: state.weekPlans
    })
  );
}

function recipeMap() {
  return new Map(state.recipes.map((recipe) => [recipe.id, recipe]));
}

function getSlotId(dayIndex, mealKey) {
  return `${dayIndex}-${mealKey}`;
}

function normaliseMealEntry(entry) {
  if (!entry) {
    return { recipeId: null, factor: 1, skipShopping: false };
  }

  if (typeof entry === "string") {
    return { recipeId: entry, factor: 1, skipShopping: false };
  }

  return {
    recipeId: entry.recipeId || null,
    factor: Number(entry.factor) > 0 ? Number(entry.factor) : 1,
    skipShopping: Boolean(entry.skipShopping)
  };
}

function normaliseDayAssignment(entry = {}) {
  if ("recipeId" in entry) {
    return {
      breakfast: { recipeId: null, factor: 1 },
      lunch: { recipeId: null, factor: 1 },
      dinner: normaliseMealEntry(entry.recipeId || null)
    };
  }

  return {
    breakfast: normaliseMealEntry(entry.breakfast),
    lunch: normaliseMealEntry(entry.lunch),
    dinner: normaliseMealEntry(entry.dinner)
  };
}

function getPlanningWeekStart() {
  const today = new Date();
  const todayDay = today.getDay();
  const daysSinceMonday = todayDay === 0 ? 6 : todayDay - 1;
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  start.setDate(today.getDate() - daysSinceMonday);
  return start;
}

const weekGrid = document.querySelector("#week-grid");
const cookbookGrid = document.querySelector("#cookbook-grid");
const cookbookSearch = document.querySelector("#cookbook-search");
const cookbookCategory = document.querySelector("#cookbook-category");
const cookbookSort = document.querySelector("#cookbook-sort");
const cookbookMealprepOnly = document.querySelector("#cookbook-mealprep-only");
const shoppingDayFilters = document.querySelector("#shopping-day-filters");
const shoppingOutput = document.querySelector("#shopping-output");
const copyButton = document.querySelector("#copy-button");
const copyFeedback = document.querySelector("#copy-feedback");
const detailSection = document.querySelector("#recipe-detail");
const backButton = document.querySelector("#back-button");
const editRecipeButton = document.querySelector("#edit-recipe-button");
const deleteRecipeButton = document.querySelector("#delete-recipe-button");
const detailSlotSelect = document.querySelector("#detail-slot-select");
const detailAddToWeekButton = document.querySelector("#detail-add-to-week");
const weekRange = document.querySelector("#week-range");
const weekSelect = document.querySelector("#week-select");
const printWeekButton = document.querySelector("#print-week-button");
const printWeekRange = document.querySelector("#print-week-range");
const printWeekHeadings = document.querySelector("#print-week-headings");
const printWeekBody = document.querySelector("#print-week-body");
const versionCounter = document.querySelector("#version-counter");
const recipeFormPanel = document.querySelector("#recipe-form-panel");
const openRecipeFormButton = document.querySelector("#open-recipe-form");
const closeRecipeFormButton = document.querySelector("#close-recipe-form");
const recipeForm = document.querySelector("#recipe-form");
const recipeSlotSelect = document.querySelector("#recipe-slot-select");
const recipeSubmitButton = document.querySelector("#recipe-submit-button");
const recipeMealprepCheckbox = document.querySelector("#recipe-mealprep");
const aiForm = document.querySelector("#ai-form");
const aiPromptInput = document.querySelector("#ai-prompt");
const aiServingsInput = document.querySelector("#ai-servings");
const aiStyleInput = document.querySelector("#ai-style");
const aiStatus = document.querySelector("#ai-status");
const aiResult = document.querySelector("#ai-result");
const aiGenerateButton = document.querySelector("#ai-generate-button");
const aiRegenerateButton = document.querySelector("#ai-regenerate-button");
const saveAiRecipeButton = document.querySelector("#save-ai-recipe");
const plannerModal = document.querySelector("#planner-modal");
const plannerModalCloseButton = document.querySelector("#planner-modal-close");
const plannerModalSubtitle = document.querySelector("#planner-modal-subtitle");
const plannerModalSearch = document.querySelector("#planner-modal-search");
const plannerModalCategory = document.querySelector("#planner-modal-category");
const plannerModalSort = document.querySelector("#planner-modal-sort");
const plannerModalMealprepOnly = document.querySelector("#planner-modal-mealprep-only");
const plannerModalList = document.querySelector("#planner-modal-list");

let latestGeneratedRecipe = null;
let editingRecipeId = null;
let plannerModalSelection = null;

function formatShortDate(date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "short"
  }).format(date);
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function renderWeekSelect() {
  const options = Array.from({ length: 12 }, (_, offset) => {
    const weekDays = getWeekDaysForStart(getWeekStartForOffset(offset));
    const labelPrefix =
      offset === 0 ? "Aktuelle Woche" : offset === 1 ? "Naechste Woche" : `In ${offset} Wochen`;
    return `<option value="${offset}">${labelPrefix}: ${formatShortDate(weekDays[0].date)} bis ${formatShortDate(weekDays[6].date)}</option>`;
  });

  weekSelect.innerHTML = options.join("");
  weekSelect.value = String(state.selectedWeekOffset || 0);
}

function renderWeekRange() {
  const weekDays = getSelectedWeekDays();
  weekRange.textContent = `${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[6].date)}`;
}

function renderPrintWeekView() {
  const recipesById = recipeMap();
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();
  printWeekRange.textContent = `${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[6].date)}`;
  printWeekHeadings.innerHTML = [
    "<th>Mahlzeit</th>",
    ...weekDays.map(
      ({ day, date }) => `<th>${day}<br><span>${formatShortDate(date)}</span></th>`
    )
  ].join("");

  printWeekBody.innerHTML = mealSlots
    .map((slot) => {
      const dayCells = weekDays
        .map((_, dayIndex) => {
          const mealEntry = weekPlan.weekAssignments[dayIndex][slot.key];
          const recipe = mealEntry.recipeId ? recipesById.get(mealEntry.recipeId) : null;

          if (!recipe) {
            return '<td><span class="print-empty">Leer</span></td>';
          }

          return `
            <td>
              <div class="print-recipe-title">${recipe.title}</div>
              <div class="print-recipe-meta">${recipe.category} · ${recipe.time} · ${formatFactorLabel(mealEntry.factor)}</div>
            </td>
          `;
        })
        .join("");

      return `<tr><td class="print-slot-label">${slot.label}</td>${dayCells}</tr>`;
    })
    .join("");
}

function incrementVersionCounter() {
  const savedCount = Number(window.localStorage.getItem(versionCounterKey) || "0");
  const nextCount = savedCount + 1;
  window.localStorage.setItem(versionCounterKey, String(nextCount));
  versionCounter.textContent = `Version ${nextCount}`;
}

function renderSlotOptions(selectElement, emptyLabel) {
  const weekDays = getSelectedWeekDays();
  selectElement.innerHTML = [
    `<option value="">${emptyLabel}</option>`,
    ...weekDays.flatMap(({ day, date }, dayIndex) =>
      mealSlots.map(
        (slot) =>
          `<option value="${getSlotId(dayIndex, slot.key)}">${day} (${formatShortDate(date)}) - ${slot.label}</option>`
      )
    )
  ].join("");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function normaliseNutritionValue(value) {
  return String(value).trim() || "-";
}

function normaliseImageValue(value) {
  const image = String(value || "").trim();
  return image || "";
}

function extractNumberString(value) {
  const match = String(value).match(/[\d]+(?:[.,]\d+)?/);
  return match ? match[0].replace(",", ".") : String(value).trim();
}

function formatServings(value) {
  const cleanValue = extractNumberString(value);
  return cleanValue ? `${cleanValue} Personen` : "";
}

function formatMinutes(value) {
  const cleanValue = extractNumberString(value);
  return cleanValue ? `${cleanValue} Min` : "";
}

function formatCalories(value) {
  const cleanValue = extractNumberString(value);
  return cleanValue ? `${cleanValue} kcal` : "";
}

function formatGrams(value) {
  const cleanValue = extractNumberString(value);
  return cleanValue ? `${cleanValue} g` : "";
}

function formatFactorLabel(factor) {
  return `x${factor}`;
}

function parseNutritionNumber(value) {
  const cleanValue = extractNumberString(value);
  const number = Number(cleanValue);
  return Number.isFinite(number) ? number : 0;
}

function formatNutritionTotal(value, unit = "") {
  const roundedValue = Number(value.toFixed(1));
  const displayValue = Number.isInteger(roundedValue)
    ? String(roundedValue)
    : String(roundedValue).replace(".", ",");
  return unit ? `${displayValue} ${unit}` : displayValue;
}

function getDayNutritionTotals(dayAssignment, recipesById) {
  return mealSlots.reduce(
    (totals, slot) => {
      const mealEntry = dayAssignment[slot.key];
      const recipe = mealEntry?.recipeId ? recipesById.get(mealEntry.recipeId) : null;
      const factor = mealEntry?.factor || 1;

      if (!recipe) {
        return totals;
      }

      return {
        kcal: totals.kcal + parseNutritionNumber(recipe.nutrition?.kcal) * factor,
        fat: totals.fat + parseNutritionNumber(recipe.nutrition?.fat) * factor,
        protein: totals.protein + parseNutritionNumber(recipe.nutrition?.protein) * factor,
        carbs: totals.carbs + parseNutritionNumber(recipe.nutrition?.carbs) * factor
      };
    },
    { kcal: 0, fat: 0, protein: 0, carbs: 0 }
  );
}

function scaleIngredientText(text, factor) {
  if (factor === 1) {
    return text;
  }

  const trimmed = String(text).trim();
  const match = trimmed.match(/^(\d+(?:[.,]\d+)?)(\s*[\p{L}%]+)?(.*)$/u);
  if (!match) {
    return text;
  }

  const baseNumber = Number(match[1].replace(",", "."));
  if (Number.isNaN(baseNumber)) {
    return text;
  }

  const scaledNumber = Number((baseNumber * factor).toFixed(2));
  const prettyNumber = Number.isInteger(scaledNumber)
    ? String(scaledNumber)
    : String(scaledNumber).replace(".", ",");
  return `${prettyNumber}${match[2] || ""}${match[3] || ""}`.trim();
}

function normaliseGeneratedRecipe(recipe, idPrefix = "custom") {
  return {
    id: `${idPrefix}-${Date.now()}-${slugify(recipe.title || "rezept")}`,
    title: String(recipe.title || "Neues Rezept").trim(),
    category: String(recipe.category || "KI-Rezept").trim(),
    time: String(recipe.time || "30 Min").trim(),
    servings: String(recipe.servings || "2 Personen").trim(),
    description: String(recipe.description || "Von der KI vorgeschlagenes Rezept.").trim(),
    image: normaliseImageValue(recipe.image),
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients
          .map((ingredient) => ({
            item: String(ingredient.item || "").trim(),
            category: String(ingredient.category || "Sonstiges").trim() || "Sonstiges"
          }))
          .filter((ingredient) => ingredient.item)
      : [],
    nutrition: {
      kcal: normaliseNutritionValue(recipe.nutrition?.kcal || "-"),
      fat: normaliseNutritionValue(recipe.nutrition?.fat || "-"),
      carbs: normaliseNutritionValue(recipe.nutrition?.carbs || "-"),
      protein: normaliseNutritionValue(recipe.nutrition?.protein || "-")
    },
    mealprep: Boolean(recipe.mealprep),
    steps: Array.isArray(recipe.steps)
      ? recipe.steps.map((step) => String(step).trim()).filter(Boolean)
      : [],
    tags: Array.isArray(recipe.tags)
      ? recipe.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : ["KI-Rezept"]
  };
}

function renderWeek() {
  const recipesById = recipeMap();
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();

  weekGrid.innerHTML = weekDays
    .map(({ day, date }, index) => {
      const dayNutritionTotals = getDayNutritionTotals(weekPlan.weekAssignments[index], recipesById);

      return `
        <article class="card">
          <p class="day-label">${day}</p>
          <p class="day-date">${formatShortDate(date)}</p>
          <div class="week-day-nutrition" aria-label="Tageswerte">
            <span class="week-day-nutrition-item"><strong>${formatNutritionTotal(dayNutritionTotals.kcal)}</strong> kcal</span>
            <span class="week-day-nutrition-item"><strong>${formatNutritionTotal(dayNutritionTotals.fat, "g")}</strong> F</span>
            <span class="week-day-nutrition-item"><strong>${formatNutritionTotal(dayNutritionTotals.protein, "g")}</strong> P</span>
            <span class="week-day-nutrition-item"><strong>${formatNutritionTotal(dayNutritionTotals.carbs, "g")}</strong> KH</span>
          </div>
          <div class="meal-slot-list">
            ${mealSlots
              .map((slot) => {
                const mealEntry = weekPlan.weekAssignments[index][slot.key];
                const recipeId = mealEntry.recipeId;
                const recipe = recipeId ? recipesById.get(recipeId) : null;

                if (!recipe) {
                  return `
                    <div class="meal-slot">
                      <div class="meal-slot-header">
                        <p class="meal-slot-label">${slot.label}</p>
                      </div>
                      <p class="meal-slot-empty">Noch nichts eingeplant</p>
                      <button
                        class="button primary small week-plan-button"
                        type="button"
                        data-action="open-planner"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                      >
                        Rezept einplanen
                      </button>
                    </div>
                  `;
                }

                return `
                  <div class="meal-slot">
                    <div class="meal-slot-header">
                      <p class="meal-slot-label">${slot.label}</p>
                    </div>
                    <p class="meal-slot-title">${recipe.title}</p>
                    <div class="meal-tags">
                      <span class="pill">${recipe.category}</span>
                      <span class="pill">${recipe.time}</span>
                      <span class="pill">${formatFactorLabel(mealEntry.factor)}</span>
                      ${mealEntry.skipShopping ? '<span class="pill">Schon eingeplant</span>' : ""}
                    </div>
                    <div class="meal-slot-actions">
                      <a class="button secondary small" href="#rezept/${recipe.id}">Rezept ansehen</a>
                      <select
                        class="add-select meal-factor-select"
                        data-action="factor"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                      >
                        ${[1, 2, 3, 4, 5, 6]
                          .map(
                            (factor) =>
                              `<option value="${factor}" ${mealEntry.factor === factor ? "selected" : ""}>${formatFactorLabel(factor)}</option>`
                          )
                          .join("")}
                      </select>
                      <button
                        class="button secondary small"
                        type="button"
                        data-action="toggle-shopping"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                      >
                        ${mealEntry.skipShopping ? "In Einkaufsliste aufnehmen" : "Schon eingeplant"}
                      </button>
                      <button
                        class="button ghost small"
                        type="button"
                        data-action="remove"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function archiveMatches(recipe, term) {
  const searchText = [
    recipe.title,
    recipe.category,
    recipe.description,
    ...recipe.tags,
    ...recipe.ingredients.map((ingredient) => ingredient.item)
  ]
    .join(" ")
    .toLowerCase();

  return searchText.includes(term.toLowerCase());
}

function renderCookbook() {
  const term = cookbookSearch.value.trim().toLowerCase();
  const selectedCategory = cookbookCategory.value;
  const sortMode = cookbookSort.value;
  const mealprepOnly = cookbookMealprepOnly.checked;
  const recipes = state.recipes
    .filter((recipe) => (selectedCategory === "Alle" ? true : recipe.category === selectedCategory))
    .filter((recipe) => (mealprepOnly ? Boolean(recipe.mealprep) : true))
    .filter((recipe) => {
      if (!term) {
        return true;
      }

      return archiveMatches(recipe, term);
    })
    .sort((recipeA, recipeB) => compareRecipes(recipeA, recipeB, sortMode));

  cookbookGrid.innerHTML = recipes
    .map(
      (recipe) => `
        <article class="archive-card">
          ${recipe.image ? `<img class="cookbook-image" src="${recipe.image}" alt="${recipe.title}" loading="lazy" />` : ""}
          <p class="archive-week">${recipe.category}</p>
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <div class="archive-tags">
            <span class="pill">${recipe.time}</span>
            <span class="pill">${recipe.servings}</span>
            ${recipe.mealprep ? '<span class="pill">Mealprep tauglich</span>' : ""}
            ${recipe.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
          </div>
          <div class="archive-actions">
            <a class="button secondary small" href="#rezept/${recipe.id}">Zum Rezept</a>
          </div>
        </article>
      `
    )
    .join("");

  if (!recipes.length) {
    cookbookGrid.innerHTML = `
      <article class="archive-card">
        <h3>Keine passenden Rezeptideen</h3>
        <p>Probiere eine andere Kategorie oder einen allgemeineren Suchbegriff.</p>
      </article>
    `;
  }
}

function parseRecipeTimeToMinutes(timeLabel) {
  const match = String(timeLabel).match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function compareRecipes(recipeA, recipeB, sortMode) {
  if (sortMode === "title-desc") {
    return recipeB.title.localeCompare(recipeA.title, "de");
  }

  if (sortMode === "time-asc") {
    return parseRecipeTimeToMinutes(recipeA.time) - parseRecipeTimeToMinutes(recipeB.time);
  }

  if (sortMode === "time-desc") {
    return parseRecipeTimeToMinutes(recipeB.time) - parseRecipeTimeToMinutes(recipeA.time);
  }

  return recipeA.title.localeCompare(recipeB.title, "de");
}

function renderCookbookCategories() {
  const categories = ["Alle", ...new Set(state.recipes.map((recipe) => recipe.category).sort((a, b) => a.localeCompare(b, "de")))];
  const currentValue = cookbookCategory.value || "Alle";
  cookbookCategory.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
  cookbookCategory.value = categories.includes(currentValue) ? currentValue : "Alle";
}

function renderPlannerModalCategories() {
  const categories = ["Alle", ...new Set(state.recipes.map((recipe) => recipe.category).sort((a, b) => a.localeCompare(b, "de")))];
  const currentValue = plannerModalCategory.value || "Alle";
  plannerModalCategory.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
  plannerModalCategory.value = categories.includes(currentValue) ? currentValue : "Alle";
}

function renderShoppingDayFilters() {
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();
  const allSlotIds = weekDays.flatMap((_, dayIndex) => mealSlots.map((slot) => getSlotId(dayIndex, slot.key)));
  const allSelected = weekPlan.selectedShoppingSlots.length === allSlotIds.length;
  shoppingDayFilters.innerHTML = [
    `<div class="shopping-filter-group">
      <span class="shopping-filter-label">Gesamt</span>
      <button class="filter-chip ${allSelected ? "active" : ""}" type="button" data-filter-type="all">Alle Tage</button>
    </div>`,
    ...weekDays.map(({ day }, dayIndex) => {
      const daySlotIds = mealSlots.map((slot) => getSlotId(dayIndex, slot.key));
      const fullDaySelected = daySlotIds.every((slotId) => weekPlan.selectedShoppingSlots.includes(slotId));

      return `
        <div class="shopping-filter-group">
          <span class="shopping-filter-label">${day}</span>
          <button class="filter-chip ${fullDaySelected ? "active" : ""}" type="button" data-filter-type="day" data-day-index="${dayIndex}">
            Ganzer Tag
          </button>
          ${mealSlots
            .map((slot) => {
              const slotId = getSlotId(dayIndex, slot.key);
              return `
                <button
                  class="filter-chip ${weekPlan.selectedShoppingSlots.includes(slotId) ? "active" : ""}"
                  type="button"
                  data-filter-type="slot"
                  data-slot-id="${slotId}"
                >
                  ${slot.label}
                </button>
              `;
            })
            .join("")}
        </div>
      `;
    })
  ].join("");
}

function renderGeneratedRecipe(recipe) {
  document.querySelector("#ai-result-title").textContent = recipe.title;
  document.querySelector("#ai-result-tag").textContent = recipe.category;
  document.querySelector("#ai-result-time").textContent = recipe.time;
  document.querySelector("#ai-result-servings").textContent = recipe.servings;
  document.querySelector("#ai-result-description").textContent = recipe.description;
  document.querySelector("#ai-result-nutrition").innerHTML = [
    ["kcal", recipe.nutrition.kcal],
    ["F", recipe.nutrition.fat],
    ["KH", recipe.nutrition.carbs],
    ["P", recipe.nutrition.protein]
  ]
    .map(
      ([label, value]) => `
        <div class="nutrition-card">
          <span class="nutrition-label">${label}</span>
          <span class="nutrition-value">${value}</span>
        </div>
      `
    )
    .join("");
  document.querySelector("#ai-result-ingredients").innerHTML = recipe.ingredients
    .map((ingredient) => `<li>${ingredient.item}</li>`)
    .join("");
  document.querySelector("#ai-result-steps").innerHTML = recipe.steps
    .map((step) => `<li>${step}</li>`)
    .join("");
  aiResult.classList.remove("hidden");
}

function plannerModalMatches(recipe, term) {
  if (!term) {
    return true;
  }

  return archiveMatches(recipe, term);
}

function renderPlannerModalRecipes() {
  const term = plannerModalSearch.value.trim().toLowerCase();
  const selectedCategory = plannerModalCategory.value;
  const sortMode = plannerModalSort.value;
  const mealprepOnly = plannerModalMealprepOnly.checked;
  const recipes = state.recipes
    .filter((recipe) => (selectedCategory === "Alle" ? true : recipe.category === selectedCategory))
    .filter((recipe) => (mealprepOnly ? Boolean(recipe.mealprep) : true))
    .filter((recipe) => plannerModalMatches(recipe, term))
    .sort((recipeA, recipeB) => compareRecipes(recipeA, recipeB, sortMode));

  plannerModalList.innerHTML = recipes
    .map(
      (recipe) => `
        <article class="modal-recipe-card">
          <p class="archive-week">${recipe.category}</p>
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <div class="archive-tags">
            <span class="pill">${recipe.time}</span>
            <span class="pill">${recipe.servings}</span>
            ${recipe.mealprep ? '<span class="pill">Mealprep tauglich</span>' : ""}
          </div>
          <div class="archive-actions">
            <button class="button primary small" type="button" data-action="select-modal-recipe" data-recipe-id="${recipe.id}">
              Dieses Rezept einplanen
            </button>
          </div>
        </article>
      `
    )
    .join("");

  if (!recipes.length) {
    plannerModalList.innerHTML = `
      <article class="modal-recipe-card">
        <h3>Kein passendes Rezept gefunden</h3>
        <p>Versuche es mit einem anderen Suchbegriff oder lege zuerst ein neues Rezept an.</p>
      </article>
    `;
  }
}

function openPlannerModal(dayIndex, mealKey) {
  const weekDays = getSelectedWeekDays();
  const slot = mealSlots.find((entry) => entry.key === mealKey);
  plannerModalSelection = { dayIndex, mealKey };
  plannerModalSubtitle.textContent = `${weekDays[dayIndex].day} (${formatShortDate(weekDays[dayIndex].date)}) - ${slot.label}`;
  plannerModalSearch.value = "";
  plannerModalCategory.value = "Alle";
  plannerModalSort.value = "title-asc";
  plannerModalMealprepOnly.checked = false;
  renderPlannerModalCategories();
  renderPlannerModalRecipes();
  plannerModal.classList.remove("hidden");
  plannerModal.setAttribute("aria-hidden", "false");
  plannerModalSearch.focus();
}

function closePlannerModal() {
  plannerModalSelection = null;
  plannerModal.classList.add("hidden");
  plannerModal.setAttribute("aria-hidden", "true");
}

function buildShoppingList() {
  const recipesById = recipeMap();
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();
  const grouped = new Map();

  categoryOrder.forEach((category) => grouped.set(category, []));

  weekPlan.weekAssignments.forEach((assignment, dayIndex) => {
    mealSlots.forEach((slot) => {
      const slotId = getSlotId(dayIndex, slot.key);
      if (!weekPlan.selectedShoppingSlots.includes(slotId)) {
        return;
      }

      const mealEntry = assignment[slot.key];
      const recipeId = mealEntry.recipeId;
      if (!recipeId || mealEntry.skipShopping) {
        return;
      }

      const recipe = recipesById.get(recipeId);
      if (!recipe) {
        return;
      }

      recipe.ingredients.forEach((ingredient) => {
        const category = grouped.has(ingredient.category) ? ingredient.category : "Sonstiges";
        grouped
          .get(category)
          .push(
            `${scaleIngredientText(ingredient.item, mealEntry.factor)} (${weekDays[dayIndex].day} ${slot.label}: ${recipe.title}, ${formatFactorLabel(mealEntry.factor)})`
          );
      });
    });
  });

  const categorySections = [...grouped.entries()]
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => [category, items.sort((a, b) => a.localeCompare(b, "de"))]);

  const mealEntries = weekDays
    .flatMap(({ day }, dayIndex) =>
      mealSlots.map((slot) => {
        const slotId = getSlotId(dayIndex, slot.key);
        if (!weekPlan.selectedShoppingSlots.includes(slotId)) {
          return null;
        }

        const mealEntry = weekPlan.weekAssignments[dayIndex][slot.key];
        const recipeId = mealEntry.recipeId;
        if (!recipeId) {
          return `- ${day} ${slot.label}: frei`;
        }

        if (mealEntry.skipShopping) {
          return `- ${day} ${slot.label}: ${recipeMap().get(recipeId)?.title || "Rezept"} (bereits eingeplant)`;
        }

        const recipe = recipesById.get(recipeId);
        return `- ${day} ${slot.label}: ${recipe.title} (${formatFactorLabel(mealEntry.factor)})`;
      })
    )
    .filter(Boolean)
    .join("\n");

  return [
    `Einkaufsliste fuer ${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[6].date)}`,
    "",
    "Geplante Mahlzeiten:",
    mealEntries,
    "",
    ...categorySections.flatMap(([category, items]) => [category, ...items.map((item) => `- ${item}`), ""])
  ]
    .join("\n")
    .trim();
}

function renderShoppingList() {
  shoppingOutput.textContent = buildShoppingList();
}

function toggleShoppingFilter(filterType, value) {
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();

  if (filterType === "all") {
    const allSlotIds = weekDays.flatMap((_, dayIndex) =>
      mealSlots.map((slot) => getSlotId(dayIndex, slot.key))
    );
    const allSelected = allSlotIds.every((slotId) => weekPlan.selectedShoppingSlots.includes(slotId));
    weekPlan.selectedShoppingSlots = allSelected ? [] : allSlotIds;
  } else if (filterType === "day") {
    const dayIndex = Number(value);
    const daySlotIds = mealSlots.map((slot) => getSlotId(dayIndex, slot.key));
    const allSelected = daySlotIds.every((slotId) => weekPlan.selectedShoppingSlots.includes(slotId));

    if (allSelected) {
      const remainingSlots = weekPlan.selectedShoppingSlots.filter((slotId) => !daySlotIds.includes(slotId));
      weekPlan.selectedShoppingSlots = remainingSlots.length ? remainingSlots : daySlotIds;
    } else {
      weekPlan.selectedShoppingSlots = [...new Set([...weekPlan.selectedShoppingSlots, ...daySlotIds])];
    }
  } else if (filterType === "slot") {
    const slotId = value;
    const isSelected = weekPlan.selectedShoppingSlots.includes(slotId);

    if (isSelected) {
      const remainingSlots = weekPlan.selectedShoppingSlots.filter((entry) => entry !== slotId);
      weekPlan.selectedShoppingSlots = remainingSlots.length ? remainingSlots : [slotId];
    } else {
      weekPlan.selectedShoppingSlots = [...weekPlan.selectedShoppingSlots, slotId];
    }
  }

  saveState();
  renderShoppingDayFilters();
  renderShoppingList();
}

function openRecipeForm(slotValue = "") {
  editingRecipeId = null;
  recipeForm.reset();
  recipeSubmitButton.textContent = "Rezept speichern";
  document.querySelector("#recipe-form-panel h2").textContent = "Neues Rezept anlegen";
  recipeFormPanel.classList.remove("hidden");
  recipeSlotSelect.value = slotValue;
  recipeFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeRecipeForm() {
  recipeForm.reset();
  recipeSlotSelect.value = "";
  editingRecipeId = null;
  recipeSubmitButton.textContent = "Rezept speichern";
  document.querySelector("#recipe-form-panel h2").textContent = "Neues Rezept anlegen";
  recipeFormPanel.classList.add("hidden");
}

function renderRecipeDetail(recipeId) {
  const recipe = recipeMap().get(recipeId);
  if (!recipe) {
    detailSection.classList.add("hidden");
    return;
  }

  document.querySelector("#detail-title").textContent = recipe.title;
  document.querySelector("#detail-tag").textContent = recipe.category;
  document.querySelector("#detail-time").textContent = recipe.time;
  document.querySelector("#detail-servings").textContent = recipe.servings;
  document.querySelector("#detail-description").textContent = recipe.description;
  document.querySelector("#detail-nutrition").innerHTML = [
    ["kcal", recipe.nutrition.kcal],
    ["F", recipe.nutrition.fat],
    ["KH", recipe.nutrition.carbs],
    ["P", recipe.nutrition.protein]
  ]
    .map(
      ([label, value]) => `
        <div class="nutrition-card">
          <span class="nutrition-label">${label}</span>
          <span class="nutrition-value">${value}</span>
        </div>
      `
    )
    .join("");
  document.querySelector("#detail-ingredients").innerHTML = recipe.ingredients
    .map((ingredient) => `<li>${ingredient.item}</li>`)
    .join("");
  document.querySelector("#detail-steps").innerHTML = recipe.steps
    .map((step) => `<li>${step}</li>`)
    .join("");
  renderSlotOptions(detailSlotSelect, "Slot waehlen");
  editRecipeButton.dataset.recipeId = recipe.id;
  deleteRecipeButton.dataset.recipeId = recipe.id;
  detailAddToWeekButton.dataset.recipeId = recipe.id;

  detailSection.classList.remove("hidden");
  detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function addRecipeToWeek(recipeId, dayIndex, mealKey) {
  const weekPlan = ensureWeekPlan();
  const weekDays = getSelectedWeekDays();
  const existingRecipeId = weekPlan.weekAssignments[dayIndex][mealKey].recipeId;
  if (existingRecipeId && existingRecipeId !== recipeId) {
    const existingRecipe = recipeMap().get(existingRecipeId);
    const shouldReplace = window.confirm(
      `${weekDays[dayIndex].day} ${mealSlots.find((slot) => slot.key === mealKey).label} ist bereits mit "${existingRecipe.title}" belegt. Moechtest du das Rezept ersetzen?`
    );

    if (!shouldReplace) {
      return;
    }
  }

  weekPlan.weekAssignments[dayIndex][mealKey] = { recipeId, factor: 1 };
  saveState();
  renderAll();
}

function removeRecipeFromWeek(dayIndex, mealKey) {
  const weekPlan = ensureWeekPlan();
  weekPlan.weekAssignments[dayIndex][mealKey] = { recipeId: null, factor: 1 };
  saveState();
  renderAll();
}

function updateMealFactor(dayIndex, mealKey, factor) {
  const weekPlan = ensureWeekPlan();
  const mealEntry = weekPlan.weekAssignments[dayIndex][mealKey];
  weekPlan.weekAssignments[dayIndex][mealKey] = {
    recipeId: mealEntry.recipeId,
    factor,
    skipShopping: mealEntry.skipShopping
  };
  saveState();
  renderAll();
}

function toggleMealShoppingStatus(dayIndex, mealKey) {
  const weekPlan = ensureWeekPlan();
  const mealEntry = weekPlan.weekAssignments[dayIndex][mealKey];
  weekPlan.weekAssignments[dayIndex][mealKey] = {
    recipeId: mealEntry.recipeId,
    factor: mealEntry.factor,
    skipShopping: !mealEntry.skipShopping
  };
  saveState();
  renderAll();
}

function deleteRecipe(recipeId) {
  const recipesById = recipeMap();
  const recipe = recipesById.get(recipeId);
  if (!recipe) {
    return;
  }

  const shouldDelete = window.confirm(
    `Moechtest du "${recipe.title}" wirklich aus dem Kochbuch loeschen?`
  );
  if (!shouldDelete) {
    return;
  }

  state.recipes = state.recipes.filter((entry) => entry.id !== recipeId);
  state.customRecipeIds = state.customRecipeIds.filter((id) => id !== recipeId);
  Object.values(state.weekPlans).forEach((weekPlan) => {
    weekPlan.weekAssignments = weekPlan.weekAssignments.map((assignment) => ({
      breakfast:
        assignment.breakfast.recipeId === recipeId ? { recipeId: null, factor: 1 } : assignment.breakfast,
      lunch: assignment.lunch.recipeId === recipeId ? { recipeId: null, factor: 1 } : assignment.lunch,
      dinner: assignment.dinner.recipeId === recipeId ? { recipeId: null, factor: 1 } : assignment.dinner
    }));
  });

  saveState();
  window.location.hash = "#cookbook";
  renderAll();
}

function parseIngredientLine(line) {
  const trimmed = line.trim();
  const match = trimmed.match(/^\[([^\]]+)\]\s*(.+)$/);
  if (match) {
    return { category: match[1].trim(), item: match[2].trim() };
  }

  return { category: "Sonstiges", item: trimmed };
}

function fillRecipeForm(recipe) {
  document.querySelector("#recipe-title").value = recipe.title;
  document.querySelector("#recipe-category").value = recipe.category;
  document.querySelector("#recipe-time").value = extractNumberString(recipe.time);
  document.querySelector("#recipe-servings").value = extractNumberString(recipe.servings);
  document.querySelector("#recipe-description").value = recipe.description;
  document.querySelector("#recipe-image").value = recipe.image || "";
  document.querySelector("#recipe-kcal").value = extractNumberString(recipe.nutrition.kcal);
  document.querySelector("#recipe-fat").value = extractNumberString(recipe.nutrition.fat);
  document.querySelector("#recipe-carbs").value = extractNumberString(recipe.nutrition.carbs);
  document.querySelector("#recipe-protein").value = extractNumberString(recipe.nutrition.protein);
  document.querySelector("#recipe-steps").value = recipe.steps.join("\n");
  document.querySelector("#recipe-ingredients").value = recipe.ingredients
    .map((ingredient) => `[${ingredient.category}] ${ingredient.item}`)
    .join("\n");
  recipeMealprepCheckbox.checked = Boolean(recipe.mealprep);
}

function openRecipeEditor(recipeId) {
  const recipe = recipeMap().get(recipeId);
  if (!recipe) {
    return;
  }

  editingRecipeId = recipeId;
  recipeForm.reset();
  fillRecipeForm(recipe);
  recipeSubmitButton.textContent = "Aenderungen speichern";
  document.querySelector("#recipe-form-panel h2").textContent = "Rezept bearbeiten";
  recipeSlotSelect.value = "";
  recipeFormPanel.classList.remove("hidden");
  recipeFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setAiLoadingState(isLoading) {
  aiGenerateButton.disabled = isLoading;
  aiRegenerateButton.disabled = isLoading || !aiPromptInput.value.trim();
  saveAiRecipeButton.disabled = isLoading || !latestGeneratedRecipe;
}

async function requestGeneratedRecipe() {
  const prompt = aiPromptInput.value.trim();
  if (!prompt) {
    aiStatus.textContent = "Bitte gib zuerst Vorgaben fuer das Rezept ein.";
    return;
  }

  setAiLoadingState(true);
  aiStatus.textContent = "Rezept wird generiert...";

  try {
    const response = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        servings: aiServingsInput.value.trim(),
        style: aiStyleInput.value.trim()
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Die KI konnte gerade kein Rezept erzeugen.");
    }

    latestGeneratedRecipe = normaliseGeneratedRecipe(payload.recipe, "ai");
    renderGeneratedRecipe(latestGeneratedRecipe);
    aiStatus.textContent = "Neues Rezept ist da. Wenn es dir gefaellt, kannst du es direkt ins Kochbuch uebernehmen.";
  } catch (error) {
    const isLikelyServerIssue =
      error instanceof TypeError ||
      String(error.message || "").includes("Failed to fetch") ||
      String(error.message || "").includes("Load failed");

    aiStatus.textContent = isLikelyServerIssue
      ? "Die KI ist gerade nicht erreichbar. Bitte starte die App ueber `npm start` und pruefe, ob deine `.env` einen `OPENAI_API_KEY` enthaelt."
      : error.message || "Beim Generieren ist etwas schiefgelaufen.";
  } finally {
    setAiLoadingState(false);
  }
}

function createCustomRecipeFromForm(event) {
  event.preventDefault();

  const formData = new FormData(recipeForm);
  const ingredients = String(formData.get("ingredients"))
    .split("\n")
    .map(parseIngredientLine)
    .filter((ingredient) => ingredient.item);
  const steps = String(formData.get("steps"))
    .split("\n")
    .map((step) => step.trim())
    .filter(Boolean);

  const recipeData = {
    title: String(formData.get("title")).trim(),
    category: String(formData.get("category")).trim(),
    time: formatMinutes(formData.get("time")),
    servings: formatServings(formData.get("servings")),
    description: String(formData.get("description")).trim(),
    image: normaliseImageValue(formData.get("image")),
    ingredients,
    nutrition: {
      kcal: formatCalories(formData.get("kcal")),
      fat: formatGrams(formData.get("fat")),
      carbs: formatGrams(formData.get("carbs")),
      protein: formatGrams(formData.get("protein"))
    },
    mealprep: recipeMealprepCheckbox.checked,
    steps,
    tags: ["Eigenes Rezept"]
  };

  let recipeId = editingRecipeId;

  if (editingRecipeId) {
    state.recipes = state.recipes.map((recipe) =>
      recipe.id === editingRecipeId ? { ...recipe, ...recipeData } : recipe
    );
  } else {
    const customRecipe = {
      id: `custom-${Date.now()}-${slugify(recipeData.title)}`,
      ...recipeData
    };
    state.recipes.push(customRecipe);
    state.customRecipeIds.push(customRecipe.id);
    recipeId = customRecipe.id;
  }

  const slotValue = String(formData.get("slotSelect")).trim();
  if (slotValue !== "") {
    const [dayIndex, mealKey] = slotValue.split("-");
    addRecipeToWeek(recipeId, Number(dayIndex), mealKey);
    closeRecipeForm();
    return;
  }

  saveState();
  renderAll();
  closeRecipeForm();
}

function saveGeneratedRecipeToCookbook() {
  if (!latestGeneratedRecipe) {
    return;
  }

  const recipeToSave = {
    ...latestGeneratedRecipe,
    id: `custom-${Date.now()}-${slugify(latestGeneratedRecipe.title)}`,
    tags: [...new Set([...(latestGeneratedRecipe.tags || []), "KI-Rezept"])]
  };

  state.recipes.push(recipeToSave);
  state.customRecipeIds.push(recipeToSave.id);
  saveState();
  renderAll();
  window.location.hash = `#rezept/${recipeToSave.id}`;
  aiStatus.textContent = `"${recipeToSave.title}" wurde ins Kochbuch uebernommen.`;
}

function handleWeekActions(event) {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) {
    return;
  }

  const { action, dayIndex, mealKey, recipeId } = actionButton.dataset;

  if (action === "remove") {
    removeRecipeFromWeek(Number(dayIndex), mealKey);
  }

  if (action === "open-planner") {
    openPlannerModal(Number(dayIndex), mealKey);
  }

  if (action === "toggle-shopping") {
    toggleMealShoppingStatus(Number(dayIndex), mealKey);
  }
}

function handleWeekChanges(event) {
  const factorSelect = event.target.closest('[data-action="factor"]');
  if (!factorSelect) {
    return;
  }

  updateMealFactor(
    Number(factorSelect.dataset.dayIndex),
    factorSelect.dataset.mealKey,
    Number(factorSelect.value) || 1
  );
}

function handlePlannerModalActions(event) {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton || actionButton.dataset.action !== "select-modal-recipe" || !plannerModalSelection) {
    return;
  }

  addRecipeToWeek(
    actionButton.dataset.recipeId,
    plannerModalSelection.dayIndex,
    plannerModalSelection.mealKey
  );
  closePlannerModal();
}

function syncRoute() {
  const route = window.location.hash;
  if (route.startsWith("#rezept/")) {
    const recipeId = route.replace("#rezept/", "");
    renderRecipeDetail(recipeId);
    return;
  }

  detailSection.classList.add("hidden");
}

function renderAll() {
  renderWeekSelect();
  renderWeekRange();
  renderPrintWeekView();
  renderSlotOptions(recipeSlotSelect, "Nur ins Kochbuch speichern");
  renderSlotOptions(detailSlotSelect, "Slot waehlen");
  renderWeek();
  renderCookbookCategories();
  renderPlannerModalCategories();
  renderCookbook();
  renderShoppingDayFilters();
  renderShoppingList();
  syncRoute();
}

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildShoppingList());
    copyFeedback.textContent = "In die Zwischenablage kopiert.";
    window.setTimeout(() => {
      copyFeedback.textContent = "";
    }, 2400);
  } catch (error) {
    copyFeedback.textContent = "Kopieren nicht moeglich. Bitte Text manuell markieren.";
  }
});

weekGrid.addEventListener("click", handleWeekActions);
weekGrid.addEventListener("change", handleWeekChanges);
openRecipeFormButton.addEventListener("click", () => openRecipeForm());
closeRecipeFormButton.addEventListener("click", closeRecipeForm);
recipeForm.addEventListener("submit", createCustomRecipeFromForm);
editRecipeButton.addEventListener("click", () => {
  const recipeId = editRecipeButton.dataset.recipeId;
  if (recipeId) {
    openRecipeEditor(recipeId);
  }
});
detailAddToWeekButton.addEventListener("click", () => {
  const recipeId = detailAddToWeekButton.dataset.recipeId;
  const slotValue = detailSlotSelect.value;
  if (!recipeId || !slotValue) {
    return;
  }

  const [dayIndex, mealKey] = slotValue.split("-");
  addRecipeToWeek(recipeId, Number(dayIndex), mealKey);
});
aiForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await requestGeneratedRecipe();
});
aiRegenerateButton.addEventListener("click", async () => {
  await requestGeneratedRecipe();
});
saveAiRecipeButton.addEventListener("click", saveGeneratedRecipeToCookbook);
plannerModalSearch.addEventListener("input", renderPlannerModalRecipes);
plannerModalCategory.addEventListener("change", renderPlannerModalRecipes);
plannerModalSort.addEventListener("change", renderPlannerModalRecipes);
plannerModalMealprepOnly.addEventListener("change", renderPlannerModalRecipes);
plannerModalList.addEventListener("click", handlePlannerModalActions);
plannerModalCloseButton.addEventListener("click", closePlannerModal);
plannerModal.addEventListener("click", (event) => {
  if (event.target === plannerModal) {
    closePlannerModal();
  }
});
cookbookSearch.addEventListener("input", renderCookbook);
cookbookCategory.addEventListener("change", renderCookbook);
cookbookSort.addEventListener("change", renderCookbook);
cookbookMealprepOnly.addEventListener("change", renderCookbook);
weekSelect.addEventListener("change", (event) => {
  state.selectedWeekOffset = Number(event.target.value) || 0;
  ensureWeekPlan();
  saveState();
  renderAll();
});
printWeekButton.addEventListener("click", () => {
  renderPrintWeekView();
  window.print();
});
shoppingDayFilters.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter-type]");
  if (!filterButton) {
    return;
  }

  toggleShoppingFilter(
    filterButton.dataset.filterType,
    filterButton.dataset.slotId || filterButton.dataset.dayIndex || ""
  );
});
deleteRecipeButton.addEventListener("click", () => {
  const recipeId = deleteRecipeButton.dataset.recipeId;
  if (recipeId) {
    deleteRecipe(recipeId);
  }
});

backButton.addEventListener("click", () => {
  window.location.hash = "#week";
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !plannerModal.classList.contains("hidden")) {
    closePlannerModal();
  }
});

window.addEventListener("hashchange", syncRoute);

loadState();
incrementVersionCounter();
renderAll();
setAiLoadingState(false);
