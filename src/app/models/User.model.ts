type Gender = 'male' | 'female';
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
}

type SignInCredentials = Pick<User, 'email' | 'password'>;
type UserWithoutPassword = Omit<User, 'password'>;
type UserPartialPassword = Partial<Pick<User, 'password'>> &
  Omit<User, 'password'>;
type LoggedUser = UserWithoutPassword & { tokenExp: number };

export {
  User,
  Gender,
  UserWithoutPassword,
  SignInCredentials,
  LoggedUser,
  UserPartialPassword,
};
