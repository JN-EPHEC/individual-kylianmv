import express, { Request, Response } from 'express';
import sequelize from './config/database'; 
import userRoutes from './routes/userRoutes'; 
import User from './models/User';
import { requestLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
const port = 3000;

// Middleware pour lire le JSON
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(requestLogger);

// Permet de servir les fichiers statiques (HTML, CSS, JS) du dossier "public"
app.use(express.static('public'));

// Routes du TP1
app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur mon serveur API');
});

app.get('/api/data', (req: Request, res: Response) => {
    const etudiants = [
        { id: 1, nom: "Dupont", prenom: "Jean" },
        { id: 2, nom: "Martin", prenom: "Sophie" },
        { id: 3, nom: "Doe", prenom: "John" },
    ];
    res.json(etudiants);
});

app.get('/api/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    });
});

// Routes modulaires
app.use('/api/users', userRoutes);

app.use(errorHandler);

// --- Point 2.4 : Synchronisation et Démarrage ---
// On synchronise la DB avant de lancer le serveur
sequelize.sync({ force: false }) 
  .then(() => {
    console.log("✅ Base de données synchronisée !");
    
    // Le serveur ne démarre QUE si la DB est prête
    app.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("❌ Erreur lors du démarrage :", error);
  });