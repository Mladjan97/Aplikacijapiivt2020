import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InStock } from "src/entities/in-stock.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class InStockService extends TypeOrmCrudService<InStock> {
    constructor(@InjectRepository(InStock)private readonly in_stock: Repository<InStock>) {
        super(in_stock);
    }
}
