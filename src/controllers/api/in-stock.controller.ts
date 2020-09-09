import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { InStock } from "src/entities/in-stock.entity";
import { InStockService } from "src/services/InStock/in-stock.service";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

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
            }
        }
    },
    routes: {
         only: [
             "createOneBase",
             "createManyBase",
             "getManyBase",
             "getOneBase",
             "updateOneBase",
         ],
         createOneBase: {
             decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
             ],
         },
         createManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
            ],
         },
         updateOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
            ],
         },
         getManyBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
            ],
         },
         getOneBase: {
            decorators: [
                UseGuards(RoleCheckerGuard),
                AllowToRoles("administrator"),
            ],
         }, 
    },
})
export class InStockController {
    constructor(public service: InStockService) { }
}