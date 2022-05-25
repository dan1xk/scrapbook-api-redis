import { Request, Response, NextFunction } from 'express';
import { field, HttpBadRequestCode } from '../constants';

export function verifyCreateErrand(request: Request, response: Response, next: NextFunction) {
    const { errands } = request.body;

    if (!errands) {
        return response.status(HttpBadRequestCode).json({
            message: 'Preencha o recado'
        });
    }

    next();
}
