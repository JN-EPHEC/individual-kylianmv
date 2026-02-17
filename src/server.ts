import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

// Création de l'application Express
const app = express();
const port = 3000;

// Définition de la route GET sur la racine "/"
app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur mon serveur API');
});

// "Pour toutes les routes commençant par /api/users, va voir dans userRoutes"
app.use('/api/users', userRoutes);

// On définit la forme d'un étudiant (Typage)
interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}

// On crée les données
const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

// La route API
app.get('/api/data', (req: Request, res: Response) => {
    // .json() convertit automatiquement ton tableau en format JSON
    res.json(etudiants);
});

// Le ":name" indique que c'est une variable
app.get('/api/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name; // On récupère la variable
    
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString() // La date actuelle formatée
    });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});