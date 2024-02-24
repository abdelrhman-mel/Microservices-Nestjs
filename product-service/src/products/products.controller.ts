import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() dto: AddProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Get('/user/:id')
  getMyProducts(@Param('id', ParseIntPipe) userId: number) {
    return this.productsService.getMyProducts(userId);
  }

  @Get()
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort?: string,
    @Query('name') name?: string,
  ) {
    limit = limit > 100 ? 50 : limit; // Limit the maximum number of items per page
    return this.productsService.getAllProducts({ page, limit, sort, name });
  }
}
