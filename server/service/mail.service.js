import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

let transporter;

if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.sendgrid.net",
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
} else {
  // all emails are caught by ethereal.email
  let testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

const mailSender = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: "devmrvicky@gmail.com",
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent: ", info.messageId);
    if (process.env.NODE_ENV !== "production") {
      const mailPrevUrl = nodemailer.getTestMessageUrl(info);
      console.log("Preview URL: %s", mailPrevUrl);
      return { ...info, mailPrevUrl };
    }

    return info;
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw new Error("Failed to send email");
  }
};

export { mailSender };
