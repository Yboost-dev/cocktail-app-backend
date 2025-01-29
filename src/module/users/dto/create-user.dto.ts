import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email must be valid',
    },
  )
  @ApiProperty({
    description: 'Email address',
    example: 'exemple@exemple.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Firstname',
    example: 'John',
  })
  firstname: string;

  @IsString()
  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
  })
  lastname: string;

  @IsString()
  @Length(8, 128, {
    message: 'Password must be between 8 and 128 characters',
  })
  @ApiProperty({
    description: 'Password',
    example: 'Password123',
  })
  password: string;


  @IsString()
  @IsIn(['admin', 'employee'], {
    message: 'Role must be admin or employee',
  })
  @ApiProperty({
    description: 'Role',
    example: 'admin / employee',
  })
  role: string;
}
