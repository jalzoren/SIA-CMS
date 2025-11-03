import bcrypt from "bcrypt";

const password = "MyNewPassword123"; // whatever password you want
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  console.log("Generated hash:", hash);
});
