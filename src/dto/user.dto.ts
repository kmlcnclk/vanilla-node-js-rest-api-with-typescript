class UserDto {
  public name: string;
  public email: string;
  public password: string;

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default UserDto;
