import { Router } from "express";

import { userController } from "../controllers/user.controller";

class UserRoutes {
  constructor(public router: Router) {
    this.router.post("/createUser", userController.createUser);
    this.router.post("/verifyUser", userController.verifyUser);
  }
}

const userRoutes = new UserRoutes(Router());
export default userRoutes.router;
