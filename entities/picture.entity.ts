import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Index("fk_picture_product_id", ["productId"], {})
@Index("uq_picture_image_path", ["imagePath"], { unique: true })
@Entity("picture")
export class Picture {
  @PrimaryGeneratedColumn({ type: "int", name: "picture_id", unsigned: true })
  pictureId: number;

  @Column({type: "int", name: "product_id", unsigned: true })
  productId: number;

  @Column({type: "varchar", name: "image_path", unique: true, length: 255 })
  imagePath: string;

  @ManyToOne(() => Product, (product) => product.pictures, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
