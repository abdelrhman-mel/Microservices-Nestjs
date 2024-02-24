import { UsersService } from './users.service';
import { AuthDto, EditUserDto } from './dto';
import { User } from './users.entity';
import { AddProductDto } from './productDto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signIn(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    editUser(userId: number, dto: EditUserDto): Promise<User>;
    getMe(user: User): User;
    getAllUsers(ifAdmin: boolean): Promise<User[]>;
    editAdmins(ifAdmin: boolean, userId: number, isAdmin: boolean): Promise<User>;
    createProduct(dto: AddProductDto, userId: number): Promise<any>;
    getMyProducts(userId: number): Promise<any>;
    getAllProducts(page?: number, limit?: number, sort?: string, name?: string): Promise<any>;
}
