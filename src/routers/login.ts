import { Router } from 'express';
import LoginController from '../controllers/login';
import { verifyField, checkLogin, checkAuthLogin } from '../middlewares';

export default class LoginRoutes {
    init() {
        const routes = Router();
        const controller = new LoginController();

        routes.post('/login', [verifyField, checkLogin], controller.login);
        routes.post('/loginAuth', [checkAuthLogin], controller.authLogin);

        return routes;
    }
}
