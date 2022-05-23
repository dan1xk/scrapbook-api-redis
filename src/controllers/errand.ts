import { Response, Request } from 'express';
import { HttpError } from '../errors';
import { ErrandService } from '../services';

import {
    createMessage,
    defaultErrorMessage,
    httpCreatedCode,
    HttpInternalErrorCode,
    HttpNoContent,
    httpSucessCode
} from '../constants';
import { CacheRepository } from '../database/repositories';

export default class ErrandController {
    async index(request: Request, response: Response) {
        const { id } = request.params;
        const service = new ErrandService();
        const cacheRepository = new CacheRepository()

        try {
            const cache = await cacheRepository.find(`errand:${id}`)

            if (cache) {
                return response.status(201).json(cache)             
            }

            const errands = (await service.find()).filter(user => user.userId === parseInt(id));
            const json = errands.map(user => {
                return {
                    errands: user.errands,
                    userId: user.userId,
                    id: user.id,
                }
            });

            await cacheRepository.save(`errand:${id}`, json);

            return response.status(httpSucessCode).json(json);
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async store(request: Request, response: Response) {
        const { errands, userId } = request.body;
        const service = new ErrandService();
        const cacheRepository = new CacheRepository();

        try {
            await service.create({
                errands,
                userId
            });

            await cacheRepository.delete(`errand:${userId}`);

            return response.status(httpCreatedCode).json(createMessage('Criado'));
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
            const errand = await service.update({
                id: parseInt(id),
                errands,
                userId
            });

            await cacheRepository.delete(`errand:${userId}`)
            
            return response.status(httpCreatedCode).json(createMessage('Editado'));
        } catch (error) {
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const { userId } = request.body;
        const cacheRepository = new CacheRepository();
        
        const service = new ErrandService();

        try {    
            await service.delete(parseInt(id));

            await cacheRepository.delete(`errand:${userId}`);

            return response.json(createMessage('Deletado'));

        } catch (error) {
            
            throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
        }
    }
}