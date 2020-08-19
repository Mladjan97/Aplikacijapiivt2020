import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Index("fk_in_stock_priduct_id", ["productId"], {})
@Entity("in_stock")
export class InStock {
  @PrimaryGeneratedColumn({ type: "int", name: "in_stock_id", unsigned: true })
  inStockId: number;

  @Column({type: "int", name: "quantity", unsigned: true, default: () => "'0'" })
  quantity: number;

  @Column({type: "smallint", name: "size", unsigned: true, default: () => "'0'" })
  size: number;

  @Column({type: "varchar", name: "color", length: 50, default: () => "'0'" })
  color: string;

  @Column({type: "int", name: "product_id", unsigned: true, default: () => "'0'" })
  productId: number;

  @ManyToOne(() => Product, (product) => product.inStocks, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
