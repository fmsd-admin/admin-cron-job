import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Report } from "./Report";
import { Product } from "./Product";

@Entity("report_top_products")
export class TopProducts {
  @PrimaryGeneratedColumn({ name: 'id'})
  id!: number;

  @ManyToOne(() => Report, (report) => report.topProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "report_id" })
  report!: any

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ name: "total_quantity", type: "int" })
  totalQuantity!: number;

  @Column({ name: "total_amount", type: "numeric" })
  totalAmount!: number;
}
