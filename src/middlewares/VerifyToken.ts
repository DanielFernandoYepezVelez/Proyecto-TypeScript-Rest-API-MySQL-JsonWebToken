import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { IPayload } from "../Interfaces/IPayload";

class VerifyToken {
  public authorizationUser(req: Request, res: Response, next: NextFunction) {
    try {
      const head = req.headers.authorization || "";

      if (!head || head === "")
        res.status(401).json({ ok: false, message: "User Unauthorization" });

      const token = head.split(" ")[1];

      const payload = jwt.verify(
        token,
        process.env.SECRET_KEY || "token_para_desarrollo"
      ) as IPayload;

      // req.userId = payload.id; /* Aqui La Duda */
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
