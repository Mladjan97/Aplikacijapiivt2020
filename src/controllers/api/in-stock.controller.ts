import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { InStock } from "src/entities/in-stock.entity";
import { InStockService } from "src/services/InStock/in-stock.service";

@Controller('api/inStock')
@Crud({
    model: {
        type: InStock
    },
    params: {
        id: {
            field: 'inStockId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            product: {
                eager: true
            },
            
        }
    }
})
export class InStockController {
    constructor(public service: InStockService) { }
}