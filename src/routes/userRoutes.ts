import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// --- 1. RÉCUPÉRER TOUS LES UTILISATEURS (GET) ---
router.get('/', async (req: Request, res: Response) => {
  try {
    // findAll() va chercher toutes les lignes de la table users
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// --- 2. CRÉER UN UTILISATEUR (POST) ---
router.post('/', async (req: Request, res: Response) => {
  try {
    // req.body contient les données envoyées (ex: { nom: "Snow", prenom: "Jon" })
    // create() insère une nouvelle ligne dans la DB
    const newUser = await User.create(req.body);
    res.status(201).json(newUser); // 201 = Créé avec succès
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la création" });
  }
});

// --- 3. SUPPRIMER UN UTILISATEUR (DELETE) ---
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // destroy() supprime les lignes qui correspondent à la condition 'where'
    await User.destroy({ where: { id: id } });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;