import { Router, Request, Response } from 'express';

// On crée un "mini-serveur" (Routeur) juste pour cette partie
const router = Router();

// Nos données (simulées pour l'instant)
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

// Route pour récupérer les utilisateurs
// On met juste '/' car on va dire dans server.ts que ce fichier gère tout ce qui est "/api/users"
router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

// On exporte le routeur pour que server.ts puisse l'utiliser
export default router;