import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6, select: false },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

//hashing password before save
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.method("matchPassword", async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(
    enteredPassword,
    this.password
  );
  return isPasswordCorrect;
});

const User = mongoose.model("User", userSchema);

export default User;
