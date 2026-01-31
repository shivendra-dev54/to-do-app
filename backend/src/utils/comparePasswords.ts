
export const comparePasswords = async (
  password: string,
  hash: string
) => {
  const isMatch = await Bun.password.verify(password, hash);
  return isMatch;
}