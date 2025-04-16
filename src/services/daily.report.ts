import 'dotenv/config';
import { Report } from "../entities/Report";
import { getFormattedDate } from "../lib/getFormattedDate";
import { getValue, clearCache } from "../redis";
import { dataSource } from "../db";
import { getTopProducts } from "./top.products";
import type { TopProducts } from '../entities/TopProducts';

async function main() {
  await dataSource.initialize();
  const reportRepository = dataSource.getRepository(Report);
  const totalAmount = await getValue<number>("sales:daily:total:amount");
  const totalSales = await getValue<number>("sales:daily:total:sales");
  if (!totalAmount || !totalSales) {
    console.error("No hay datos para generar el reporte");
    process.exit(0);
  }
  const date = getFormattedDate();
  const report = await reportRepository.save({
    date,
    type: "daily",
    totalAmount,
    totalSales,
    topProducts: [] as TopProducts[],
  });
  const topProducts = await getTopProducts(report);
  report.topProducts = topProducts;
  await reportRepository.save(report);
  
  await clearCache([
    'sales:daily',
    'sales:daily:total:amount',
    'sales:daily:total:sales',
  ])
  process.exit(0);
}

main().catch((err) => {
  console.error("Error al ejecutar Cron Job: ", err);
  process.exit(1);
});
