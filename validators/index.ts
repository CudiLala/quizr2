import { SignUpError } from "Errors";
import User from "database/models/User";
import bcrypt from "bcrypt";
import connectDB from "database";
connectDB();

export async function validateSignUpForPost(body: any) {
  const { username, email, password, confirmPassword } = body;

  if (username) await validateUsername(username);
  else throw new SignUpError("username", "Please a username is required");

  if (email) await validateEmail(email);
  else throw new SignUpError("email", "Please an email is required");

  if (password) {
    validatePassword(password, confirmPassword);
    body.password = await bcrypt.hash(password, 10);
    delete body.confirmPassword;
  } else throw new SignUpError("password", "Please, a password is required");
}

// export async function validateSignUpDraftForPost(body: any, userId: string) {
//   const { username, email, password, confirmPassword, profilePicture } = body;
//   if (username) await validateUsername(username, userId);
//   else throw new SignUpError("username", "Please a username is required");

//   if (email) await validateEmail(email, userId);
//   else throw new SignUpError("email", "Please an email is required");

//   if (password) {
//     validatePassword(password, confirmPassword);
//     body.password = await bcrypt.hash(password, 10);
//     delete body.confirmPassword;
//   }

//   if (profilePicture) validateProfilePicture(profilePicture);
// }

// export async function validateSignUpDraftForUpdate(body: any, userId: string) {
//   const { username, email, password, confirmPassword, profilePicture } = body;
//   if (username) await validateUsername(username, userId);
//   if (email) await validateEmail(email, userId);
//   if (password) {
//     validatePassword(password, confirmPassword);
//     body.password = await bcrypt.hash(password, 10);
//     delete body.confirmPassword;
//   }
//   if (profilePicture) validateProfilePicture(profilePicture);
// }

export async function validateUsername(username: string) {
  if (username.length < 1)
    throw new SignUpError(
      "username",
      "Sorry a username must contain at least one character"
    );
  if (username.length > 32)
    throw new SignUpError(
      "username",
      "Sorry, your username cannot be more than 32 characters"
    );
  if (!isAValidUserNameType(username))
    throw new SignUpError(
      "username",
      "Sorry, a username cannot contain special symbols except periods, underscore, !, @, #, $, %, *, ' or &`,"
    );
  // if (
  //   await User.findOne({
  //     username: { $regex: new RegExp(`^${modifyForRegex(username)}$`, "i") },
  //   })
  // )
  //   throw new SignUpError(
  //     "username",
  //     "Sorry, this username has already been taken"
  //   );
}

export async function validateEmail(email: string) {
  if (email.length < 1)
    throw new SignUpError(
      "email",
      "Sorry an email must contain at least one character"
    );
  if (email.length > 64)
    throw new SignUpError(
      "email",
      "Sorry, your username cannot be more than 64 characters"
    );
  const isValid = isAValidEmailType(email);
  if (!isValid.value) throw new SignUpError("email", isValid.message);
  // if (
  //   await User.findOne({
  //     email: { $regex: new RegExp(`^${modifyForRegex(email)}$`, "i") },
  //   })
  // )
  //   throw new SignUpError(
  //     "email",
  //     "Sorry, a user with this email already exist"
  //   );
}

export function validatePassword(password: string, confirmPassword: string) {
  if (password.length < 3) {
    throw new SignUpError(
      "password",
      "Sorry a password must contain at least three characters"
    );
  }
  if (password.length > 32)
    throw new SignUpError(
      "password",
      "Password can not be longer than 32 characters"
    );
  if (password !== confirmPassword)
    throw new SignUpError("password", "passwords does not match");
}

export function modifyForRegex(item: string) {
  const result = [];

  for (let char of item) {
    const regex = /\w|\s|@/;
    if (regex.test(char)) result.push(char);
    else result.push(`\\${char}`);
  }

  return result.join("");
}

export function isAValidUserNameType(item: string) {
  const regex = /[^\w|\s|\.|\!|@|\#|\$|\%|\*|\&|\']/;
  return !regex.test(item);
}

export function isAValidEmailType(item: string) {
  const regex1 = /@/g;
  const regex2 = /[^\w|\s|\.|\!|@|\#|\$|\%|\*|\&]/;
  const match = item.match(regex1) || [];
  if (!(match.length === 1))
    return { value: false, message: "An email must contain one @" };
  if (regex2.test(item))
    return {
      value: false,
      message:
        "An email cannot contain special symbols except periods, !, @, #, $, %, * or &",
    };
  return { value: true, message: "success" };
}
