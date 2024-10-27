import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    id: string,
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.id = id;
  }
}