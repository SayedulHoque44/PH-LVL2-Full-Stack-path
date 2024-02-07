import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { UserStatus } from "./user.constant";
import { TUser, UserStaticsModel } from "./user.interface";

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin", "superAdmin"],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// encrypt pass and make it empty in response
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// schema.pre(name,fn)
UserSchema.post("save", function (updatedDoc, next) {
  updatedDoc.password = "";
  next();
});

// user schema statics
//
UserSchema.statics.isUserExistsByCustomId = async function (id) {
  return await UserModel.findOne({ id }).select("+password");
};
//
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
//
UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// user model
export const UserModel = model<TUser, UserStaticsModel>("User", UserSchema);
