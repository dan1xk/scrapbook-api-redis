import { Router } from "express";
import UserController from "../controllers/user";
import { authMiddleware } from "../middlewares";
import { checkRegistration } from "../middlewares/createUser";
import loginMiddleware from "../middlewares/login";

export default class UserRoutes {
    init() {
        const routes = Router();
        const controller = new UserController();

        routes.post('/auth', loginMiddleware ,controller.authenticate);
        routes.post('/user', checkRegistration, controller.store);
        routes.get('/user', authMiddleware, controller.index);

        return routes;
    }
}