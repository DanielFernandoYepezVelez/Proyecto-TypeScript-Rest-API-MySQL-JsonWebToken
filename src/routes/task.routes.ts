import { Router } from "express";

import { verifyToken } from "../middlewares/VerifyToken";
import { taskController } from "../controllers/task.controller";

class TaskRoutes {
  constructor(public router: Router) {
    this.router.get(
      "/tasks",
      [verifyToken.authorizationUser],
      taskController.getTasks
    );
  }
}

const taskRoutes = new TaskRoutes(Router());
export default taskRoutes.router;
