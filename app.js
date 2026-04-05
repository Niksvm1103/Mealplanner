const storageKey = "mahlzeit-state-v3";
const legacyStorageKey = "mahlzeit-state-v2";
const versionCounterKey = "mahlzeit-version-counter";
const planningWindowDays = 7;
const recipePickerDays = 7;
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
  { key: "breakfast", label: "Frühstück" },
  { key: "lunch", label: "Mittagessen" },
  { key: "dinner", label: "Abendessen" }
];

const baseRecipes = [
  {
    id: "gnocchi-ofengemuese",
    title: "Ofen-Gnocchi mit Gemüse",
    category: "Vegetarisch",
    time: "30 Min",
    servings: "2 Personen",
    description: "Ein schnelles Blechgericht mit Gnocchi, Paprika, Zucchini und cremigem Feta.",
    ingredients: [
      { item: "500 g Gnocchi", category: "Kühlregal" },
      { item: "1 rote Paprika", category: "Gemüse" },
      { item: "1 Zucchini", category: "Gemüse" },
      { item: "1 rote Zwiebel", category: "Gemüse" },
      { item: "150 g Cherrytomaten", category: "Gemüse" },
      { item: "1 Block Feta", category: "Milchprodukte" },
      { item: "2 EL Olivenöl", category: "Öle und Saucen" },
      { item: "1 TL Oregano", category: "Gewürze" },
      { item: "Salz und Pfeffer", category: "Gewürze" }
    ],
    nutrition: { kcal: 640, fat: "25 g", carbs: "73 g", protein: "21 g" },
    steps: [
      "Backofen auf 200 Grad vorheizen.",
      "Gemüse schneiden und mit Gnocchi, Öl und Gewürzen auf ein Blech geben.",
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
    description: "Samtiges Curry mit roten Linsen, Spinat und Kokosmilch für entspannte Abende.",
    ingredients: [
      { item: "250 g rote Linsen", category: "Trockenwaren" },
      { item: "1 Zwiebel", category: "Gemüse" },
      { item: "2 Knoblauchzehen", category: "Gemüse" },
      { item: "1 Stück Ingwer", category: "Gemüse" },
      { item: "1 EL Currypaste", category: "Öle und Saucen" },
      { item: "1 Dose Kokosmilch", category: "Konserven" },
      { item: "400 ml Gemüsebrühe", category: "Konserven" },
      { item: "150 g Blattspinat", category: "Gemüse" },
      { item: "1 Limette", category: "Obst" }
    ],
    nutrition: { kcal: 510, fat: "22 g", carbs: "54 g", protein: "19 g" },
    steps: [
      "Zwiebel, Knoblauch und Ingwer anschwitzen.",
      "Currypaste und Linsen kurz mitrösten.",
      "Kokosmilch und Brühe zugeben und 20 Minuten köcheln.",
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
      { item: "500 g kleine Kartoffeln", category: "Gemüse" },
      { item: "1 Zitrone", category: "Obst" },
      { item: "150 g Joghurt", category: "Milchprodukte" },
      { item: "1 Bund Dill", category: "Gemüse" },
      { item: "1 EL Olivenöl", category: "Öle und Saucen" },
      { item: "Salz und Pfeffer", category: "Gewürze" }
    ],
    nutrition: { kcal: 590, fat: "28 g", carbs: "34 g", protein: "41 g" },
    steps: [
      "Kartoffeln vorkochen und auf dem Blech knusprig backen.",
      "Lachs würzen, danebenlegen und 12 Minuten garen.",
      "Joghurt mit Dill und Zitronensaft verrühren.",
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
    description: "Eine sehr schnelle Alltags-Pasta mit grünem Pesto, Erbsen und Parmesan.",
    ingredients: [
      { item: "250 g Pasta", category: "Trockenwaren" },
      { item: "3 EL grünes Pesto", category: "Öle und Saucen" },
      { item: "150 g TK-Erbsen", category: "Tiefkühl" },
      { item: "40 g Parmesan", category: "Milchprodukte" },
      { item: "1 Zitrone", category: "Obst" },
      { item: "Salz und Pfeffer", category: "Gewürze" }
    ],
    nutrition: { kcal: 560, fat: "18 g", carbs: "74 g", protein: "20 g" },
    steps: [
      "Pasta kochen und Erbsen in den letzten Minuten mitgaren.",
      "Mit Pesto, Nudelwasser und Zitronenabrieb vermengen.",
      "Parmesan darübergeben und servieren."
    ],
    tags: ["Schnell", "Feierabend"]
  },
  {
    id: "tacos-bohnen",
    title: "Bohnen-Tacos mit Avocado",
    category: "Vegetarisch",
    time: "25 Min",
    servings: "3 Personen",
    description: "Knackige Tacos mit würziger Bohnenfüllung, Mais und cremiger Avocado.",
    ingredients: [
      { item: "1 Packung Taco-Shells", category: "Trockenwaren" },
      { item: "1 Dose schwarze Bohnen", category: "Konserven" },
      { item: "1 Dose Mais", category: "Konserven" },
      { item: "1 Avocado", category: "Obst" },
      { item: "1 Tomate", category: "Gemüse" },
      { item: "1 rote Zwiebel", category: "Gemüse" },
      { item: "1 TL Kreuzkümmel", category: "Gewürze" },
      { item: "1 Limette", category: "Obst" }
    ],
    nutrition: { kcal: 520, fat: "21 g", carbs: "62 g", protein: "16 g" },
    steps: [
      "Bohnen und Mais mit Gewürzen in der Pfanne erhitzen.",
      "Avocado, Tomate und Zwiebel fein schneiden.",
      "Tacos füllen und mit Limettensaft servieren."
    ],
    tags: ["Fingerfood", "Schnell"]
  },
  {
    id: "huhn-reis-bowl",
    title: "Hühnchen-Reis-Bowl",
    category: "Geflügel",
    time: "35 Min",
    servings: "2 Personen",
    description: "Saftiges Hühnchen auf Reis mit Gurke, Karotte und Sesam-Dressing.",
    ingredients: [
      { item: "2 Hühnchenbrustfilets", category: "Fleisch und Fisch" },
      { item: "150 g Reis", category: "Trockenwaren" },
      { item: "1 Gurke", category: "Gemüse" },
      { item: "2 Karotten", category: "Gemüse" },
      { item: "2 EL Sojasauce", category: "Öle und Saucen" },
      { item: "1 EL Sesamöl", category: "Öle und Saucen" },
      { item: "1 TL Honig", category: "Backen und Süßes" },
      { item: "1 EL Sesam", category: "Trockenwaren" }
    ],
    nutrition: { kcal: 610, fat: "19 g", carbs: "49 g", protein: "52 g" },
    steps: [
      "Reis kochen und Hühnchen anbraten.",
      "Gemüse fein hobeln.",
      "Dressing aus Sojasauce, Sesamöl und Honig rühren.",
      "Alles in Bowls anrichten und mit Sesam toppen."
    ],
    tags: ["Bowl", "Meal Prep"]
  },
  {
    id: "tomatensuppe-toast",
    title: "Tomatensuppe mit Käsestoast",
    category: "Vegetarisch",
    time: "25 Min",
    servings: "2 Personen",
    description: "Wärmende Suppe mit knusprigem Käsestoast für einen unkomplizierten Sonntag.",
    ingredients: [
      { item: "1 Dose gehackte Tomaten", category: "Konserven" },
      { item: "1 Zwiebel", category: "Gemüse" },
      { item: "1 Knoblauchzehe", category: "Gemüse" },
      { item: "300 ml Gemüsebrühe", category: "Konserven" },
      { item: "2 Scheiben Sauerteigbrot", category: "Brot und Backwaren" },
      { item: "80 g Käse", category: "Milchprodukte" },
      { item: "1 EL Olivenöl", category: "Öle und Saucen" },
      { item: "Basilikum", category: "Gemüse" }
    ],
    nutrition: { kcal: 470, fat: "19 g", carbs: "45 g", protein: "19 g" },
    steps: [
      "Zwiebel und Knoblauch anschwitzen, Tomaten und Brühe zugeben.",
      "Suppe 15 Minuten köcheln und fein mixen.",
      "Brot mit Käse überbacken und dazu servieren."
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
  "Gemüse",
  "Obst",
  "Fleisch und Fisch",
  "Milchprodukte",
  "Kühlregal",
  "Tiefkühl",
  "Konserven",
  "Trockenwaren",
  "Brot und Backwaren",
  "Öle und Saucen",
  "Gewürze",
  "Backen und Süßes",
  "Sonstiges"
];

const state = {
  recipes: baseRecipes.map(normaliseRecipe),
  customRecipeIds: [],
  selectedWeekOffset: 0,
  selectedShoppingWeekOffset: 0,
  dayPlans: {},
  selectedShoppingSlotIds: [],
  shoppingSelectionWeekKeys: [],
  nutritionGoals: {
    kcal: null,
    fat: null,
    protein: null,
    carbs: null
  }
};
let pendingStateSave = Promise.resolve();

function createEmptyDayAssignment() {
  return {
    breakfast: { recipeId: null, factor: 1, skipShopping: false },
    lunch: { recipeId: null, factor: 1, skipShopping: false },
    dinner: { recipeId: null, factor: 1, skipShopping: false }
  };
}

function createDefaultWeekAssignments(startDate = getPlanningWeekStart()) {
  return getWeekDaysForStart(startDate).map(({ date }) =>
    normaliseDayAssignment(initialWeekTemplate[getMondayBasedDayIndex(date)])
  );
}

function createEmptyWeekAssignments() {
  return Array.from({ length: planningWindowDays }, () => createEmptyDayAssignment());
}

function formatWeekKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMondayBasedDayIndex(date) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function getWeekdayLabel(date) {
  return new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(date);
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
  return Array.from({ length: planningWindowDays }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return { day: getWeekdayLabel(date), date, dateKey: formatWeekKey(date) };
  });
}

function getSelectedWeekDays() {
  return getWeekDaysForStart(getSelectedWeekStart());
}

function getWeekDaysForOffset(offset = 0) {
  return getWeekDaysForStart(getWeekStartForOffset(offset));
}

function getShoppingWeekStart() {
  return getWeekStartForOffset(state.selectedShoppingWeekOffset || 0);
}

function getShoppingWeekKey() {
  return formatWeekKey(getShoppingWeekStart());
}

function getShoppingWeekDays() {
  return getWeekDaysForOffset(state.selectedShoppingWeekOffset || 0);
}

function getRecipePickerDays() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  return Array.from({ length: recipePickerDays }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { day: getWeekdayLabel(date), date, dateKey: formatWeekKey(date) };
  });
}

function createDefaultSelectedShoppingSlots(days = getSelectedWeekDays()) {
  return days.flatMap(({ dateKey }) => mealSlots.map((slot) => getSlotId(dateKey, slot.key)));
}

function getDayPlan(dateKey) {
  if (!state.dayPlans[dateKey]) {
    state.dayPlans[dateKey] = createEmptyDayAssignment();
  }

  return state.dayPlans[dateKey];
}

function getDayPlanByIndex(dayIndex) {
  const weekDay = getSelectedWeekDays()[dayIndex];
  return weekDay ? getDayPlan(weekDay.dateKey) : createEmptyDayAssignment();
}

function ensureWeekPlan() {
  ensureWeekSeeded(state.selectedWeekOffset || 0);
  return {
    weekAssignments: getSelectedWeekDays().map(({ dateKey }) => getDayPlan(dateKey)),
    selectedShoppingSlots: state.selectedShoppingSlotIds
  };
}

function ensureShoppingWeekPlan() {
  ensureWeekSeeded(state.selectedShoppingWeekOffset || 0);
  return {
    weekAssignments: getShoppingWeekDays().map(({ dateKey }) => getDayPlan(dateKey)),
    selectedShoppingSlots: state.selectedShoppingSlotIds
  };
}

function ensureWeekSeeded(offset = 0) {
  const weekDays = getWeekDaysForOffset(offset);
  const currentWeekKey = formatWeekKey(getWeekStartForOffset(offset));
  weekDays.forEach(({ dateKey }, index) => {
    if (!state.dayPlans[dateKey]) {
      state.dayPlans[dateKey] =
        offset === 0
          ? createDefaultWeekAssignments(getWeekStartForOffset(offset))[index]
          : createEmptyDayAssignment();
    }
  });

  if (!state.shoppingSelectionWeekKeys.includes(currentWeekKey)) {
    const defaultSlotIds = createDefaultSelectedShoppingSlots(weekDays);
    state.selectedShoppingSlotIds = [...new Set([...state.selectedShoppingSlotIds, ...defaultSlotIds])];
    state.shoppingSelectionWeekKeys.push(currentWeekKey);
  }
}

function resetState() {
  state.recipes = baseRecipes.map(normaliseRecipe);
  state.customRecipeIds = [];
  state.selectedWeekOffset = 0;
  state.selectedShoppingWeekOffset = 0;
  state.dayPlans = {};
  state.selectedShoppingSlotIds = [];
  state.shoppingSelectionWeekKeys = [];
  state.nutritionGoals = {
    kcal: null,
    fat: null,
    protein: null,
    carbs: null
  };
}

function createStateSnapshot() {
  return {
    recipes: state.recipes,
    customRecipeIds: state.customRecipeIds,
    selectedWeekOffset: state.selectedWeekOffset,
    selectedShoppingWeekOffset: state.selectedShoppingWeekOffset,
    dayPlans: state.dayPlans,
    selectedShoppingSlotIds: state.selectedShoppingSlotIds,
    shoppingSelectionWeekKeys: state.shoppingSelectionWeekKeys,
    nutritionGoals: state.nutritionGoals
  };
}

function applyStoredState(parsed) {
  resetState();

  if (!parsed || typeof parsed !== "object") {
    ensureWeekSeeded(state.selectedWeekOffset || 0);
    ensureWeekSeeded(state.selectedShoppingWeekOffset || 0);
    return;
  }

  if (Array.isArray(parsed.recipes)) {
    state.recipes = parsed.recipes.map(normaliseRecipe);
  }

  if (!Array.isArray(parsed.recipes) && Array.isArray(parsed.customRecipes)) {
    parsed.customRecipes.forEach((recipe) => state.recipes.push(normaliseRecipe(recipe)));
    state.customRecipeIds = parsed.customRecipes.map((recipe) => recipe.id);
  }

  if (Array.isArray(parsed.customRecipeIds)) {
    state.customRecipeIds = parsed.customRecipeIds;
  }

  if (Number.isInteger(parsed.selectedWeekOffset) && Number(parsed.selectedWeekOffset) >= 0) {
    state.selectedWeekOffset = Number(parsed.selectedWeekOffset);
  }

  if (Number.isInteger(parsed.selectedShoppingWeekOffset) && Number(parsed.selectedShoppingWeekOffset) >= 0) {
    state.selectedShoppingWeekOffset = Number(parsed.selectedShoppingWeekOffset);
  }

  if (parsed.dayPlans && typeof parsed.dayPlans === "object") {
    Object.entries(parsed.dayPlans).forEach(([dateKey, assignment]) => {
      state.dayPlans[dateKey] = normaliseDayAssignment(assignment);
    });
  }

  if (Array.isArray(parsed.selectedShoppingSlotIds)) {
    state.selectedShoppingSlotIds = [...new Set(parsed.selectedShoppingSlotIds)];
  }

  if (Array.isArray(parsed.shoppingSelectionWeekKeys)) {
    state.shoppingSelectionWeekKeys = [...new Set(parsed.shoppingSelectionWeekKeys)];
  }

  if (parsed.nutritionGoals && typeof parsed.nutritionGoals === "object") {
    state.nutritionGoals = normaliseNutritionGoals(parsed.nutritionGoals);
  }

  if (parsed.weekPlans && typeof parsed.weekPlans === "object") {
    Object.entries(parsed.weekPlans).forEach(([weekKey, weekPlan]) => {
      const assignments = Array.isArray(weekPlan?.weekAssignments) ? weekPlan.weekAssignments : [];
      const selectedShoppingSlots = Array.isArray(weekPlan?.selectedShoppingSlots)
        ? weekPlan.selectedShoppingSlots
        : Array.isArray(weekPlan?.selectedShoppingDays)
          ? weekPlan.selectedShoppingDays.flatMap((dayIndex) => mealSlots.map((slot) => `${dayIndex}-${slot.key}`))
          : [];
      const startDate = new Date(`${weekKey}T00:00:00`);
      const weekDays = getWeekDaysForStart(startDate).slice(0, assignments.length);

      weekDays.forEach(({ dateKey }, index) => {
        state.dayPlans[dateKey] = normaliseDayAssignment(assignments[index]);
      });

      selectedShoppingSlots.forEach((slotId) => {
        const [legacyDayIndex, mealKey] = String(slotId).split("-");
        const dayIndex = Number(legacyDayIndex);
        const weekDay = weekDays[dayIndex];
        if (weekDay && mealKey) {
          state.selectedShoppingSlotIds.push(getSlotId(weekDay.dateKey, mealKey));
        }
      });
    });
  } else if (Array.isArray(parsed.weekAssignments)) {
    const weekDays = getWeekDaysForStart(getPlanningWeekStart()).slice(0, parsed.weekAssignments.length);

    weekDays.forEach(({ dateKey }, index) => {
      state.dayPlans[dateKey] = normaliseDayAssignment(parsed.weekAssignments[index]);
    });

    const selectedShoppingSlots = Array.isArray(parsed.selectedShoppingSlots)
      ? parsed.selectedShoppingSlots
      : Array.isArray(parsed.selectedShoppingDays)
        ? parsed.selectedShoppingDays.flatMap((dayIndex) => mealSlots.map((slot) => `${dayIndex}-${slot.key}`))
        : [];

    selectedShoppingSlots.forEach((slotId) => {
      const [legacyDayIndex, mealKey] = String(slotId).split("-");
      const dayIndex = Number(legacyDayIndex);
      const weekDay = weekDays[dayIndex];
      if (weekDay && mealKey) {
        state.selectedShoppingSlotIds.push(getSlotId(weekDay.dateKey, mealKey));
      }
    });
  }

  state.selectedShoppingSlotIds = [...new Set(state.selectedShoppingSlotIds)];
  ensureWeekSeeded(state.selectedWeekOffset || 0);
  ensureWeekSeeded(state.selectedShoppingWeekOffset || 0);
}

function readLegacyLocalState() {
  const saved = window.localStorage.getItem(storageKey) || window.localStorage.getItem(legacyStorageKey);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    window.localStorage.removeItem(storageKey);
    window.localStorage.removeItem(legacyStorageKey);
    return null;
  }
}

