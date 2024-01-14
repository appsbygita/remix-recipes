import Mailjet, { type SendEmailV3_1 } from "node-mailjet";

if (typeof process.env.MJ_APIKEY_PUBLIC !== "string") {
  throw new Error("Missing env: MJ_APIKEY_PUBLIC");
}
if (typeof process.env.MJ_APIKEY_PRIVATE !== "string") {
  throw new Error("Missing env: MJ_APIKEY_PRIVATE");
}

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

type Message = {
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  };
  subject: string;
  html: string;
};

export async function sendEmail(message: Message) {
  //   if (typeof process.env.MJ_APIKEY_PUBLIC !== "string") {
  //     throw new Error("Missing env: MJ_APIKEY_PUBLIC");
  //   }
  //   if (typeof process.env.MJ_APIKEY_PRIVATE !== "string") {
  //     throw new Error("Missing env: MJ_APIKEY_PRIVATE");
  //   }
  //   const client = Mailjet.apiConnect(
  //     process.env.MJ_APIKEY_PUBLIC,
  //     process.env.MJ_APIKEY_PRIVATE
  //   );
  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: message.from.email,
          Name: message.from.name,
        },
        To: [
          {
            Email: message.to.email,
            Name: message.to.name,
          },
        ],
        Subject: message.subject,
        HTMLPart: message.html,
      },
    ],
  };
  return await mailjet.post("send", { version: "v3.1" }).request(data);
}
