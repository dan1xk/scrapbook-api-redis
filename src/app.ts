import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Database from './database/connections/Database';
import UserRoutes from './routers/user';
import ErrandRoutes from './routers/errand';
import LoginRoutes from './routers/login';
import { HttpError } from './errors/httpError';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    async init() {        
        this.config();
        this.routers();
        this.errors();
        await this.database();
    }

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(cors());
    }

    start(port: number) {
        this.#express.listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}...`); 
        });
    }

    private errors() {
        this.#express.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
            return response.json({
                message: error.message
            });
        });
    }

    private routers() {
        const userRouter = new UserRoutes().init();
        this.#express.use(userRouter);

        const errandRouter = new ErrandRoutes().init();
        this.#express.use(errandRouter);

        const LoginRouter = new LoginRoutes().init();
        this.#express.use(LoginRouter);
    }

    private async database() {
        await Database.getInstance();
    }
};