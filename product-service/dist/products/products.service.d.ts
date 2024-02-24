import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { AddProductDto } from './dto';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Product>);
    createProduct(dto: AddProductDto): Promise<{
        productName: string;
        price: number;
        userId: number;
    } & Product>;
    getMyProducts(userId: number): Promise<Product[]>;
    getAllProducts({ page, limit, sort, name, }: {
        page: any;
        limit: any;
        sort: any;
        name: any;
    }): Promise<{
        data: Product[];
        count: number;
    }>;
}
