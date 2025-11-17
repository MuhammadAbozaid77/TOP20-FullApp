// lib/hashedPassword.js
import bcrypt from "bcryptjs"; // 👈 استخدم bcryptjs بدل bcrypt في Next.js

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function verifiyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}



