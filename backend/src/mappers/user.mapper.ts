import { IDbUser } from '../modules/user/user.model';
import { Iuser } from '@Types/user';

export class UserMapper {
  static DbUserToUser(DbUser: IDbUser): Iuser {
    return {
      id: DbUser._id as string,
      version: DbUser.__v,
      name: DbUser.name,
      email: DbUser.email,
      isDeleted: DbUser.isDeleted,
      isVerified: DbUser.isVerified,
      createdAt: DbUser.createdAt,
      updatedAt: DbUser.updatedAt,
    };
  }
}
