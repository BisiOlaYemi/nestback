import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private  userRepository: UserRepository,
  ) {
    console.log('UserRepository injected:', userRepository);
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password; // We need to hash password before saving in real app
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}