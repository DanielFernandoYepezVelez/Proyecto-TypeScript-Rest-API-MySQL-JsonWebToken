import "./libs/mysql2";

import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/user.routes";
import taskRouter from "./routes/task.routes";

class App {
  constructor(private app: Application) {}

  public middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public routes() {
    this.app.use("/api", userRouter);
    this.app.use("/api", taskRouter);
  }

  public async server(): Promise<void> {
    try {
      const port = await this.app.listen(process.env.PORT);

      if (port) console.log(`Server On Port ${process.env.PORT}`);
      else console.log(`Port No Exist!`);
    } catch {
      console.log(`You Can't Connect The Server`);
    }
  }
}

export const app = new App(express());
