import jwt from "jsonwebtoken";

class Authenticate {
  public tokenUser(id: string): string {
    const token: string = jwt.sign(
      { id },
      process.env.SECRET_KEY || "token_para_desarrollo"
    );

    return token;
  }
}

export const authenticate = new Authenticate();
