import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { IPayload } from "../Interfaces/IPayload";

class VerifyToken {
  public authorizationUser(req: Request, res: Response, next: NextFunction) {
    try {
      const head = req.headers.authorization || "";

      if (!head || head === "")
        res.status(401).json({ ok: false, message: "User Unauthorization" });

      /* Token De Tipo Bearer, Que Es Un Estandar, Lo Separo Con El Metodo Split[0, 1] */
      const token = head.split(" ")[1];

      /* Valor Del Token */
      const payload = jwt.verify(
        token,
        process.env.SECRET_KEY || "token_para_desarrollo"
      ) as IPayload;

      /* Para Utilizar Su Valor En Cualquier Ruta Que Implemente Este Middleware */
      res.locals.userId = payload.id;
      // req.userId = payload.id; /* Aqui Tengo Una Duda Por Que No Me Permite Expander El Objeto Request */
      return next();
    } catch (e) {
      return res.status(401).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const verifyToken = new VerifyToken();
