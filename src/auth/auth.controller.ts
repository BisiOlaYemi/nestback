import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() { name, email, password }: { name: string; email: string; password: string }) {
    const user = await this.authService.createUser(name, email, password);
    return user;
  }

  @Post('signin')
  async signIn(@Body() { email, password }: { email: string; password: string }) {
    const user = await this.authService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    
    if (user.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    
    return { message: 'Sign in successful' };
  }
}
