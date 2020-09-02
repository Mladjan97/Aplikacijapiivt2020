import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InStock } from "./in-stock.entity";
import { Picture } from "./picture.entity";
import { Category } from "./category.entity";
import { ProductMaterial } from "./product-material.entity";
import { ProductPrice } from "./product-price.entity";

@Index("fk_product_category_id", ["categoryId"], {})
@Index("fk_product_product_material_id", ["productMaterialId"], {})
@Index("uq_product_title", ["title"], { unique: true })
@Entity("product")
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "product_id", unsigned: true })
  productId: number;

  @Column({type: "varchar", name: "title", unique: true, length: 32 })
  title: string;

  @Column({type: "varchar", name: "description", length: 255 })
  description: string;

  @Column({type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({type: "int", name: "product_material_id", unsigned: true })
  productMaterialId: number;

  @OneToMany(() => InStock, (inStock) => inStock.product)
  inStocks: InStock[];

  @OneToMany(() => Picture, (picture) => picture.product)
  pictures: Picture[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(
    () => ProductMaterial,
    (productMaterial) => productMaterial.products,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "product_material_id", referencedColumnName: "productMaterialId" },
  ])
  productMaterial: ProductMaterial;

  @OneToMany(() => ProductPrice, (productPrice) => productPrice.product)
  productPrices: ProductPrice[];
}
