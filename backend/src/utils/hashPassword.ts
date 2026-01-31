
export const hashPassword = async (password: string) => {
  const bcryptHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 4,
  });
  return bcryptHash;
}