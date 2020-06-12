import Joi from "@hapi/joi";

class Validate {
  public createUser() {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().alphanum().trim().required(),
    });

    return schema;
  }

  public loginUser() {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().alphanum().required(),
    });

    return schema;
  }
}

export const validate = new Validate();