function shouldPreferLegacyState(serverState, legacyState) {
  const serverCustomCount = Array.isArray(serverState?.customRecipeIds) ? serverState.customRecipeIds.length : 0;
  const legacyCustomCount = Array.isArray(legacyState?.customRecipeIds) ? legacyState.customRecipeIds.length : 0;
  const serverRecipeCount = Array.isArray(serverState?.recipes) ? serverState.recipes.length : 0;
  const legacyRecipeCount = Array.isArray(legacyState?.recipes) ? legacyState.recipes.length : 0;

  if (legacyCustomCount > serverCustomCount) {
    return true;
  }

  if (serverCustomCount === 0 && legacyCustomCount === 0 && legacyRecipeCount > serverRecipeCount) {
    return true;
  }

  return false;
}

async function loadState() {
  const legacyState = readLegacyLocalState();

  try {
    const response = await fetch("/api/state");
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "App-State konnte nicht geladen werden.");
    }

    if (payload.state && typeof payload.state === "object") {
      const resolvedState = shouldPreferLegacyState(payload.state, legacyState) ? legacyState : payload.state;
      applyStoredState(resolvedState);

      if (resolvedState === legacyState) {
        saveState();
      }

      return;
    }
  } catch (error) {
    console.error("State konnte nicht vom Server geladen werden.", error);
  }

  if (legacyState) {
    applyStoredState(legacyState);
    saveState();
    return;
  }

  resetState();
  ensureWeekSeeded(state.selectedWeekOffset || 0);
  ensureWeekSeeded(state.selectedShoppingWeekOffset || 0);
}

