import { Response, Request } from 'express';
import { HttpError } from '../errors';
import { ErrandService } from '../services';

import {
    createMessage,
    defaultErrorMessage,
    httpCreatedCode,
    HttpInternalErrorCode,
    httpSucessCode,
} from '../constants';
import { CacheRepository } from '../database/repositories';

export default class ErrandController {
    async index(request: Request, response: Response) {
        //aplicar cache

        const { id } = request.params;
        const service = new ErrandService();
        const cacheRepository = new CacheRepository();
        const errands = await service.find(id);

        return response.json(errands).status(httpSucessCode);
    }

    async store(request: Request, response: Response) {
        const { errands, userId } = request.body;
        const service = new ErrandService();
        const cacheRepository = new CacheRepository();

        try {
            const errand = await service.create({
                errands,
                userId,
            });

            await cacheRepository.delete(`errand:${userId}`);

            return response
                .status(httpCreatedCode)
                .json(createMessage('Criado'));
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { errands, userId } = request.body;
        const service = new ErrandService();
        const cacheRepository = new CacheRepository();

        try {
            await service.update({
                id: parseInt(id),
                errands,
                userId,
            });

            await cacheRepository.delete(`errand:${userId}`);

            return response
                .status(httpCreatedCode)
                .json(createMessage('Editado'));
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async delete(request: Request, response: Response) {
        const { id, userId } = request.params;

        const service = new ErrandService();
        const cacheRepository = new CacheRepository();

        try {
            await service.delete(parseInt(id));

            await cacheRepository.delete(`errand:${parseInt(userId)}`);

            return response
                .status(httpSucessCode)
                .json(createMessage('Deletado'));
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}
