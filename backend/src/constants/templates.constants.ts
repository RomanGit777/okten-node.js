import { EmailEnum } from "../enums/email.enum.js";

export type IEmailData = {
    subject: string;
    template: string;
};

export type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData;
};

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.ACTIVATE]: {
        subject: "Activate Account",
        template: "activate",
    },
    [EmailEnum.RECOVERY]: {
        subject: "Recovery Password",
        template: "recovery",
    },
    [EmailEnum.SPAM]: {
        subject: "Spam",
        template: "spam",
    },
};
