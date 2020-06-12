import { Request, Response } from "express";

// import connection from "../libs/mysql2";

class TaskController {
  public async getTasks(req: Request, res: Response): Promise<Response<JSON>> {
    // const cnn = await connection;
    const query = [
      {
        id: 1,
        title: "Primer Tarea",
        description: "This Is First Title",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    return res.json({
      ok: true,
      tasks: query,
    });
  }
}

export const taskController = new TaskController();
