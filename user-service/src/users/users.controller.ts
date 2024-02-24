import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthDto, EditUserDto } from './dto';
import { User } from './users.entity';
import { GetUser, IsAdmin } from './decorator';
import { JwtGuard } from './guard';
import { AddProductDto } from './productDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.usersService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.usersService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.usersService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    delete user.hash;
    return user;
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllUsers(@IsAdmin() ifAdmin: boolean) {
    if (ifAdmin) {
      return this.usersService.getAllUsers();
    }
  }

  @UseGuards(JwtGuard)
  @Patch('/editAdmin/:id')
  editAdmins(
    @IsAdmin() ifAdmin: boolean,
    @Param('id', ParseIntPipe) userId: number,
    @Body('isAdmin', ParseBoolPipe) isAdmin: boolean,
  ) {
    if (ifAdmin) {
      return this.usersService.editAdmins(userId, isAdmin);
    }
  }

  @UseGuards(JwtGuard)
  @Post('/products')
  createProduct(@Body() dto: AddProductDto, @GetUser('id') userId: number) {
    return this.usersService.createProduct(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Get('/myproducts')
  getMyProducts(@GetUser('id') userId: number) {
    return this.usersService.getMyProducts(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/products')
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort?: string,
    @Query('name') name?: string,
  ) {
    return this.usersService.getAllProducts(page, limit, sort, name);
  }
}
