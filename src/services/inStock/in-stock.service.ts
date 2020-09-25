import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InStock } from "src/entities/in-stock.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/misc/api.response.class";

@Injectable()
export class InStockService extends TypeOrmCrudService<InStock> {
    constructor(@InjectRepository(InStock)private readonly in_stock: Repository<InStock>) {
        super(in_stock);
    }

    async getStocks(): Promise<InStock[] | ApiResponse> {
        const inStocks = await this.in_stock.find();
        if (inStocks.length === 0) {
            return new ApiResponse('ok', -4001, 'There is no data in database');
        }
        if (!inStocks) {
            return new ApiResponse('error', -4002, 'Cannot find any data');
        }

        return inStocks;
    }

    async getStockById(id: number): Promise<InStock | ApiResponse> {
        const inStock = await this.in_stock.findOne(id);

        if(!inStock) {
            return new ApiResponse('error', -4003, 'This stock doesnt exists');
        }

        return inStock;
    }

}
