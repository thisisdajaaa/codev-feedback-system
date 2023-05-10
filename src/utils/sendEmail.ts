import nodemailer, { type Transport, type TransportOptions } from "nodemailer";

import type { EmailOptions } from "@/types";

import logger from "./logger";

export const sendEmail = async (options: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as TransportOptions | Transport<unknown>);

  const message = {
    from: `${process.env.SMTP_FROM} < ${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  };

  await transporter.sendMail(message, function (err, info) {
    if (err) {
      logger(err);
    } else {
      logger(info);
    }
  });
};
