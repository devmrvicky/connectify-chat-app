import mongoose, { Schema } from "mongoose";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

const otpSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: function () {
      return !this.phone;
    },
    unique: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: function () {
      return !this.email;
    },
    unique: true,
  },
  otp: {
    type: String,
    required: true,
    minLength: 6,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// check if email or phone is provided or not
otpSchema.pre("save", function (next) {
  if (!this.email && !this.phone) {
    next(new Error("Either email or phone number must be provided."));
  } else {
    next();
  }
});

// send email before save otp document
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew && this.email) {
    await sendVerificationEmail(this.email, this.otp);
  } else if (this.isNew && this.phone) {
    // send verification otp on phone
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);

export { OTP };
