export const AUTH = {
    SECRET_KEY: "SECRETKEY",
    JWT_VALID_SECONDS: 60 * 60 * 24 * 7
}

export const REDIRECT_CLIENT = {
    RECOVER_PASSWORD_URL: `${process.env.CLIENT_URL}/session/forget-password`
}