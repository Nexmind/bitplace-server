import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { Role } from '../entities/user/types';
import { User } from '../entities/user/User';

export class CreateBaseUsers1590519635401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User()
    
    const userRepository = getRepository(User)

    user.username = 'SuperAdmin'
    user.name = 'Super Admin'
    user.email = 'sadmin@btshop.com'
    user.password = 'fW98RmT2+'
    user.hashPassword()
    user.role = 'ADMINISTRATOR' as Role
    await userRepository.save(user)

    user = new User()
    user.username = 'Persilos'
    user.name = 'Julien Henrard'
    user.email = 'j.henrard@nexmind.be'
    user.password = 'coucou'
    user.hashPassword()
    user.role = 'STANDARD' as Role
    await userRepository.save(user)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented')
  }
}
