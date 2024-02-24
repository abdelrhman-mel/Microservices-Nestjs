import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersRepository;
    constructor(config: ConfigService, usersRepository: Repository<User>);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<User>;
}
export {};
