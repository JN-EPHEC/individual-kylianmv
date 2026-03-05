import { Sequelize } from "sequelize";

// On initialise la connexion
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Le fichier sera créé à la racine du projet
  logging: false, // Pour éviter de polluer la console avec du SQL brut
});

export default sequelize;