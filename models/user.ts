import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
});

export const User = mongoose.model("user", userSchema);
