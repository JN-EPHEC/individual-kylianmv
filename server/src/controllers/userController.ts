import type { Request, Response } from "express";
import User from "../models/User";

// 1. Récupérer tous les utilisateurs (GET)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// 2. Créer un utilisateur (POST)
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la création" });
  }
};

// 3. Supprimer un utilisateur (DELETE)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};