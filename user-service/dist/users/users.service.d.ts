import { AuthDto, EditUserDto } from '../users/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { AddProductDto } from './productDto';
export declare class UsersService {
    private config;
    private readonly usersRepository;
    private jwt;
    constructor(config: ConfigService, usersRepository: Repository<User>, jwt: JwtService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
    editUser(userId: number, dto: EditUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    editAdmins(userId: number, isAdmin: boolean): Promise<User>;
    createProduct(dto: AddProductDto, userId: number): Promise<any>;
    getMyProducts(userId: number): Promise<any>;
    getAllProducts(page: number, limit: number, sort?: string, name?: string): Promise<any>;
}
