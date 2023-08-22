import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserRepository } from './auth/user.repository';

@Module({
  imports: [TypeOrmModule.forRoot({ type: 'sqlite', database: 'db.sqlite3', entities: [User], synchronize: true })],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AppModule {}
