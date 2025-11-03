import bcrypt from "bcrypt";

export async function getHashedPassword(password) {
  const Password = await bcrypt.hash(password, 10);
  return Password;
}

export async function verifiyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
