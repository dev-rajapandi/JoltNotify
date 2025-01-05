import { Request, Response, NextFunction } from 'express';
import { registerUser } from './auth.service';
import { IRegisterPayload } from '@Types/auth/payload';
import { validateRegisterPayload } from '../../utils/validations/user';
import { ValidationError } from '../../utils/errors';
import { UserMapper } from '../../mappers/user.mapper';

export const registerUserController = async (
  req: Request<{}, {}, IRegisterPayload>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const userData: IRegisterPayload = { name, email, password }; // Sanitize the payload
    const payloadValidation = validateRegisterPayload(userData); // Validate the payload

    if (!payloadValidation.isValid) {
      throw new ValidationError(payloadValidation);
    }

    // Call the service to register the user
    const newUser = await registerUser(userData);
    const user = UserMapper.DbUserToUser(newUser);
    // Respond with the created user data
    return res.status(201).json({
      message: 'User registered successfully',
      user,
      newUser,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
