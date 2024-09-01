import { User } from "../model/user.model.js";
import { mailSender } from "../service/mail.service.js";
import { getEmailHTMLStr } from "./getEmailHTMLStr.js";

// Define a function to send emails
async function sendVerificationEmail(email, otp, res) {
  try {
    const user = await User.findOne({ email });

    const htmlBody = getEmailHTMLStr(otp);
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      htmlBody
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

export { sendVerificationEmail };
