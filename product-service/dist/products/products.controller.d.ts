import { ProductsService } from './products.service';
import { AddProductDto } from './dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(dto: AddProductDto): Promise<{
        productName: string;
        price: number;
        userId: number;
    } & import("./products.entity").Product>;
    getMyProducts(userId: number): Promise<import("./products.entity").Product[]>;
    getAllProducts(page?: number, limit?: number, sort?: string, name?: string): Promise<{
        data: import("./products.entity").Product[];
        count: number;
    }>;
}
