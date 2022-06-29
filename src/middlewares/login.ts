import { UserService } from '../services';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import { field, HttpBadRequestCode } from '../constants';
import { NextFunction } from 'express';

export default async function loginMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { name, password } = request.body;
    const service = new UserService();
    const user = await service.findOne({ where: { name } });
    
    if (!name || !password) {
        return response.status(HttpBadRequestCode).json({
            message: 'Preencha todos os campos'
        })
    }
    
    if (!user) {
        return response.status(HttpBadRequestCode).json(field('Usuário'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return response
            .status(HttpBadRequestCode)
            .json(field('Senha'));
    }


    next();
}
