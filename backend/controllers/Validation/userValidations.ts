import joi from "joi";

export const userSignupSchema = joi
    .object({
        username: joi.string().alphanum().required().lowercase(),
        fname: joi.string().alphanum().required(),
        lname: joi.string().alphanum().required(),
        email: joi
            .string()
            .email({ tlds: { allow: ["com", "in"] } })
            .required(),
        password: joi
            .string()
            .pattern(
                new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$")
            )
            .required(),
        conpassword: joi
            .string()
            .pattern(
                new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$")
            )
            .required(),
        phonenumber: joi
            .string()
            .min(10)
            .max(13)
            .required()
    })


export const userSignInSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: ["com", "in"] } })
        .required(),
    password: joi
        .string()
        .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$")
        )
        .required(),
});

export const userUpdateSchema = joi
    .object({
        username: joi.string().alphanum().required().lowercase(),
        fname: joi.string().alphanum().required(),
        lname: joi.string().alphanum().required(),
        email: joi
            .string()
            .email({ tlds: { allow: ["com", "in"] } })
            .required(),
        phonenumber: joi
            .string()
            .min(10)
            .max(13)
            .required()
    })

export const passwordChangeSchema = joi
    .object({
        oldPassword: joi
            .string()
            .pattern(
                new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$")
            )
            .required(),
        newPassword: joi
            .string()
            .pattern(
                new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$")
            )
            .required(),
        confNewPassword: joi
            .string()
            .pattern(
                new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$")
            )
            .required()
    })