import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({ name: 'id'})
  id!: number;

  @Column({ name: 'name'})
  name!: string;

  @Column()
  description!: string;

  @Column()
  stock!: number;

  @Column({
    type: "enum",
    enum: ["low", "normal", "high"],
    name: "stock_status",
  })
  stockStatus!: "low" | "normal" | "high";

  @Column({ name: "final_price" })
  price!: number;

  @Column({ name: "distributor_price" })
  distributorPrice!: number;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;

  @Column({ name: "deleted_at", nullable: true })
  deteledAt?: Date;
}
