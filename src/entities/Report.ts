import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TopProducts } from "./TopProducts";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn({ name: "report_id" })
  id!: number;

  @Column({ type: "date" })
  date!: Date;

  @Column({
    type: "enum",
    enum: ["daily", "mensual", "yearly"],
    name: "type",
  })
  type!: "daily" | "mensual" | "yearly";

  @Column({ name: "total_amount", type: "numeric" })
  totalAmount!: number;

  @Column({ name: "total_sales", type: "int" })
  totalSales!: number;

  @OneToMany(() => TopProducts, (top) => top.report, { cascade: true })
  topProducts!: TopProducts[];
}
