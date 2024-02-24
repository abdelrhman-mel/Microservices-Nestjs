"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_entity_1 = require("./products.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async createProduct(dto) {
        try {
            const product = await this.productsRepository.save({
                productName: dto.productName,
                price: dto.price,
                userId: dto.userId,
            });
            return product;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getMyProducts(userId) {
        try {
            const products = await this.productsRepository.find({
                where: { userId: userId },
            });
            return products;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllProducts({ page, limit, sort, name, }) {
        try {
            const queryBuilder = this.productsRepository.createQueryBuilder('product');
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
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map