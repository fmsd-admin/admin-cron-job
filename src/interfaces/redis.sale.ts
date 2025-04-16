import type { ProductSale } from "./product.sale";

export interface RedisSale {
    numberSale: number;
    totalAmount: number;
    products: ProductSale[];
}