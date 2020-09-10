import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import * as Validator from 'class-validator';

@Index("uq_product_material_material_name", ["materialName"], { unique: true })
@Entity("product_material")
export class ProductMaterial {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "product_material_id",
    unsigned: true
  })
  productMaterialId: number;

  @Column({
    type: "varchar",
    name: "material_name",
    unique: true,
    length: 32
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  materialName: string;

  @OneToMany(() => Product, (product) => product.productMaterial)
  products: Product[];
}