function saveState() {
  const serializedState = JSON.stringify(createStateSnapshot());
  window.localStorage.setItem(storageKey, serializedState);

  pendingStateSave = pendingStateSave
    .catch(() => {})
    .then(async () => {
      const response = await fetch("/api/state", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ state: JSON.parse(serializedState) })
      });

      if (!response.ok) {
        let message = "App-State konnte nicht gespeichert werden.";

        try {
          const payload = await response.json();
          message = payload.error || message;
        } catch (error) {
          // Ignore JSON parsing issues and keep generic message.
        }

        throw new Error(message);
      }
    })
    .catch((error) => {
      console.error("State konnte nicht auf dem Server gespeichert werden.", error);
    });

  return pendingStateSave;
}

function recipeMap() {
  return new Map(state.recipes.map((recipe) => [recipe.id, recipe]));
}

function getSlotId(dayKey, mealKey) {
  return `${dayKey}::${mealKey}`;
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
const printShoppingButton = document.querySelector("#print-shopping-button");
const shoppingWeekSelect = document.querySelector("#shopping-week-select");
const copyFeedback = document.querySelector("#copy-feedback");
const detailSection = document.querySelector("#recipe-detail");
const backButton = document.querySelector("#back-button");
const editRecipeButton = document.querySelector("#edit-recipe-button");
const deleteRecipeButton = document.querySelector("#delete-recipe-button");
const detailSlotSelect = document.querySelector("#detail-slot-select");
const detailAddToWeekButton = document.querySelector("#detail-add-to-week");
const detailRatingEditor = document.querySelector("#detail-rating-editor");
const detailRatingSummary = document.querySelector("#detail-rating-summary");
const detailNotesInput = document.querySelector("#detail-notes");
const weekRange = document.querySelector("#week-range");
const weekSelect = document.querySelector("#week-select");
const printWeekButton = document.querySelector("#print-week-button");
const printWeekConfirmButton = document.querySelector("#print-week-confirm");
const printWeekCloseButton = document.querySelector("#print-week-close");
const printWeekRange = document.querySelector("#print-week-range");
const printWeekHeadings = document.querySelector("#print-week-headings");
const printWeekBody = document.querySelector("#print-week-body");
const printShoppingConfirmButton = document.querySelector("#print-shopping-confirm");
const printShoppingCloseButton = document.querySelector("#print-shopping-close");
const printShoppingRange = document.querySelector("#print-shopping-range");
const printShoppingBody = document.querySelector("#print-shopping-body");
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
const profileModal = document.querySelector("#profile-modal");
const openProfileButton = document.querySelector("#open-profile-button");
const closeProfileButton = document.querySelector("#close-profile-button");
const profileForm = document.querySelector("#profile-form");
const resetProfileButton = document.querySelector("#reset-profile-button");
const profileKcalInput = document.querySelector("#profile-kcal");
const profileFatInput = document.querySelector("#profile-fat");
const profileProteinInput = document.querySelector("#profile-protein");
const profileCarbsInput = document.querySelector("#profile-carbs");

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
  const options = buildWeekSelectOptions();
  weekSelect.innerHTML = options;
  weekSelect.value = String(state.selectedWeekOffset || 0);
}

