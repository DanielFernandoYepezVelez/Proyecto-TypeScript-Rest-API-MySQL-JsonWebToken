import { Request, Response } from "express";

import connection from "../libs/mysql2";

class TaskController {
  public async getTasks(req: Request, res: Response): Promise<any> {
    try {
      const idUser = res.locals.userId;

      const cnn = await connection;
      const query = await cnn.query(
        "SELECT id, title, description FROM tasks WHERE id = ?",
        [idUser]
      );

      if (query[0]) {
        return res.json({
          ok: true,
          tasks: query[0],
        });
      }
    } catch (e) {
      return res.json({
        ok: false,
        message: "Task No Found!",
      });
    }
  }
}

export const taskController = new TaskController();
