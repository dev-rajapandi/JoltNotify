import bcrypt from 'bcryptjs';
import { isUserExists, createUser } from './auth.repository';
import { ConflictError } from '../../utils/errors';

import { IRegisterPayload } from '@Types/auth/payload';

export const registerUser = async (userData: IRegisterPayload) => {
  // Check if user already exists
  const userExists = await isUserExists(userData.email);
  if (userExists) {
    throw new ConflictError('Email already exists.');
  }

  // Hash the password before saving the user
  userData.password = await hashPassword(userData.password);

  // Create a new user
  const newUser = await createUser(userData);
  return newUser;
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password!, 10); // ! operator used to skip null check (Like we are sure it cannot be null on runtime)
};
