import { Request, Response } from 'express';
import { UserService } from '../services';
import { HttpError } from '../errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import {
    createMessage,
    defaultErrorMessage,
    field,
    HttpBadRequestCode,
    httpCreatedCode,
    HttpInternalErrorCode,
} from '../constants';

export default class UserController {
    index(request: Request, response: Response) {
        try {
            return response.send({ userID: request.userId });
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async store(request: Request, response: Response) {
        const { name, password } = request.body;
        const service = new UserService();

        try {
            await service.create({
                name: name,
                password: password,
            });

            return response
                .status(httpCreatedCode)
                .json(createMessage('Criado'));
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async authenticate(request: Request, response: Response) {
        const { name } = request.body;
        const service = new UserService();
        const user = await service.findOne({ where: { name } });

        try {
            const token = jwt.sign(
                { id: user?.id },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXPIRES }
            );

            return response.json({
                message: 'Logado com sucesso',
                token
            });
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}
