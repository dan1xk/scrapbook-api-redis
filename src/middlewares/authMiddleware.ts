import { Request, Response, NextFunction } from 'express';
import { HttpUnauthorized } from '../constants';
import { TokenPayload } from '../dto/token';
import jwt from 'jsonwebtoken';

export function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response
            .sendStatus(HttpUnauthorized)
            .json({ message: 'Não autorizado(a)' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id } = data as TokenPayload;

        request.userId = id;

        next();
    } catch {
        return response.sendStatus(HttpUnauthorized);
    }
}
