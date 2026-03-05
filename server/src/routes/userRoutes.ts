import { Router } from 'express';
import * as userController from "../controllers/userController";

const router = Router();

// On lie chaque type de requête à sa fonction dans le contrôleur
/**
* @swagger
* /api/users:
*   get:
*       summary: Récupère la liste des utilisateurs
*       tags: [Users]
*       responses:
*           200:
*               description: Succès
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */

router.delete('/:id', userController.deleteUser);

export default router;