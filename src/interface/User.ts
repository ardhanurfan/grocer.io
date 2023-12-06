interface User {
  id: number;
  fullname: string;
  email: string;
  username: string;
  password: string;
  role: string;
  consult_token: string | null;
  cleaning_token: string | null;
}
