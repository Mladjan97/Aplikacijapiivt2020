import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'src/entities/administrator.entity';
import { Repository} from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import * as crypto from 'crypto'
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import { resolve } from 'dns';
import { AdminToken } from 'src/entities/admin-token.entity';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator: Repository<Administrator>,
        @InjectRepository(AdminToken) 
        private readonly adminToken: Repository<AdminToken>,
    ) { }

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    async getByUsername(username: string): Promise<Administrator | null> {
        const admin = await this.administrator.findOne({
            username: username
        });

        if (admin) {
            return admin;
        }
        return null;
    }

    getById(id: number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return new Promise((resolve) => {
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -1001);
                resolve(response);
            })
        })
    }

   async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
    
        const admin: Administrator = await this.administrator.findOne(id);

        if (admin === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002));
            });
        }

        require('crypto');

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }

    async addToken(administratorId: number, token: string, expiresAt: string) {
        const adminToken = new AdminToken();
        adminToken.administratorId = administratorId;
        adminToken.token = token;
        adminToken.expiresAt = expiresAt;

        return await this.adminToken.save(adminToken);
    }

    async getAdminToken(token: string): Promise<AdminToken> {
        return await this.adminToken.findOne({
            token: token,
        });
    }

    async invalidateToken(token: string): Promise<AdminToken | ApiResponse> {
        const adminToken = await this.adminToken.findOne({
            token: token,
        });

        if(!adminToken) {
            return new ApiResponse("error", -10001, "No such refresh token!");
        }

        adminToken.isValid = 0;

        await this.adminToken.save(adminToken);

        return await this.getAdminToken(token);
    }

    async invalidateAdminTokens(administratorId: number): Promise<(AdminToken | ApiResponse)[]> {
        const adminTokens = await this.adminToken.find({
            administratorId: administratorId,
        });

        const results = [];

        for (const adminToken of adminTokens) {
            results.push(this.invalidateToken(adminToken.token));
        }

        return results;
    }
}
