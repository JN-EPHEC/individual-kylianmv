import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("❌ Une erreur est survenue :", err.message); // Affiche l'erreur en console
    
    // Récupère le statut dynamique de l'erreur ou met 500 par défaut
    const status = err.status || 500; 
    
    // Règle la réponse en JSON avec le statut et le message
    res.status(status).json({ error: err.message || "Erreur interne du serveur" });
};