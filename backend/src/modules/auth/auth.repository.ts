import User, { IDbUser } from '../user/user.model';

export const createUser = async (
  userData: Partial<IDbUser>,
): Promise<IDbUser> => {
  const user = new User(userData);
  return await user.save();
};

export const isUserExists = async (email: string): Promise<boolean> => {
  return Boolean(await User.exists({ email, isDeleted: false }));
};
