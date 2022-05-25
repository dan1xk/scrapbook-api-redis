import { Request, Response } from 'express';
import { UserService } from '../services';
import { HttpError } from '../errors';

import {
    createMessage,
    defaultErrorMessage,
    httpCreatedCode,
    HttpInternalErrorCode
} from '../constants';

export default class UserController {
    async index(request: Request, response: Response) {
        const service = new UserService();

        try {
            return response.json(await service.find());
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
                password: password
            });

            return response
                .status(httpCreatedCode)
                .json(createMessage('Criado'));
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}
