import "reflect-metadata";
import { getSalesFromRedis, clearCache } from "./redis";
import { dataSource } from "./db";
import { Report } from "./entities/Report";

async function main() {
  await dataSource.initialize();
  const reportRepository = dataSource.getRepository(Report);

  const sales = await getSalesFromRedis();

  if (sales.length === 0) {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Error al ejecutar Cron Job: ", err);
  process.exit(1);
});
