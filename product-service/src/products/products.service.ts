import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async createProduct(dto: AddProductDto) {
    try {
      const product = await this.productsRepository.save({
        productName: dto.productName,
        price: dto.price,
        userId: dto.userId,
      });
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async getMyProducts(userId: number) {
    try {
      const products = await this.productsRepository.find({
        where: { userId: userId },
      });
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllProducts({
    page,
    limit,
    sort,
    name,
  }): Promise<{ data: Product[]; count: number }> {
    try {
      const queryBuilder =
        this.productsRepository.createQueryBuilder('product');

      if (name) {
        queryBuilder.where('product.productName LIKE :name', {
          name: `%${name}%`,
        });
      }

      if (sort) {
        queryBuilder.orderBy('product.price', sort === 'asc' ? 'ASC' : 'DESC');
      }

      queryBuilder.take(limit).skip((page - 1) * limit);

      const [results, count] = await queryBuilder.getManyAndCount();

      return { data: results, count };
    } catch (err) {
      console.log(err);
    }
  }
}
