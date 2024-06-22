import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: function() {
        return !this.phone_number;
      }
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: function() {
        return !this.email;
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (!this.email && !this.phone) {
    next(new Error('Either email or phone number must be provided.'));
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

export { User };
