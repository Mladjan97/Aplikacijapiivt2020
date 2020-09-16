import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import * as Validator from 'class-validator';

@Index("fk_in_stock_priduct_id", ["productId"], {})
@Index("uq_in_stock_size_color_product_id", ["size", "color", "productId"], {
  unique: true,
})
@Entity("in_stock")
export class InStock {
  @PrimaryGeneratedColumn({ type: "int", name: "in_stock_id", unsigned: true })
  inStockId: number;

  @Column({type: "int", name: "quantity", unsigned: true})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  quantity: number;

  @Column({type: "smallint", name: "size", unsigned: true})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  size: number;

  @Column({type: "varchar", name: "color", length: 50})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 50)
  color: string;

  @Column({type: "int", name: "product_id", unsigned: true})
  productId: number;

  @ManyToOne(() => Product, (product) => product.inStocks, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
