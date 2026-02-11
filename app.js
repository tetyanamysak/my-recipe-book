import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "recipes.json");
const BACKUP_FILE = path.join(__dirname, "recipes_backup.json");

function createBackup() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      fs.copyFileSync(DATA_FILE, BACKUP_FILE);
      console.log(`Backup ${BACKUP_FILE} created successfully.`);
    } else {
      console.log(`No ${DATA_FILE} found to create a backup.`);
    }
  } catch (err) {
    console.error(`failed to create a backup ${BACKUP_FILE}:`, err);
  }
}

function loadRecipes() {
  const initData = [];

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initData));
    return initData;
  }
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return data ? JSON.parse(data) : [];
}

function saveRecipes(recipes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2));
}

async function main() {
  const app = express();
  const PORT = 3033;

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.render("index.ejs", {
      recipes: loadRecipes(),
      title: "My Recipe Book",
    });
  });

  app.get("/recipe/:id", (req, res) => {
    const id = req.params.id;
    const recipe = loadRecipes().find((r) => r.id === id);

    if (recipe) {
      res.render("recipe.ejs", { recipe: recipe });
    } else {
      res.status(404).render("error/404.ejs", {
        statusCode: 404,
        message: "Recipe not found",
        title: "404 - Not Found",
      });
    }
  });

  app.post("/add-recipe", (req, res) => {
    const { recipeName, ingredients, instructions } = req.body;
    const newRecipe = {
      id: crypto.randomUUID(),
      name: recipeName,
      ingredients,
      instructions,
    };

    const myRecipes = loadRecipes();
    myRecipes.push(newRecipe);
    saveRecipes(myRecipes);
    res.redirect("/");
  });

  app.post("/delete-recipe/:id", (req, res) => {
    const idToDelete = req.params.id;
    const myRecipes = loadRecipes().filter(
      (r) => String(r.id) !== String(idToDelete)
    );
    saveRecipes(myRecipes);
    res.redirect("/");
  });

  app.post("/clear-all", (req, res) => {
    saveRecipes([]);
    res.redirect("/");
  });

  app.use((_req, res) => {
    res.status(404).render("error/404.ejs", {
      title: "404 - Not Found",
      message: "Page Missing",
      statusCode: 404,
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).render("error/404.ejs", {
      statusCode: statusCode,
      title: "404 - Not Found",
      status: "error",
      message: message,
    });
  });

  createBackup();

  app.listen(PORT, () => {
    console.log(`✅ Recipe Book is running at http://localhost:${PORT}`);
  });
}

main();