function renderShoppingWeekSelect() {
  const options = buildWeekSelectOptions();
  shoppingWeekSelect.innerHTML = options;
  shoppingWeekSelect.value = String(state.selectedShoppingWeekOffset || 0);
}

function buildWeekSelectOptions() {
  const options = Array.from({ length: 12 }, (_, offset) => {
    const weekDays = getWeekDaysForStart(getWeekStartForOffset(offset));
    const labelPrefix =
      offset === 0 ? "Aktuelle Woche" : offset === 1 ? "Nächste Woche" : `In ${offset} Wochen`;
    return `<option value="${offset}">${labelPrefix}: ${formatShortDate(weekDays[0].date)} bis ${formatShortDate(weekDays[planningWindowDays - 1].date)}</option>`;
  });

  return options.join("");
}

function renderWeekRange() {
  const weekDays = getSelectedWeekDays();
  weekRange.textContent = `${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[planningWindowDays - 1].date)}`;
}

function renderPrintWeekView() {
  const recipesById = recipeMap();
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();
  printWeekRange.textContent = `${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[planningWindowDays - 1].date)}`;
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

function renderPrintShoppingView() {
  const weekDays = getShoppingWeekDays();
  const grouped = collectShoppingItemsByCategory();
  const categorySections = [...grouped.entries()].filter(([, items]) => items.length > 0);

  printShoppingRange.textContent = `${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[planningWindowDays - 1].date)}`;
  printShoppingBody.innerHTML = categorySections
    .map(
      ([category, items]) => `
        <section class="print-shopping-section">
          <h2>${category}</h2>
          <div class="print-shopping-items">
            ${items.map((item) => `<div class="print-shopping-item">${item}</div>`).join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function incrementVersionCounter() {
  const savedCount = Number(window.localStorage.getItem(versionCounterKey) || "0");
  const nextCount = savedCount + 1;
  window.localStorage.setItem(versionCounterKey, String(nextCount));
  if (versionCounter) {
    versionCounter.textContent = `Version ${nextCount}`;
  }
}

function renderSlotOptions(selectElement, emptyLabel, days = getSelectedWeekDays()) {
  selectElement.innerHTML = [
    `<option value="">${emptyLabel}</option>`,
    ...days.flatMap(({ day, date, dateKey }) =>
      mealSlots.map(
        (slot) =>
          `<option value="${getSlotId(dateKey, slot.key)}">${day} (${formatShortDate(date)}) - ${slot.label}</option>`
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

function parseGoalNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(String(value).replace(",", "."));
  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  return Number(number.toFixed(1));
}

function normaliseNutritionGoals(goals = {}) {
  return {
    kcal: parseGoalNumber(goals.kcal),
    fat: parseGoalNumber(goals.fat),
    protein: parseGoalNumber(goals.protein),
    carbs: parseGoalNumber(goals.carbs)
  };
}

function formatGoalInputValue(value) {
  return value === null ? "" : String(value);
}

function getNutritionGoalStatus(metricKey, totalValue, goalValue) {
  if (goalValue === null) {
    return null;
  }

  const isMet = metricKey === "protein" ? totalValue >= goalValue : totalValue <= goalValue;

  return { isMet };
}

function renderNutritionGoalComparison(metricKey, shortLabel, totalValue, goalValue, unit = "") {
  const status = getNutritionGoalStatus(metricKey, totalValue, goalValue);

  if (!status) {
    return `
      <span class="week-day-nutrition-item week-day-nutrition-item-goal is-unset">
        <span class="nutrition-chip-label">${shortLabel}</span>
        <strong>${formatNutritionTotal(totalValue, unit)}</strong>
      </span>
    `;
  }

  return `
    <span class="week-day-nutrition-item week-day-nutrition-item-goal ${status.isMet ? "is-met" : "is-over"}">
      <span class="nutrition-chip-label">${shortLabel}</span>
      <strong>${formatNutritionTotal(totalValue, unit)}</strong>
      <span class="nutrition-goal-text">Ziel: ${formatNutritionTotal(goalValue, unit)}</span>
    </span>
  `;
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

const aggregateUnitAliases = new Map([
  ["g", "g"],
  ["gramm", "g"],
  ["kg", "kg"],
  ["kilogramm", "kg"],
  ["ml", "ml"],
  ["milliliter", "ml"],
  ["l", "l"],
  ["liter", "l"],
  ["el", "EL"],
  ["tl", "TL"],
  ["stück", "Stueck"],
  ["stk", "Stueck"],
  ["bund", "Bund"],
  ["dose", "Dose"],
  ["dosen", "Dose"],
  ["packung", "Packung"],
  ["packungen", "Packung"],
  ["block", "Block"],
  ["blöcke", "Block"],
  ["bloecke", "Block"],
  ["scheibe", "Scheibe"],
  ["scheiben", "Scheibe"],
  ["zehe", "Zehe"],
  ["zehen", "Zehe"]
]);

const aggregateDisplayUnits = {
  g: { singular: "g", plural: "g" },
  ml: { singular: "ml", plural: "ml" },
  EL: { singular: "EL", plural: "EL" },
  TL: { singular: "TL", plural: "TL" },
  Stueck: { singular: "Stück", plural: "Stück" },
  Bund: { singular: "Bund", plural: "Bund" },
  Dose: { singular: "Dose", plural: "Dosen" },
  Packung: { singular: "Packung", plural: "Packungen" },
  Block: { singular: "Block", plural: "Blöcke" },
  Scheibe: { singular: "Scheibe", plural: "Scheiben" },
  Zehe: { singular: "Zehe", plural: "Zehen" }
};

function formatAggregateNumber(value) {
  const roundedValue = Number(value.toFixed(2));
  return Number.isInteger(roundedValue) ? String(roundedValue) : String(roundedValue).replace(".", ",");
}

function normaliseAggregateUnit(unit) {
  const cleanedUnit = String(unit || "")
    .trim()
    .toLowerCase()
    .replace(/\.$/, "");
  return aggregateUnitAliases.get(cleanedUnit) || null;
}

function parseAggregatableIngredient(text, factor = 1) {
  const trimmed = String(text).trim();
  const match = trimmed.match(/^(\d+(?:[.,]\d+)?)(?:\s*([\p{L}.]+))?(?:\s+(.+))?$/u);
  if (!match) {
    return null;
  }

  const baseAmount = Number(match[1].replace(",", "."));
  if (!Number.isFinite(baseAmount)) {
    return null;
  }

  const possibleUnit = match[2] || "";
  const remainder = (match[3] || "").trim();
  const normalisedUnit = normaliseAggregateUnit(possibleUnit);

  if (normalisedUnit) {
    if (!remainder) {
      return null;
    }

    if (normalisedUnit === "kg") {
      return {
        amount: baseAmount * factor * 1000,
        unit: "g",
        name: remainder,
        key: `g|${remainder.toLocaleLowerCase("de")}`
      };
    }

    if (normalisedUnit === "l") {
      return {
        amount: baseAmount * factor * 1000,
        unit: "ml",
        name: remainder,
        key: `ml|${remainder.toLocaleLowerCase("de")}`
      };
    }

    return {
      amount: baseAmount * factor,
      unit: normalisedUnit,
      name: remainder,
      key: `${normalisedUnit}|${remainder.toLocaleLowerCase("de")}`
    };
  }

  const inferredName = `${possibleUnit}${possibleUnit && remainder ? " " : ""}${remainder}`.trim();
  if (!inferredName) {
    return null;
  }

  return {
    amount: baseAmount * factor,
    unit: "",
    name: inferredName,
    key: `count|${inferredName.toLocaleLowerCase("de")}`
  };
}

function formatAggregatedIngredient(entry) {
  const amountText = formatAggregateNumber(entry.amount);
  const sourceText = entry.sources.length ? ` (${entry.sources.join("; ")})` : "";
  if (!entry.unit) {
    return `${`${amountText} ${entry.name}`.trim()}${sourceText}`;
  }

  const unitLabel = aggregateDisplayUnits[entry.unit] || {
    singular: entry.unit,
    plural: entry.unit
  };
  const unitText = Number(entry.amount) === 1 ? unitLabel.singular : unitLabel.plural;
  return `${`${amountText} ${unitText} ${entry.name}`.trim()}${sourceText}`;
}

function formatShoppingSource(dayLabel, slotLabel, recipeTitle, factor) {
  const shortDayLabel =
    {
      Montag: "Mo",
      Dienstag: "Di",
      Mittwoch: "Mi",
      Donnerstag: "Do",
      Freitag: "Fr",
      Samstag: "Sa",
      Sonntag: "So"
    }[dayLabel] || dayLabel;
  const shortSlotLabel =
    {
      Frühstück: "Morgens",
      Mittagessen: "Mittags",
      Abendessen: "Abends"
    }[slotLabel] || slotLabel;

  return `${shortDayLabel} ${shortSlotLabel}: ${recipeTitle} (${formatFactorLabel(factor)})`;
}

function collectShoppingItemsByCategory() {
  const recipesById = recipeMap();
  const weekDays = getShoppingWeekDays();
  const weekPlan = ensureShoppingWeekPlan();
  const grouped = new Map();

  categoryOrder.forEach((category) => {
    grouped.set(category, { aggregated: new Map(), plain: [] });
  });

  weekPlan.weekAssignments.forEach((assignment, dayIndex) => {
    mealSlots.forEach((slot) => {
      const slotId = getSlotId(weekDays[dayIndex].dateKey, slot.key);
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

      const source = formatShoppingSource(weekDays[dayIndex].day, slot.label, recipe.title, mealEntry.factor);

      recipe.ingredients.forEach((ingredient) => {
        const category = grouped.has(ingredient.category) ? ingredient.category : "Sonstiges";
        const targetGroup = grouped.get(category);
        const parsedIngredient = parseAggregatableIngredient(ingredient.item, mealEntry.factor);

        if (!parsedIngredient) {
          targetGroup.plain.push(`${scaleIngredientText(ingredient.item, mealEntry.factor)} (${source})`);
          return;
        }

        const existing = targetGroup.aggregated.get(parsedIngredient.key);
        if (existing) {
          existing.amount += parsedIngredient.amount;
          if (!existing.sources.includes(source)) {
            existing.sources.push(source);
          }
          return;
        }

        targetGroup.aggregated.set(parsedIngredient.key, { ...parsedIngredient, sources: [source] });
      });
    });
  });

  return new Map(
    [...grouped.entries()].map(([category, entry]) => {
      const items = [
        ...[...entry.aggregated.values()].map(formatAggregatedIngredient),
        ...entry.plain
      ].sort((a, b) => a.localeCompare(b, "de"));

      return [category, items];
    })
  );
}

function normaliseGeneratedRecipe(recipe, idPrefix = "custom") {
  return normaliseRecipe({
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
  });
}

function normaliseRecipeRating(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) {
    return 0;
  }

  return Math.min(5, Math.max(0, Math.round(rating)));
}

function normaliseRecipeNotes(value) {
  return String(value || "").trim();
}

function normaliseRecipe(recipe) {
  return {
    ...recipe,
    rating: normaliseRecipeRating(recipe?.rating),
    notes: normaliseRecipeNotes(recipe?.notes)
  };
}

function renderRatingStars(rating, options = {}) {
  const roundedRating = normaliseRecipeRating(rating);
  const interactive = Boolean(options.interactive);
  const className = options.className || "rating-stars";
  const ariaLabel = interactive ? "Rezeptbewertung" : `Bewertung: ${roundedRating || 0} von 5 Sternen`;

  return `
    <div class="${className}" ${interactive ? 'role="radiogroup"' : ""} aria-label="${ariaLabel}">
      ${[1, 2, 3, 4, 5]
        .map((starValue) => {
          const filled = starValue <= roundedRating;
          if (!interactive) {
            return `<span class="rating-star ${filled ? "is-active" : ""}" aria-hidden="true">${filled ? "★" : "☆"}</span>`;
          }

          return `
            <button
              class="rating-star-button ${filled ? "is-active" : ""}"
              type="button"
              data-rating-value="${starValue}"
              role="radio"
              aria-checked="${filled && roundedRating === starValue ? "true" : "false"}"
              aria-label="${starValue} ${starValue === 1 ? "Stern" : "Sterne"}"
              title="${starValue} ${starValue === 1 ? "Stern" : "Sterne"}"
            >
              ★
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function getRecipeRatingLabel(recipe) {
  const rating = normaliseRecipeRating(recipe?.rating);
  return rating > 0 ? `${rating}/5 Sterne` : "Noch nicht bewertet";
}

function renderWeek() {
  const recipesById = recipeMap();
  const weekDays = getSelectedWeekDays();
  const weekPlan = ensureWeekPlan();

  weekGrid.innerHTML = weekDays
    .map(({ day, date }, index) => {
      const dayNutritionTotals = getDayNutritionTotals(weekPlan.weekAssignments[index], recipesById);

      return `
        <article class="card week-day-card">
          <div class="week-day-header">
            <p class="day-label">${day}</p>
            <p class="day-date">${formatShortDate(date)}</p>
          </div>
          <div class="week-day-nutrition" aria-label="Tageswerte">
            ${renderNutritionGoalComparison("kcal", "kcal", dayNutritionTotals.kcal, state.nutritionGoals.kcal)}
            ${renderNutritionGoalComparison("fat", "F", dayNutritionTotals.fat, state.nutritionGoals.fat, "g")}
            ${renderNutritionGoalComparison("protein", "P", dayNutritionTotals.protein, state.nutritionGoals.protein, "g")}
            ${renderNutritionGoalComparison("carbs", "KH", dayNutritionTotals.carbs, state.nutritionGoals.carbs, "g")}
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
                      ${mealEntry.skipShopping ? '<span class="pill">Schon eingeplant</span>' : ""}
                    </div>
                    <div class="meal-factor-row">
                      <select
                        id="meal-factor-${index}-${slot.key}"
                        class="add-select meal-factor-select"
                        data-action="factor"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                        aria-label="Portionsfaktor für ${recipe.title}"
                      >
                        ${[1, 2, 3, 4, 5, 6]
                          .map(
                            (factor) =>
                              `<option value="${factor}" ${mealEntry.factor === factor ? "selected" : ""}>${formatFactorLabel(factor)}</option>`
                          )
                          .join("")}
                      </select>
                    </div>
                    <div class="meal-slot-actions">
                      <a class="button secondary small meal-view-button" href="#rezept/${recipe.id}">Rezept ansehen</a>
                      <button
                        class="button subtle-tag small"
                        type="button"
                        data-action="toggle-shopping"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                      >
                        ${mealEntry.skipShopping ? "In Einkaufsliste aufnehmen" : "Schon eingeplant"}
                      </button>
                      <button
                        class="button danger-outline small"
                        type="button"
                        data-action="remove"
                        data-day-index="${index}"
                        data-meal-key="${slot.key}"
                      >
                        Rezept entfernen
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
    recipe.notes || "",
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
          <div class="recipe-rating-row">
            ${renderRatingStars(recipe.rating)}
          </div>
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
  if (sortMode === "rating-asc") {
    return normaliseRecipeRating(recipeA.rating) - normaliseRecipeRating(recipeB.rating) ||
      recipeA.title.localeCompare(recipeB.title, "de");
  }

  if (sortMode === "rating-desc") {
    return normaliseRecipeRating(recipeB.rating) - normaliseRecipeRating(recipeA.rating) ||
      recipeA.title.localeCompare(recipeB.title, "de");
  }

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
  const weekDays = getShoppingWeekDays();
  const weekPlan = ensureShoppingWeekPlan();
  const allSlotIds = weekDays.flatMap(({ dateKey }) => mealSlots.map((slot) => getSlotId(dateKey, slot.key)));
  const allSelected = allSlotIds.every((slotId) => weekPlan.selectedShoppingSlots.includes(slotId));
  shoppingDayFilters.innerHTML = [
    `<div class="shopping-filter-group">
      <span class="shopping-filter-label">Gesamt</span>
      <button class="filter-chip ${allSelected ? "active" : ""}" type="button" data-filter-type="all">Alle Tage</button>
    </div>`,
    ...weekDays.map(({ day, dateKey }, dayIndex) => {
      const daySlotIds = mealSlots.map((slot) => getSlotId(dateKey, slot.key));
      const fullDaySelected = daySlotIds.every((slotId) => weekPlan.selectedShoppingSlots.includes(slotId));

      return `
        <div class="shopping-filter-group">
          <span class="shopping-filter-label">${day}</span>
          <button class="filter-chip ${fullDaySelected ? "active" : ""}" type="button" data-filter-type="day" data-day-index="${dayIndex}">
            Ganzer Tag
          </button>
          ${mealSlots
            .map((slot) => {
              const slotId = getSlotId(dateKey, slot.key);
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
          <div class="recipe-rating-row">
            ${renderRatingStars(recipe.rating)}
          </div>
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

function syncProfileForm() {
  profileKcalInput.value = formatGoalInputValue(state.nutritionGoals.kcal);
  profileFatInput.value = formatGoalInputValue(state.nutritionGoals.fat);
  profileProteinInput.value = formatGoalInputValue(state.nutritionGoals.protein);
  profileCarbsInput.value = formatGoalInputValue(state.nutritionGoals.carbs);
}

function openProfileModal() {
  syncProfileForm();
  profileModal.classList.remove("hidden");
  profileModal.setAttribute("aria-hidden", "false");
  profileKcalInput.focus();
}

function closeProfileModal() {
  profileModal.classList.add("hidden");
  profileModal.setAttribute("aria-hidden", "true");
}

function saveNutritionGoals(event) {
  event.preventDefault();
  state.nutritionGoals = normaliseNutritionGoals({
    kcal: profileKcalInput.value,
    fat: profileFatInput.value,
    protein: profileProteinInput.value,
    carbs: profileCarbsInput.value
  });
  saveState();
  renderWeek();
  closeProfileModal();
}

function resetNutritionGoals() {
  state.nutritionGoals = normaliseNutritionGoals();
  syncProfileForm();
  saveState();
  renderWeek();
}

function buildShoppingList() {
  const weekDays = getShoppingWeekDays();
  const grouped = collectShoppingItemsByCategory();
  const categorySections = [...grouped.entries()]
    .filter(([, items]) => items.length > 0);

  return [
    `Einkaufsliste für ${formatLongDate(weekDays[0].date)} bis ${formatLongDate(weekDays[planningWindowDays - 1].date)}`,
    "",
    ...categorySections.flatMap(([category, items]) => [category, ...items, ""])
  ]
    .join("\n")
    .trim();
}

function renderShoppingList() {
  shoppingOutput.textContent = buildShoppingList();
}

function exportShoppingList() {
  const shoppingText = buildShoppingList();
  const blob = new Blob([shoppingText], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  const weekDays = getShoppingWeekDays();

  downloadLink.href = downloadUrl;
  downloadLink.download = `einkaufsliste-${formatWeekKey(weekDays[0].date)}.txt`;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  URL.revokeObjectURL(downloadUrl);
}

function toggleShoppingFilter(filterType, value) {
  const weekDays = getShoppingWeekDays();
  ensureWeekSeeded(state.selectedShoppingWeekOffset || 0);

  if (filterType === "all") {
    const allSlotIds = weekDays.flatMap(({ dateKey }) =>
      mealSlots.map((slot) => getSlotId(dateKey, slot.key))
    );
    const allSelected = allSlotIds.every((slotId) => state.selectedShoppingSlotIds.includes(slotId));
    state.selectedShoppingSlotIds = allSelected
      ? state.selectedShoppingSlotIds.filter((slotId) => !allSlotIds.includes(slotId))
      : [...new Set([...state.selectedShoppingSlotIds, ...allSlotIds])];
  } else if (filterType === "day") {
    const dayIndex = Number(value);
    const weekDay = weekDays[dayIndex];
    if (!weekDay) {
      return;
    }

    const daySlotIds = mealSlots.map((slot) => getSlotId(weekDay.dateKey, slot.key));
    const allSelected = daySlotIds.every((slotId) => state.selectedShoppingSlotIds.includes(slotId));

    if (allSelected) {
      const remainingSlots = state.selectedShoppingSlotIds.filter((slotId) => !daySlotIds.includes(slotId));
      state.selectedShoppingSlotIds = remainingSlots;
    } else {
      state.selectedShoppingSlotIds = [...new Set([...state.selectedShoppingSlotIds, ...daySlotIds])];
    }
  } else if (filterType === "slot") {
    const slotId = value;
    const isSelected = state.selectedShoppingSlotIds.includes(slotId);

    if (isSelected) {
      const remainingSlots = state.selectedShoppingSlotIds.filter((entry) => entry !== slotId);
      state.selectedShoppingSlotIds = remainingSlots;
    } else {
      state.selectedShoppingSlotIds = [...new Set([...state.selectedShoppingSlotIds, slotId])];
    }
  }

  saveState();
  renderShoppingDayFilters();
  renderShoppingList();
}

function openRecipeForm(slotValue = "") {
  editingRecipeId = null;
  recipeForm.reset();
  document.querySelector("#recipe-rating").value = "0";
  document.querySelector("#recipe-notes").value = "";
  recipeSubmitButton.textContent = "Rezept speichern";
  document.querySelector("#recipe-form-panel h2").textContent = "Neues Rezept anlegen";
  recipeFormPanel.classList.remove("hidden");
  recipeSlotSelect.value = slotValue;
  recipeFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeRecipeForm() {
  recipeForm.reset();
  document.querySelector("#recipe-rating").value = "0";
  document.querySelector("#recipe-notes").value = "";
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
  detailRatingEditor.innerHTML = renderRatingStars(recipe.rating, {
    interactive: true,
    className: "rating-stars rating-stars-editor"
  });
  detailRatingEditor.dataset.recipeId = recipe.id;
  detailRatingEditor.dataset.currentRating = String(normaliseRecipeRating(recipe.rating));
  detailRatingSummary.textContent = getRecipeRatingLabel(recipe);
  detailNotesInput.value = recipe.notes || "";
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
  renderSlotOptions(detailSlotSelect, "Slot wählen");
  editRecipeButton.dataset.recipeId = recipe.id;
  deleteRecipeButton.dataset.recipeId = recipe.id;
  detailAddToWeekButton.dataset.recipeId = recipe.id;

  detailSection.classList.remove("hidden");
  detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function addRecipeToDate(recipeId, dateKey, mealKey) {
  const dayPlan = getDayPlan(dateKey);
  const existingRecipeId = dayPlan[mealKey].recipeId;

  if (existingRecipeId && existingRecipeId !== recipeId) {
    const existingRecipe = recipeMap().get(existingRecipeId);
    const date = new Date(`${dateKey}T00:00:00`);
    const shouldReplace = window.confirm(
      `${getWeekdayLabel(date)} ${mealSlots.find((slot) => slot.key === mealKey).label} ist bereits mit "${existingRecipe.title}" belegt. Möchtest du das Rezept ersetzen?`
    );

    if (!shouldReplace) {
      return false;
    }
  }

  dayPlan[mealKey] = { recipeId, factor: 1, skipShopping: false };
  saveState();
  renderAll();
  return true;
}

function addRecipeToWeek(recipeId, dayIndex, mealKey) {
  const weekDays = getSelectedWeekDays();
  const weekDay = weekDays[dayIndex];
  if (!weekDay) {
    return;
  }

  addRecipeToDate(recipeId, weekDay.dateKey, mealKey);
}

function removeRecipeFromWeek(dayIndex, mealKey) {
  const dayPlan = getDayPlanByIndex(dayIndex);
  dayPlan[mealKey] = { recipeId: null, factor: 1, skipShopping: false };
  saveState();
  renderAll();
}

function updateMealFactor(dayIndex, mealKey, factor) {
  const dayPlan = getDayPlanByIndex(dayIndex);
  const mealEntry = dayPlan[mealKey];
  dayPlan[mealKey] = {
    recipeId: mealEntry.recipeId,
    factor,
    skipShopping: mealEntry.skipShopping
  };
  saveState();
  renderAll();
}

function toggleMealShoppingStatus(dayIndex, mealKey) {
  const dayPlan = getDayPlanByIndex(dayIndex);
  const mealEntry = dayPlan[mealKey];
  dayPlan[mealKey] = {
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
    `Möchtest du "${recipe.title}" wirklich aus dem Kochbuch löschen?`
  );
  if (!shouldDelete) {
    return;
  }

  state.recipes = state.recipes.filter((entry) => entry.id !== recipeId);
  state.customRecipeIds = state.customRecipeIds.filter((id) => id !== recipeId);
  Object.values(state.dayPlans).forEach((assignment) => {
    assignment.breakfast =
      assignment.breakfast.recipeId === recipeId ? { recipeId: null, factor: 1, skipShopping: false } : assignment.breakfast;
    assignment.lunch =
      assignment.lunch.recipeId === recipeId ? { recipeId: null, factor: 1, skipShopping: false } : assignment.lunch;
    assignment.dinner =
      assignment.dinner.recipeId === recipeId ? { recipeId: null, factor: 1, skipShopping: false } : assignment.dinner;
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
  document.querySelector("#recipe-image").value = recipe.image || "";
  document.querySelector("#recipe-kcal").value = extractNumberString(recipe.nutrition.kcal);
  document.querySelector("#recipe-fat").value = extractNumberString(recipe.nutrition.fat);
  document.querySelector("#recipe-carbs").value = extractNumberString(recipe.nutrition.carbs);
  document.querySelector("#recipe-protein").value = extractNumberString(recipe.nutrition.protein);
  document.querySelector("#recipe-steps").value = recipe.steps.join("\n");
  document.querySelector("#recipe-ingredients").value = recipe.ingredients
    .map((ingredient) => `[${ingredient.category}] ${ingredient.item}`)
    .join("\n");
  document.querySelector("#recipe-rating").value = String(normaliseRecipeRating(recipe.rating));
  document.querySelector("#recipe-notes").value = recipe.notes || "";
  recipeMealprepCheckbox.checked = Boolean(recipe.mealprep);
}

function updateRecipeReview(recipeId, updates = {}) {
  let nextRecipe = null;
  state.recipes = state.recipes.map((recipe) => {
    if (recipe.id !== recipeId) {
      return recipe;
    }

    nextRecipe = normaliseRecipe({
      ...recipe,
      ...updates
    });
    return nextRecipe;
  });

  if (!nextRecipe) {
    return;
  }

  saveState();
  renderCookbook();
  renderPlannerModalRecipes();

  if (window.location.hash === `#rezept/${recipeId}`) {
    renderRecipeDetail(recipeId);
  }
}

function openRecipeEditor(recipeId) {
  const recipe = recipeMap().get(recipeId);
  if (!recipe) {
    return;
  }

  editingRecipeId = recipeId;
  recipeForm.reset();
  fillRecipeForm(recipe);
  recipeSubmitButton.textContent = "Änderungen speichern";
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
    aiStatus.textContent = "Bitte gib zuerst Vorgaben für das Rezept ein.";
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
    aiStatus.textContent = "Neues Rezept ist da. Wenn es dir gefällt, kannst du es direkt ins Kochbuch übernehmen.";
  } catch (error) {
    const isLikelyServerIssue =
      error instanceof TypeError ||
      String(error.message || "").includes("Failed to fetch") ||
      String(error.message || "").includes("Load failed");

    aiStatus.textContent = isLikelyServerIssue
      ? "Die KI ist gerade nicht erreichbar. Bitte starte die App über `npm start` und prüfe, ob deine `.env` einen `OPENAI_API_KEY` enthält."
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
    description: editingRecipeId ? recipeMap().get(editingRecipeId)?.description || "" : "",
    image: normaliseImageValue(formData.get("image")),
    ingredients,
    nutrition: {
      kcal: formatCalories(formData.get("kcal")),
      fat: formatGrams(formData.get("fat")),
      carbs: formatGrams(formData.get("carbs")),
      protein: formatGrams(formData.get("protein"))
    },
    rating: normaliseRecipeRating(formData.get("rating")),
    notes: normaliseRecipeNotes(formData.get("notes")),
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
    const separatorIndex = slotValue.lastIndexOf("::");
    const dateKey = slotValue.slice(0, separatorIndex);
    const mealKey = slotValue.slice(separatorIndex + 2);

    if (dateKey && mealKey) {
      addRecipeToDate(recipeId, dateKey, mealKey);
      closeRecipeForm();
      return;
    }
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
    ...normaliseRecipe(latestGeneratedRecipe),
    id: `custom-${Date.now()}-${slugify(latestGeneratedRecipe.title)}`,
    tags: [...new Set([...(latestGeneratedRecipe.tags || []), "KI-Rezept"])]
  };

  state.recipes.push(recipeToSave);
  state.customRecipeIds.push(recipeToSave.id);
  saveState();
  renderAll();
  window.location.hash = `#rezept/${recipeToSave.id}`;
  aiStatus.textContent = `"${recipeToSave.title}" wurde ins Kochbuch übernommen.`;
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

function closePrintPreview() {
  delete document.body.dataset.previewView;
}

function openPrintPreview(view) {
  if (view === "week") {
    renderPrintWeekView();
  }

  if (view === "shopping") {
    renderPrintShoppingView();
  }

  document.body.dataset.previewView = view;
  delete document.body.dataset.printView;
  const previewSection = document.querySelector(view === "week" ? "#print-week-view" : "#print-shopping-view");
  previewSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function confirmPrint(view) {
  document.body.dataset.printView = view;
  window.print();
}

function renderAll() {
  renderWeekSelect();
  renderShoppingWeekSelect();
  renderWeekRange();
  renderPrintWeekView();
  renderSlotOptions(recipeSlotSelect, "Nur ins Kochbuch speichern", getRecipePickerDays());
  renderSlotOptions(detailSlotSelect, "Slot wählen", getRecipePickerDays());
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
    copyFeedback.textContent = "Erfolgreich kopiert.";
    window.setTimeout(() => {
      copyFeedback.textContent = "";
    }, 2400);
  } catch (error) {
    copyFeedback.textContent = "Kopieren gerade nicht möglich.";
  }
});
printShoppingButton.addEventListener("click", () => {
  try {
    openPrintPreview("shopping");
  } catch (error) {
    copyFeedback.textContent = "Drucken gerade nicht möglich.";
  }
});
openProfileButton.addEventListener("click", openProfileModal);
closeProfileButton.addEventListener("click", closeProfileModal);
profileForm.addEventListener("submit", saveNutritionGoals);
resetProfileButton.addEventListener("click", resetNutritionGoals);

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

  const separatorIndex = slotValue.lastIndexOf("::");
  const dateKey = slotValue.slice(0, separatorIndex);
  const mealKey = slotValue.slice(separatorIndex + 2);

  if (dateKey && mealKey) {
    addRecipeToDate(recipeId, dateKey, mealKey);
  }
});
detailRatingEditor.addEventListener("click", (event) => {
  const ratingButton = event.target.closest("[data-rating-value]");
  const recipeId = detailRatingEditor.dataset.recipeId;
  if (!ratingButton || !recipeId) {
    return;
  }

  const nextRating = Number(ratingButton.dataset.ratingValue) || 0;
  const currentRating = Number(detailRatingEditor.dataset.currentRating) || 0;

  updateRecipeReview(recipeId, {
    rating: currentRating === nextRating ? 0 : nextRating
  });
});
detailNotesInput.addEventListener("change", () => {
  const recipeId = detailRatingEditor.dataset.recipeId;
  if (!recipeId) {
    return;
  }

  updateRecipeReview(recipeId, {
    notes: detailNotesInput.value
  });
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
profileModal.addEventListener("click", (event) => {
  if (event.target === profileModal) {
    closeProfileModal();
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
shoppingWeekSelect.addEventListener("change", (event) => {
  state.selectedShoppingWeekOffset = Number(event.target.value) || 0;
  ensureShoppingWeekPlan();
  saveState();
  renderShoppingDayFilters();
  renderShoppingList();
});
printWeekButton.addEventListener("click", () => {
  openPrintPreview("week");
});
printWeekConfirmButton.addEventListener("click", () => confirmPrint("week"));
printWeekCloseButton.addEventListener("click", closePrintPreview);
printShoppingConfirmButton.addEventListener("click", () => confirmPrint("shopping"));
printShoppingCloseButton.addEventListener("click", closePrintPreview);
window.addEventListener("afterprint", () => {
  delete document.body.dataset.printView;
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

  if (event.key === "Escape" && !profileModal.classList.contains("hidden")) {
    closeProfileModal();
  }
});

window.addEventListener("hashchange", syncRoute);

async function initApp() {
  await loadState();
  incrementVersionCounter();
  renderAll();
  setAiLoadingState(false);
}

initApp();
