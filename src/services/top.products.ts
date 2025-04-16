import { dataSource } from "../db";
import { Product } from "../entities/Product";
import type { Report } from "../entities/Report";
import { TopProducts } from "../entities/TopProducts";
import { ProductSale } from "../interfaces/product.sale";
import { getSalesFromRedis } from "../redis";

const filteredProducts = (products: ProductSale[]) => {
  const resume: Record<string, { totalQuantity: number; totalAmount: number }> = {};
  for (const p of products) {
    if (!resume[p.productId]) {
      resume[p.productId] = {
        totalQuantity: 0,
        totalAmount: 0,
      };
    }
    resume[p.productId]!.totalQuantity += p.quantity;
    resume[p.productId]!.totalAmount += p.price! * p.quantity;
  }
  return Object.fromEntries(
    Object.entries(resume)
      .sort(([, a], [, b]) => b.totalQuantity - a.totalQuantity)
      .slice(0, 5),
  );
};

export const getTopProducts = async (report: Report) => {
  const topRepository = dataSource.getRepository(TopProducts);
  const products = await getSalesFromRedis();
  const topList: TopProducts[] = [];
  const topProducts = filteredProducts(products);

  for (const [idStr, { totalQuantity, totalAmount }] of Object.entries(topProducts)) {
    const top = topRepository.create({
      report : { id: report.id },
      product: { id: parseInt(idStr) },
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
    });
    topList.push(top);
  }
  await topRepository.insert(topList);
  return topList;
};
