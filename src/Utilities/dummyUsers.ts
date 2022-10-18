export type userAllDataTypes = {
  username: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
  email: string;
  role: string;
  phonenumber?: string;
  password: string;
};

export const adminUserData = <userAllDataTypes>{
  avatarUrl: "https://picsum.photos/150",
  email: "admin@email.com",
  firstname: "ahmed",
  lastname: "shehata",
  role: "admin",
  username: "AhmedShehata123",
  phonenumber: "01234567123",
  password: "admin",
};

export const usersDatabase: userAllDataTypes[] = [adminUserData];
