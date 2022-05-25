import { Request, Response } from 'express';
import { createMessage, httpCreatedCode, httpSucessCode } from '../constants';

export default class LoginController {
    async login(request: Request, response: Response) {
        return response.status(httpSucessCode).json(createMessage('Logado'));
    }

    async authLogin(request: Request, response: Response) {
        return response.status(httpCreatedCode).json(createMessage('Logado'));
    }
}
