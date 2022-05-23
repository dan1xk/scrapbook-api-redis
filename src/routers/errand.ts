import { Router } from "express";
import ErrandController from "../controllers/errand";
import { verifyCreateErrand } from "../middlewares";

export default class ErrandRoutes {
    init() {
        const routes = Router();
        const controller = new ErrandController();

        routes.get('/errand/:id', controller.index);
        routes.post('/errand', [verifyCreateErrand], controller.store);
        routes.put('/errand/:id', controller.update);
        routes.delete('/errand/:id', controller.delete);

        return routes;
    }
}