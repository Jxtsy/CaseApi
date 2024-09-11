import { Router } from "express";
import { CaseController } from "./controllers";



export class CaseRoutes{
    static get routes(): Router {
        const router = Router();
        const controller = new CaseController();
        router.get("/", controller.getCases);
        router.get("/:id", controller.getCaseById);
        router.post("/", controller.createCase);
        router.put("/:id", controller.updateCase);
        router.delete("/:id", controller.updateCase);
       // router.get("/lastweek", controller.getRecordsFromLastWeek);
        return router;

    }
}