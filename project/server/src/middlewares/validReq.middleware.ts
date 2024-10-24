import { NextFunction, Request, Response } from "express";

export const validReq = (req: Request, res: Response, next: NextFunction) => {
    const key=req.query.key;
    
};

