import { Request, Response, NextFunction } from 'express';
import { fieldSize, HttpBadRequestCode } from '../constants';
import { UserService } from '../services';

export async function checkRegistration(request: Request, response: Response, next: NextFunction) {
    const { name, password } = request.body;
    const service = new UserService();
    const users = await service.find();
    const userName = users.find((user) => user.name === name);

    if (userName) {
        return response.status(HttpBadRequestCode).json({
            message: 'Usuario já cadastrado'
        });
    }

    if (password.length <= 3) {
        return response.status(HttpBadRequestCode).json({
            message: fieldSize('Senha', 3)
        });
    }

    if (name.length < 3) {
        return response.status(HttpBadRequestCode).json({
            message: fieldSize('Nome', 2)
        });
    }

    next();
}
