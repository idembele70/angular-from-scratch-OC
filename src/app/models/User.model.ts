type Gender = 'male' | 'female';
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender;
}

type SignUpCredentials = Partial<Pick<User, 'gender'>> & Omit<User, 'gender'>;

type SignInCredentials = Pick<User, 'email' | 'password'>;
type UserWithoutPassword = Omit<User, 'password'>;
type UserPartialPassword = Partial<Pick<User, 'password'>> &
  Omit<User, 'password'>;
type LoggedUser = UserWithoutPassword & { tokenExp: number };

export {
  User,
  Gender,
  UserWithoutPassword,
  SignUpCredentials,
  SignInCredentials,
  LoggedUser,
  UserPartialPassword,
};
