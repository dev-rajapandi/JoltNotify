export interface Iuser {
  id: string;
  version: number;
  name: string;
  email: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
