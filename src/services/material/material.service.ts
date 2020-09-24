import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/misc/api.response.class";
import { ProductMaterial } from "src/entities/product-material.entity";

@Injectable()
export class MaterialService extends TypeOrmCrudService<ProductMaterial> {
    constructor(@InjectRepository(ProductMaterial)private readonly material: Repository<ProductMaterial>) {
        super(material);
    }

    async getMaterials(): Promise<ProductMaterial[] | ApiResponse> {
        const materials = await this.material.find();
        if (materials.length === 0) {
            return new ApiResponse('ok', -4001, 'There is no data in database');
        }
        if (!materials) {
            return new ApiResponse('error', -4002, 'Cannot find any data');
        }

        return materials;
    }

    async getMaterialById(id: number): Promise<ProductMaterial | ApiResponse> {
        const material = await this.material.findOne(id);

        if(!material) {
            return new ApiResponse('error', -4003, 'This material doesnt exists');
        }

        return material;
    }

}