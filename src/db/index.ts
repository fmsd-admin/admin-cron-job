import { DataSource } from "typeorm";
import { config, parse } from "dotenv";
import { Report } from "../entities/Report";
import { TopProducts } from "../entities/TopProducts";
import { Product } from "../entities/Product";

config();

const dataSource = new DataSource({
  type: "postgres",
  url:process.env.DATABASE_URL,
  schema: 'fmsd',
  entities: [TopProducts,Report,Product],
});

export { dataSource };
