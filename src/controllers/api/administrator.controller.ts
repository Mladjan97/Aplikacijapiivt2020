import { Controller, Get, Param, Put, Body, Post, UseGuards } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "src/entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { async } from "rxjs";
import { resolve } from "dns";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
      ){ }

     // GET http://localhost:3000/api/administrator/  
  @Get()
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('administrator')
  getAll(): Promise<Administrator[]>{
   return this.administratorService.getAll();
  }

    // GET http://localhost:3000/api/administrator/2/
  @Get(':id')
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('administrator')
  getById(@Param('id') administratorId: number): Promise<Administrator | ApiResponse>{
    return new Promise(async (resolve) => {
        const admin = await this.administratorService.getById(administratorId);

        if (admin === undefined) {
            resolve(new ApiResponse("error", -1002));
         }
        resolve(admin);
    });
   
  }

  //PUT http://localhost:3000/api/administrator/
  @Put()
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('administrator')
  add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
    return this.administratorService.add(data);
  }

  // POST http://localhost:3000/api/administrator/4/
  @Post(':id')
  @UseGuards(RoleCheckerGuard)
  @AllowToRoles('administrator')
  edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse>{
    return this.administratorService.editById(id, data);
  }
}