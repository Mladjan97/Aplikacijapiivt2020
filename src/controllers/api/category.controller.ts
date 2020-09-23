import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/category.entity";
import { CategoryService } from "src/services/category/category.service";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params: {
        id: {
            field: 'categoryId',
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
export class CategoryController {
    constructor(public service: CategoryService) { }
}