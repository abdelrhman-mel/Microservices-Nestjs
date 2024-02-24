import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, EditUserDto } from '../users/dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { AddProductDto } from './productDto';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    private config: ConfigService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    //save the new user to the database
    try {
      const userCount = await this.usersRepository.count();
      if (userCount === 0) {
        const user = await this.usersRepository.save({
          email: dto.email,
          hash,
          isAdmin: true,
        });
        return this.signToken(user.id, user.email);
      }
      const user = await this.usersRepository.save({
        email: dto.email,
        hash,
      });
      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err.code === '23505') {
        // '23505' is the code for unique violation in PostgreSQL
        throw new ForbiddenException('Email already taken');
      }
      console.log(err);
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    //compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    //if password is incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    //send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payLoad = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payLoad, {
      // long period just for the development
      expiresIn: '2h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  async editUser(userId: number, dto: EditUserDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new ForbiddenException('User does not exist');
      this.usersRepository.update(userId, dto);
      const updatedUser = await this.usersRepository.findOne({
        where: { id: userId },
      });
      delete updatedUser.hash;
      return updatedUser;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async editAdmins(userId: number, isAdmin: boolean) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new ForbiddenException('User does not exist');
      await this.usersRepository.update(userId, {
        isAdmin,
      });
      const updatedUser = await this.usersRepository.findOne({
        where: { id: userId },
      });
      return updatedUser;
    } catch (err) {
      console.log(err);
    }
  }

  async createProduct(dto: AddProductDto, userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new ForbiddenException('User does not exist');
      const res = await axios.post(`http://localhost:3000/api/products`, {
        productName: dto.productName,
        price: dto.price,
        userId: userId,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getMyProducts(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new ForbiddenException('User does not exist');
      const res = await axios.get(
        `http://localhost:3000/api/products/user/${userId}`,
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllProducts(
    page: number,
    limit: number,
    sort?: string,
    name?: string,
  ) {
    let url = `http://localhost:3000/api/products?page=${page}&limit=${limit}`;
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }

    try {
      const response = await axios.get(url);
      return response.data; // The paginated and sorted list of products
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new ForbiddenException('Failed to fetch products');
    }
  }
}
