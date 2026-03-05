import { Router } from 'express';
import * as userController from "../controllers/userController";

const router = Router();

// On lie chaque type de requête à sa fonction dans le contrôleur
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router;