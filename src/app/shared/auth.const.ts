import * as dayjs from "dayjs";

export const AUTH = {
    ACCESS_TOKEN_EXPIRES_TIME_IN_UNIX: dayjs().add(15, "minutes").unix(),
    SECRET_KEY: "SECRETKEY"
}