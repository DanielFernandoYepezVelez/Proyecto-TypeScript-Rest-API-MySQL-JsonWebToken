import slug from "slug";
import shortid from "shortid";
import { Request, Response } from "express";

import connect from "../libs/mysql2";
import { validate } from "../libs/joi";
import { userPassword } from "../libs/bcrypt";
import { authenticate } from "../libs/jsonwebtoken";

import { IUserRegister, IUserSession } from "../Interfaces/IUser";

import { UserDB } from "../helpers/UserDB";
import { match } from "assert";

class UserController {
  public async users(req: Request, res: Response): Promise<Response<JSON>> {
    return res.json("USERS Funciona Correctamente");
  }

  public async user(req: Request, res: Response): Promise<Response<JSON>> {
    return res.json("USER Funciona Correctamente");
  }

  /* Aqui Me Registro */
  public async createUser(req: Request, res: Response): Promise<any> {
    try {
      const newUser: IUserRegister = req.body;
      const { name, email, password }: IUserRegister = req.body;
      const url = `${shortid.generate()}-${slug(name).toLowerCase()}`;

      /* Validando Con Joi */
      const values = await validate
        .createUser()
        .validateAsync({ name, email, password });

      if (values) {
        newUser.password = await userPassword.encryptPassword(newUser.password);
        newUser.url_id = url;

        const connection = await connect;
        const query = await connection.query("INSERT INTO users SET ?", [
          newUser,
        ]);

        if (query) {
          return res.json({
            ok: true,
            message: "User Saved!",
          });
        }
      }
    } catch (e) {
      return res.status(400).json({
        ok: false,
        messsage: "User Not Saved!",
        error: e,
      });
    }
  }

  /* Aqui Inicio Sesión */
  public async verifyUser(req: Request, res: Response): Promise<any> {
    try {
      const confirmUser: IUserSession = req.body;
      const { email, password }: IUserSession = req.body;

      /* Válido Con Joi */
      const values = await validate
        .loginUser()
        .validateAsync({ email, password });

      if (values) {
        const connection = await connect;
        const query = await connection.query(
          "SELECT password FROM users WHERE email = ?",
          [confirmUser.email]
        );

        if (query) {
          /* Obtengo El Password De La Base De Datos(Forma No Optima) */
          let userDB = new UserDB(query[0]);
          const passwordDB = userDB.init(3, 14);

          /* Válido Las Contraseñas */
          const matchPassword = await userPassword.validatePassword(
            confirmUser.password,
            passwordDB
          );

          if (matchPassword) {
            /* Crear Token */
            const connection = await connect;
            const query = await connection.query(
              "SELECT id FROM users WHERE email = ?",
              [confirmUser.email]
            );

            /* Obtengo El Id De La Base De Datos Para Almacenar En El Token*/
            let userDB = new UserDB(query[0]);
            const idUser = userDB.init(2, 7);

            /* Aqui Vamos Aplicar EL Token */
            const token: string = authenticate.tokenUser(idUser);

            return res.json({
              ok: true,
              message: "User Verified!",
              token,
            });
          } else {
            return res.json({
              ok: true,
              message: "Data No Exist!",
            });
          }
        }
      }
    } catch (e) {
      return res.status(400).json({
        ok: false,
        messsage: "User Not Authorization!",
        error: e,
      });
    }
  }

  public async updateUser(
    req: Request,
    res: Response
  ): Promise<Response<JSON>> {
    return res.json("UPDATE USER Funciona Correctamente");
  }

  public async deleteUser(
    req: Request,
    res: Response
  ): Promise<Response<JSON>> {
    return res.json("DELETE USER Funciona Correctamente");
  }
}

export const userController = new UserController();
