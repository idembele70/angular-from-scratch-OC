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

export { User, Gender, UserWithoutPassword, SignInCredentials };
