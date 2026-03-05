import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // Affiche la date, la méthode (GET/POST) et l'URL demandée
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    next(); 
};