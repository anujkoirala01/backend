import bcrypt from "bcrypt";

export let hash = async (password) => {
  let _hashPassword = await bcrypt.hash(password, 10); // 10 --> SaltRound
  return _hashPassword;
};

export let comparePassword = async (password, hashPassword) => {
  let isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};
