import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { ProductMaterial } from "src/entities/product-material.entity";
import { MaterialService } from "src/services/material/material.service";

@Controller('api/material')
@Crud({
    model: {
        type: ProductMaterial
    },
    params: {
        id: {
            field: 'productMaterialId',
            type: 'number',
            primary: true
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
export class ProductMaterialController {
    constructor(public service: MaterialService) { }
}