import { Request, Response, NextFunction } from 'express';
import { field, HttpBadRequestCode } from '../constants';

export function verifyField(request: Request, response: Response, next: NextFunction) {
    const { name, password } = request.body

    if (!name) {
        return response.status(HttpBadRequestCode).json(field('Nome'));
    }

    if (!password) {
        return response.status(HttpBadRequestCode).json(field('Senha'));
    }

    next()
}