import { Router } from "express";

import { userController } from "../controllers/user.controller";

class UserRoutes {
  constructor(public router: Router) {
    this.router.get("/users", userController.users);
    this.router.get("/user/:id", userController.user);
    this.router.post("/createUser", userController.createUser);
    this.router.post("/verifyUser", userController.verifyUser);
    this.router.put("/user/:id", userController.updateUser);
    this.router.delete("/user/:id", userController.deleteUser);
  }
}

const userRoutes = new UserRoutes(Router());
export default userRoutes.router;
