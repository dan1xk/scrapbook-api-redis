import { Router } from "express";
import UserController from "../controllers/user";
import { checkRegistration, authMiddleware} from '../middlewares';

export default class UserRoutes {
    init() {
        const routes = Router();
        const controller = new UserController();

        routes.post('/auth', controller.authenticate);
        routes.post('/user',  checkRegistration, controller.store);
        routes.get('/user', authMiddleware, controller.index);

        
        return routes;
    }
}