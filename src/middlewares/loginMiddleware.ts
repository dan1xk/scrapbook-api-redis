import { Request, Response, NextFunction } from 'express';
import { HttpBadRequestCode } from '../constants';
import { UserService } from '../services';

export async function checkLogin(request: Request, response: Response, next: NextFunction) {
    const { name, password } = request.body;
    const service = new UserService();

    const findUser = await service.find();
    const nameUser = findUser.find((user) => name === user.name);

    if (nameUser?.password !== password) {
        return response.status(HttpBadRequestCode).json({
            message: 'Senha ou usuario Incorreto.'
        });
    }

    next();
}

export async function checkAuthLogin(request: Request,response: Response,next: NextFunction) {
    const { name } = request.body;
    const service = new UserService();
    const user = await service.find();
    const auth = user.find((user) => user.name === name);

    if (!auth) {
        return response.status(HttpBadRequestCode).json({
            message: 'Verifique se a senha ou usuario está correto.'
        });
    }

    next();
}
